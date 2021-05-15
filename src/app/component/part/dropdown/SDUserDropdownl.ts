import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { DependencyRequester } from '../../../../core/component/di';
import { getProfileIconUrl } from '../../../util/ddragon-api';
import userModalStyle from '../../../style/part/dropdown/sd.user.modal.module.css';
import svgStyle from '../../../style/share/svg.module.css';
import AccountModel from '../../../model/AccountModel';
import UserModel from '../../../model/UserModel';
import { Overlay } from '../../../mixin/component/overlay';

@customElement('sd-user-modal')
class SDUserDropdown extends Overlay(DependencyRequester(LitElement)) {
  static styles = [svgStyle, userModalStyle];

  // 1) 로그 아웃
  private async onSignout(e: Event) {
    const userModel = this._requestInstance<UserModel>('Model:User');
    await userModel!.signout();
  }

  private onLinkClick(e: Event) {
    this.removeAttribute('focused');
  }

  render() {
    return html`
      <div class="div-title">
        <svg class="svg-default" @click=${this._onClose} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
          <path d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" fill="#626262" />
          <rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>계정</span>
      </div>
      <div class="div-profile">
        <img src=${getProfileIconUrl(AccountModel.account?.profileIconId)} alt="profile" />
        <span>${AccountModel.account?.summonerName}</span>
        <small>${UserModel.user!.email}</small>
        <button>LoL 계정 전환</button>
      </div>
      <router-link ?replace=${UserModel.mobileDevice} @click=${this.onLinkClick} href="/team/2" class="menu menu--team">
        <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <g fill="none">
            <path
              d="M14.754 10c.966 0 1.75.784 1.75 1.75v4.749a4.501 4.501 0 0 1-9.002 0V11.75c0-.966.783-1.75 1.75-1.75h5.502zm-7.623 0c-.35.422-.575.95-.62 1.53l-.01.22v4.749c0 .847.192 1.649.534 2.365A4.001 4.001 0 0 1 2 14.999V11.75a1.75 1.75 0 0 1 1.606-1.744L3.75 10h3.381zm9.744 0h3.375c.966 0 1.75.784 1.75 1.75V15a4 4 0 0 1-5.03 3.866c.3-.628.484-1.32.525-2.052l.009-.315V11.75c0-.665-.236-1.275-.63-1.75zM12 3a3 3 0 1 1 0 6a3 3 0 0 1 0-6zm6.5 1a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5zm-13 0a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5z"
              fill="#626262"
            />
          </g>
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>내 LoL팀</span>
      </router-link>
      <div class="menu" @click=${this.onSignout}>
        <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1188 1000">
          <path
            d="M912 236l276 266l-276 264V589H499V413h413V236zM746 748l106 107q-156 146-338 146q-217 0-365.5-143.5T0 499q0-135 68-250T251.5 67.5T502 1q184 0 349 148L746 255Q632 151 503 151q-149 0-251.5 104T149 509q0 140 105.5 241T502 851q131 0 244-103z"
            fill="#626262"
          />
          <rect x="0" y="0" width="1188" height="1000" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>로그 아웃</span>
      </div>
      <div class="menu line">
        <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path
            d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34z"
            fill="#626262"
          />
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>테마 변경</span>
        <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <g transform="rotate(90 12 12)"><path d="M12 8l-6 6l1.41 1.41L12 10.83l4.59 4.58L18 14z" fill="#626262" /></g>
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
      </div>
      <div class="menu">
        <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path
            d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4c1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"
            fill="#626262"
          />
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
        <span>고객 센터</span>
      </div>
    `;
  }
}
