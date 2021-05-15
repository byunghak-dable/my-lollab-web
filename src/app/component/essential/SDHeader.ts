import { html, LitElement, css } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { lazyLoad } from '../../../core/component/async';
import { DependencyRequester } from '../../../core/component/di';
import { OverlayHost } from '../../mixin/component/overlay';
import { getProfileIconUrl } from '../../util/ddragon-api';
import headerStyle from '../../style/essential/sd.header.module.css';
import svgStyle from '../../style/share/svg.module.css';
import AccountModel from '../../model/AccountModel';
import imgLogo from '../../../assets/image/logo/logo.png';
import DropdownController from '../../controller/DropdownController';

@customElement('sd-header')
class SDHeader extends OverlayHost(DependencyRequester(LitElement)) {
  static styles = [svgStyle, headerStyle];

  @property({ type: String }) path?: string;
  @property({ type: Boolean }) signin?: boolean;
  @property({ type: Boolean }) navOpened: boolean = false;

  constructor() {
    super();
    new DropdownController(this);
    this.addEventListener('SDNavigation:SidebarChange', this.onNavChange.bind(this));
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) 커스텀 리스너 -------- */
  // 1) 네비게이션 변경 시
  private onNavChange(e: Event) {
    e.stopPropagation();
    this.navOpened = (e as CustomEvent).detail.opened;
  }

  /** -------- @category (2) 클릭 리스너 -------- */
  // 1) 모바일 ~ 테블릿 크기 일 때 사이드 바 컨트롤
  private onHamburgerBtnClick(e: Event) {
    this.navOpened = !this.navOpened;
  }

  render() {
    return html`
      <!-- 로고 박스 -->
      <div class="div-menu div-menu--main">
        <svg class="svg-default" id="hamburger-menu" @click=${this.onHamburgerBtnClick} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 21 21">
          <g fill="none" fill-rule="evenodd" stroke="#626262" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 6.5h12" />
            <path d="M4.498 10.5h11.997" />
            <path d="M4.5 14.5h11.995" />
          </g>
        </svg>
        <router-link href="/" stack="none">
          <img src=${imgLogo} alt="logo" alt="로고" />
        </router-link>
      </div>
      ${lazyLoad(import(/* webpackChunkName: "SDNavigation" */ './SDNavigation'), html`<sd-navigation .path=${this.path} ?opened=${this.navOpened} />`)}
      <!-- 유티리티 버튼 박스 -->
      <div class="div-menu div-menu--user">
        ${this.signin === undefined
          ? null
          : this.signin
          ? html`
              <!-- 로그인 했을 때 사용자 메뉴 -->
              <div class="div-user-menu">
                <figure class="figure-notification">
                  <svg
                    class="svg-default"
                    dropdown-trigger
                    @click=${() => this._onOverlayTrigger('notification-modal')}
                    aria-hidden="true"
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V2.5h-3v2.18C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" fill="#626262" />
                    <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
                  </svg>
                  ${lazyLoad(
                    import('../part/dropdown/SDNotificationDropdown'),
                    html`<sd-notification-modal id="notification-modal" data-hash="#notifiaction" ?focused=${location.hash === '#notifiaction'} />`
                  )}
                </figure>
                <figure class="figure-profile" dropdown-trigger>
                  <img src=${getProfileIconUrl(AccountModel.account?.profileIconId)} alt="profile" @click=${() => this._onOverlayTrigger('user-modal')} />
                  ${lazyLoad(import('../part/dropdown/SDUserDropdownl'), html`<sd-user-modal id="user-modal" data-hash="#user" ?focused=${location.hash === '#user'} />`)}
                </figure>
              </div>
            `
          : html`
              <!-- 로그인 버튼 -->
              <router-link class="link-signin" href="/signin">
                <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                  <path
                    d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm2 96a72 72 0 1 1-72 72a72 72 0 0 1 72-72zm-2 288a175.55 175.55 0 0 1-129.18-56.6C135.66 329.62 215.06 320 256 320s120.34 9.62 129.18 55.39A175.52 175.52 0 0 1 256 432z"
                  />
                  <rect x="0" y="0" width="512" height="512" fill="rgba(0, 0, 0, 0)" />
                </svg>
                <span>로그인</span>
              </router-link>
            `}
      </div>
    `;
  }
}
