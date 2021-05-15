import { LitElement } from 'lit';
import { property } from '@lit/reactive-element/decorators/property';
import UserModel from '../../model/UserModel';

/**
 * 자식 컴포넌트를 오버레이 해야하는 컴포넌트
 *
 * - 예시 : Modal, Dropdown이 필요한 컴포넌트
 */
export const OverlayHost = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends Base {
    // 팝업 버튼 클릭 시
    protected _onOverlayTrigger(modalId: string) {
      const overlay = this.shadowRoot!.getElementById(modalId);
      const focuedOverlay = this.shadowRoot!.querySelector('[focused]');

      if (UserModel.mobileDevice) {
        const modalHash = overlay!.dataset.hash as string;

        if (focuedOverlay === overlay) return history.back();
        if (focuedOverlay) return location.replace(location.origin + location.pathname + modalHash);
        location.hash = modalHash;
        return;
      }
      focuedOverlay?.removeAttribute('focused');
      if (focuedOverlay === overlay) return;
      overlay!.setAttribute('focused', '');
    }
  }
  return Mixin;
};

/**
 * 부모 컴포넌트 위에 겹쳐지는 컴포넌트
 *
 * - 예시 : Modal, Dropdown 컴포넌트
 */
export const Overlay = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends Base {
    // 모달 창 닫을 떄
    protected _onClose(e: Event) {
      UserModel.mobileDevice ? history.back() : this.removeAttribute('focused');
    }
  }
  return Mixin;
};

/**
 * 단순 알림이
 *
 * - 예시 : Modal, Dropdown 컴포넌트
 */
export const AlertHost = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends OverlayHost(Base) {
    @property({ type: Object }) _alert?: { title: string; body: string };

    constructor(...args: any[]) {
      super();
      this.addEventListener('Alert', this.onAlert);
    }

    onAlert(e: Event) {
      this._alert = (e as CustomEvent).detail;
      this._onOverlayTrigger('alert-modal');
    }
  }
  return Mixin;
};
