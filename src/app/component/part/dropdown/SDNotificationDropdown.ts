import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import notificationModalStyle from '../../../style/part/dropdown/sd.notification.modal.module.css';
import svgStyle from '../../../style/share/svg.module.css';
import { DependencyRequester } from '../../../../core/component/di';
import { Overlay } from '../../../mixin/component/overlay';

@customElement('sd-notification-modal')
class SDNotificationDropdown extends Overlay(DependencyRequester(LitElement)) {
  static styles = [svgStyle, notificationModalStyle];

  @property({ type: Array }) notifications?: object[];

  render() {
    return html`
      <div class="div-title">
        <svg class="svg-default" @click=${this._onClose} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
          <path d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" fill="#626262" />
          <rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>알림</span>
      </div>
      <div class=${this.notifications ? 'div-notification' : 'div-detail'}>
        ${this.notifications
          ? this.notifications.map(
              (Notification) => html`
                <div>
                  <span></span>
                </div>
              `
            )
          : html`
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#626262" />
                <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>
                리쿠르트 요청, 스크림 요청 <br />
                알림이 표시됩니다.
              </span>
            `}
      </div>
    `;
  }
}
