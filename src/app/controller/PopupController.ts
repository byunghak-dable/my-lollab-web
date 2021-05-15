import { LitElement, ReactiveController } from 'lit';
import UserModel from '../model/UserModel';

export default class PopupController implements ReactiveController {
  private host?: LitElement;
  private onBoundNonePopupClick = this.onNonePopupClick.bind(this);

  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    document!.addEventListener('click', this.onBoundNonePopupClick);
  }

  hostDisconnected() {
    document!.removeEventListener('click', this.onBoundNonePopupClick);
  }

  // (2) 팝업이 아닌 다른 곳을 클릭 했을 때
  private onNonePopupClick(e: Event) {
    let isTrigger = false;
    const popups = this.host!.shadowRoot!.querySelectorAll('[focused]') as NodeListOf<Element>;
    const popupTriigers = this.host!.shadowRoot!.querySelectorAll('.popup-trigger') as NodeListOf<Element>;

    if (popups.length === 0) return;
    popupTriigers.forEach((popupTriiger) => {
      if (e.composedPath().includes(popupTriiger)) isTrigger = true;
    });
    if (isTrigger) return;
    popups.forEach((modal) => {
      if (!e.composedPath().includes(modal)) UserModel.mobileDevice ? history.back() : modal.removeAttribute('focused');
    });
  }
}
