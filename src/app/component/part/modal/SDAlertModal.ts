import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import svgStyle from '../../../style/share/svg.module.css';
import btnStyle from '../../../style/share/btn.module.css';
import modalStyle from '../../../style/share/modal.module.css';
import alertModalStyle from '../../../style/part/modal/sd.alert.modal.module.css';
import { Overlay } from '../../../mixin/component/overlay';
import { property } from '@lit/reactive-element/decorators/property';

@customElement('sd-alert-modal')
class SDAlertModal extends Overlay(LitElement) {
  static styles = [svgStyle, btnStyle, modalStyle, alertModalStyle];

  @property({ type: Object }) alert?: { title: string; body: string };

  render() {
    return this.alert
      ? html`
          <div class="div-modal">
            <div class="title">
              <span>${this.alert!.title}</span>
              <svg class="svg-default" @click=${this._onClose} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
                <path d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" fill="#626262" />
                <rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" />
              </svg>
            </div>
            <div class="body">
              <p>${this.alert!.body}</p>
              <button class="btn-default" @click=${this._onClose}>확인</button>
            </div>
          </div>
          <div class="div-overlay" @click=${this._onClose}></div>
        `
      : null;
  }
}
