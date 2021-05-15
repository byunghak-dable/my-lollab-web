import { LitElement, ReactiveController } from 'lit';
import UserModel from '../model/UserModel';

export default class DropdownController implements ReactiveController {
  private host?: LitElement;
  private onBoundNoneDrodownClick = this.onNoneDropdownClick.bind(this);

  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    document!.addEventListener('click', this.onBoundNoneDrodownClick);
  }

  hostDisconnected() {
    document!.removeEventListener('click', this.onBoundNoneDrodownClick);
  }

  // (2) 팝업이 아닌 다른 곳을 클릭 했을 때
  private onNoneDropdownClick(e: Event) {
    const dropdown = this.host!.shadowRoot!.querySelector('[focused]') as HTMLElement;
    if (!dropdown) return;
    const dropdownTriigers = this.host!.shadowRoot!.querySelectorAll('[dropdown-trigger]') as NodeListOf<Element>;
    let isTrigger = false;

    dropdownTriigers.forEach((popupTriiger) => {
      if (e.composedPath().includes(popupTriiger)) isTrigger = true;
    });
    if (isTrigger) return;
    if (!e.composedPath().includes(dropdown)) UserModel.mobileDevice ? history.back() : dropdown!.removeAttribute('focused');
  }
}
