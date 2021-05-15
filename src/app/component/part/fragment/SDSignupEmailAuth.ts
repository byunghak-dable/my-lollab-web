import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { browserRouter } from '../../../../core/router/BrowserRouter';
import btnStyle from '../../../style/share/btn.module.css';
import signupEmailAuth from '../../../style/part/fragment/sd.signup.email.auth.module.css';

@customElement('sd-signup-email-auth')
class SDSignupEmailAuth extends LitElement {
  static styles = [btnStyle, signupEmailAuth];

  @property({ type: String }) userEmail?: string;

  willUpdate() {
    if (!this.userEmail) browserRouter.replace('/signin');
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  private onResendVerficationEmail(e: Event) {
    // TODO: 실패 시 예외처리 추가하기
  }

  /** -------------------- @category ?. 랜더링 -------------------- */
  // 이메일 바로 연결하는 버튼 추가하기
  private renderEmailShortcutBtn(email?: string) {
    let emailShortcutLink;

    switch (email?.split('@')[1]) {
      case 'gmail.com':
        emailShortcutLink = 'https://mail.google.com/';
        break;
      case 'naver.com':
        emailShortcutLink = 'https://mail.naver.com/';
        break;
    }
    emailShortcutLink = 'https://mail.google.com/';

    return emailShortcutLink
      ? html`
          <a target="_blank" rel="noopener noreferrer" href=${emailShortcutLink} class="btn-container">
            <button>메일 확인하기</button>
          </a>
        `
      : null;
  }

  render() {
    return html`
      <div class="div-verify-noti">
        <p>${this.userEmail!}(으)로<br />인증 메일이 발송되었습니다.</p>
      </div>
      ${this.renderEmailShortcutBtn(this.userEmail!)}
      <div class="div-email-resend">
        <small>메일을 받지 못하셨나요? <span @click=${this.onResendVerficationEmail}>다시 보내기</span></small>
      </div>
    `;
  }
}
