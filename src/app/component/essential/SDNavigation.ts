import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import navigationStyle from '../../style/essential/sd.navigation.module.css';

@customElement('sd-navigation')
class SDNavigation extends LitElement {
  static styles = navigationStyle;

  @property({ type: String }) path?: string;

  private checkCurrentNav(path?: string) {
    if (!path) return;
    if (path === '/') return 'home';
    if (path.includes('match')) return 'match';
    if (path.includes('recruit')) return 'recruit';
    if (path.includes('team')) return 'team';
    if (path.includes('download')) return 'download';
  }

  private onSidebarChange(e: Event) {
    this.dispatchEvent(
      new CustomEvent('SDNavigation:SidebarChange', {
        detail: { opened: false },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  render() {
    return html`
      <nav>
        <ul>
          <li class="li-home">
            <router-link deduplicate href="/" ?active=${this.checkCurrentNav(this.path) === 'home'} @click=${this.onSidebarChange}>
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024">
                <path
                  d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3c0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8c24.9-25 24.9-65.5-.1-90.5z"
                />
                <rect x="0" y="0" width="1024" height="1024" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>홈</span>
            </router-link>
          </li>
          <li>
            <router-link deduplicate href="/match/tournament" ?active=${this.checkCurrentNav(this.path) === 'match'} @click=${this.onSidebarChange}>
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path
                  d="M12.534 21.77l-1.09-2.81l10.52.54l-.451 4.5zM15.06 0L.307 6.969L2.59 17.471H5.6l-.52-7.512l.461-.144l1.81 7.656h3.126l-.116-9.15l.462-.144l1.582 9.294h3.31l.78-11.053l.462-.144l.82 11.197h4.376l1.54-15.37z"
                />
                <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>대회<strong>·</strong>스크림</span>
            </router-link>
          </li>
          <li>
            <router-link deduplicate href="/recruit/team" ?active=${this.checkCurrentNav(this.path) === 'recruit'} @click=${this.onSidebarChange}>
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 28 28">
                <g fill="none">
                  <path
                    d="M18.081 13.399c.269-.577.419-1.22.419-1.899c0-.526-.09-1.03-.256-1.5h6.006c.966 0 1.75.784 1.75 1.75v2.002l-.008.108a3.32 3.32 0 0 1-.38 1.152A7.474 7.474 0 0 0 20.5 13c-.846 0-1.66.14-2.419.399zm-4.656 9.596c-2.812-.13-4.52-1.141-4.91-3.098L8.5 19.75v-2c0-.966.784-1.75 1.75-1.75h4.25a7.466 7.466 0 0 0-1.5 4.5c0 .875.15 1.714.425 2.495zM9.756 10H3.75A1.75 1.75 0 0 0 2 11.75v2l.014.147c.42 2.101 2.36 3.112 5.553 3.112H7.6A2.751 2.751 0 0 1 10.25 15h.922l-.176-.15A4.489 4.489 0 0 1 9.5 11.5c0-.526.09-1.03.256-1.5zm7.744 1.5a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0zm6.5-6a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0zm-13 0a3.5 3.5 0 1 0-7 0a3.5 3.5 0 0 0 7 0zM20.5 27a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13zm0-11a.5.5 0 0 1 .5.5V20h3.5a.5.5 0 0 1 0 1H21v3.5a.5.5 0 0 1-1 0V21h-3.5a.5.5 0 0 1 0-1H20v-3.5a.5.5 0 0 1 .5-.5z"
                  />
                </g>
                <rect x="0" y="0" width="28" height="28" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>리쿠르팅</span>
            </router-link>
          </li>
          <li>
            <router-link deduplicate href="/team/rank" ?active=${this.checkCurrentNav(this.path) === 'team'} @click=${this.onSidebarChange}>
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
                <path
                  d="M223.75 130.75L154.62 15.54A31.997 31.997 0 0 0 127.18 0H16.03C3.08 0-4.5 14.57 2.92 25.18l111.27 158.96c29.72-27.77 67.52-46.83 109.56-53.39zM495.97 0H384.82c-11.24 0-21.66 5.9-27.44 15.54l-69.13 115.21c42.04 6.56 79.84 25.62 109.56 53.38L509.08 25.18C516.5 14.57 508.92 0 495.97 0zM256 160c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm92.52 157.26l-37.93 36.96l8.97 52.22c1.6 9.36-8.26 16.51-16.65 12.09L256 393.88l-46.9 24.65c-8.4 4.45-18.25-2.74-16.65-12.09l8.97-52.22l-37.93-36.96c-6.82-6.64-3.05-18.23 6.35-19.59l52.43-7.64l23.43-47.52c2.11-4.28 6.19-6.39 10.28-6.39c4.11 0 8.22 2.14 10.33 6.39l23.43 47.52l52.43 7.64c9.4 1.36 13.17 12.95 6.35 19.59z"
                />
                <rect x="0" y="0" width="512" height="512" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>팀</span>
            </router-link>
          </li>
          <li>
            <router-link deduplicate href="/download" ?active=${this.checkCurrentNav(this.path) === 'download'} @click=${this.onSidebarChange}>
              <svg class="svg-default" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                <path
                  d="M21 12.22C21 6.73 16.74 3 12 3c-4.69 0-9 3.65-9 9.28c-.6.34-1 .98-1 1.72v2c0 1.1.9 2 2 2c.55 0 1-.45 1-1v-4.81c0-3.83 2.95-7.18 6.78-7.29a7.007 7.007 0 0 1 7.22 7V19h-7c-.55 0-1 .45-1 1s.45 1 1 1h7c1.1 0 2-.9 2-2v-1.22c.59-.31 1-.92 1-1.64v-2.3c0-.7-.41-1.31-1-1.62z"
                />
                <circle cx="9" cy="13" r="1" fill="#626262" />
                <circle cx="15" cy="13" r="1" fill="#626262" />
                <path d="M18 11.03A6.04 6.04 0 0 0 12.05 6c-3.03 0-6.29 2.51-6.03 6.45a8.075 8.075 0 0 0 4.86-5.89c1.31 2.63 4 4.44 7.12 4.47z" fill="#626262" />
                <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
              </svg>
              <span>다운로드</span>
            </router-link>
          </li>
        </ul>
      </nav>
      <div class="div-overlay" @click=${this.onSidebarChange}></div>
    `;
  }
}
