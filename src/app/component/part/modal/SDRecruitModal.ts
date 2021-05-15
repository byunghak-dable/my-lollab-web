import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import svgStyle from '../../../style/share/svg.module.css';
import btnStyle from '../../../style/share/btn.module.css';
import modalStyle from '../../../style/share/modal.module.css';
import recruitModalStyle from '../../../style/part/modal/sd.recruit.modal.module.css';
import { Overlay } from '../../../mixin/component/overlay';
import { lazyLoad } from '../../../../core/component/async';
import { property } from '@lit/reactive-element/decorators/property';
import svgMicronphone from '../../../../assets/icon/microphone.svg';
import svgMicronphoneSlash from '../../../../assets/icon/micronphone-slash.svg';

@customElement('sd-recruit-modal')
class SDRecruitModal extends Overlay(LitElement) {
  static styles = [svgStyle, btnStyle, modalStyle, recruitModalStyle];

  @property({ type: Boolean }) voice: Boolean = true;
  @property({ type: String }) position?: RiotPosition;

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) 클릭 리스너 -------- */
  private onVoiceToggle(e: Event) {
    this.voice = !this.voice;
  }

  private onPositionClick(e: Event) {
    const svgPostion = e.currentTarget as HTMLOrSVGImageElement;
    this.position = svgPostion.id as RiotPosition;
  }

  /** -------- @category (2) submit 리스너 -------- */
  private onRegister(e: Event) {
    e.preventDefault();
    console.log(this.position);
  }

  render() {
    return html`
      <div class="div-modal">
        <div class="title">
          <span>등록하기</span>
          <svg class="svg-default" @click=${this._onClose} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">
            <path d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z" fill="#626262" />
            <rect x="0" y="0" width="20" height="20" fill="rgba(0, 0, 0, 0)" />
          </svg>
        </div>
        <form class="body" @submit=${this.onRegister}>
          <div class="div-section div-section--voice">
            <img src=${this.voice ? svgMicronphone : svgMicronphoneSlash} alt="보이스" />
            ${lazyLoad(import('../SDToggleSwitch'), html`<sd-toggle-switch @click=${this.onVoiceToggle} ?checked=${this.voice} />`)}
          </div>
          <div class="div-section div-section--position">
            <span>포지션</span>
            <div>
              <svg id="TOP" class="svg-position" ?active=${this.position === 'TOP'} @click=${this.onPositionClick} viewBox="0 0 24 24">
                <path class="svg-position__path--line" d="M16.172 5H5v11.172l-3 3V2h17.172l-3 3z" fill="var(--primary)"></path>
                <path class="svg-position__path--other" d="M22 22H4.828l3-3H19V7.828l3-3V22zM15 9H9v6h6V9z" fill="#e5e3e0"></path>
              </svg>
              <svg id="JGL" class="svg-position" ?active=${this.position === 'JGL'} @click=${this.onPositionClick} viewBox="0 0 24 24">
                <path
                  class="svg-position__path--line"
                  d="M5.094 0c9.247 11.173 8.508 20.655 6.983 24-3.853-4.623-6.261-6.368-6.983-6.662C4.708 10.788 2.204 7.652 1 6.903c4.752 1.734 6.903 5.512 7.385 7.184C9.09 8.532 6.485 2.381 5.094 0zM15.569 18.22v2.57l3.451-3.452c0-5.651 2.622-9.311 3.933-10.435-4.816 2.312-6.93 8.508-7.384 11.318zM15.569 12.04l-.803 2.248C14.509 12.49 13.482 10.38 13 9.552 14.605 5.763 17.522 1.605 18.78 0c-2.505 5.137-3.185 10.167-3.211 12.04z"
                  fill="var(--primary)"
                ></path>
              </svg>
              <svg id="MID" class="svg-position" ?active=${this.position === 'MID'} @click=${this.onPositionClick} viewBox="0 0 24 24">
                <path class="svg-position__path--line" d="M22 2h-2.906L2 19.094V22h3.063L22 5.062V2z" fill="var(--primary)"></path>
                <path class="svg-position__path--other" d="M5 13.478l-3 3V2h14.478l-3 3H5v8.478zM19 10.819l3-3V22H7.82l3-3H19v-8.181z" fill="#e5e3e0"></path>
              </svg>
              <svg id="BOT" class="svg-position" ?active=${this.position === 'BOT'} @click=${this.onPositionClick} viewBox="0 0 24 24">
                <path class="svg-position__path--line" d="M7.828 19H19V7.828l3-3V22H4.828l3-3z" fill="var(--primary)"></path>
                <path class="svg-position__path--other" d="M2 2h17.172l-3 3H5v11.172l-3 3V2zm7 13h6V9H9v6z" fill="#e5e3e0"></path>
              </svg>
              <svg id="SPT" class="svg-position" ?active=${this.position === 'SPT'} @click=${this.onPositionClick} viewBox="0 0 24 24">
                <path
                  class="svg-position__path--line"
                  d="M13.991 8.327l2.248-2.036H24c-2.553 2.327-4.69 2.86-5.44 2.836h-1.45l2.03 2.91-3.553 1.527-1.596-5.237zM14.644 19.745L12.758 9.127l-.798.946V22l2.684-2.255zM10.009 8.327L7.76 6.291H0c2.553 2.327 4.69 2.86 5.44 2.836h1.45l-2.03 2.91 3.553 1.527 1.596-5.237zM9.277 19.745l1.886-10.618.797.946V22l-2.683-2.255zM9.048 2L8.25 3.382 11.876 7.6l3.627-4.218L14.56 2H9.048z"
                  fill="var(--primary)"
                ></path>
              </svg>
            </div>
          </div>
          <div class="div-section div-section--nutshell">
            <span>한 마디</span>
            <input type="text" placeholder="전적 확인 부탁해요!" />
          </div>
          <div class="div-section btn-container">
            <button class="btn-cancel" type="button" @click=${this._onClose}>취소</button>
            <button type="submit">등록</button>
          </div>
        </form>
      </div>
      <div class="div-overlay" @click=${this._onClose}></div>
    `;
  }
}
