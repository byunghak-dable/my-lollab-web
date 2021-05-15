import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import { lazyLoad } from '../../../core/component/async';
import { DependencyRequester } from '../../../core/component/di';
import btnStyle from '../../style/share/btn.module.css';
import signinStyle from '../../style/page/sd.signin.module.css';
import UserModel from '../../model/UserModel';
import AccountModel from '../../model/AccountModel';
import imgLogo from '../../../assets/image/logo/logo.png';
import svgKakao from '../../../assets/icon/kakao.svg';
import svgGoogle from '../../../assets/icon/google.svg';
import { browserRouter } from '../../../core/router/BrowserRouter';

@customElement('sd-signin')
class SDSignin extends DependencyRequester(LitElement) {
  static styles = [btnStyle, signinStyle];

  private userModel?: UserModel;
  private accountModel?: AccountModel;

  @property({ type: Boolean }) keepSignin = false;
  @property({ type: Boolean }) signinNoti?: { display: 'none' | 'block'; text?: string };

  /** @override */
  connectedCallback() {
    super.connectedCallback();
    this.userModel = this._requestInstance('Model:User');
    this.accountModel = this._requestInstance('Model:Account');
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  private async onGeneralSignin(e: Event) {
    e.preventDefault();
    const inputEmail = this.shadowRoot!.getElementById('email') as HTMLInputElement;
    const inputPassword = this.shadowRoot!.getElementById('password') as HTMLInputElement;
    const signinResponse = await this.userModel!.signin(inputEmail.value, inputPassword.value);
    if (signinResponse.status !== 200) {
      this.signinNoti = { display: 'block', text: '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.' };
      return;
    }
    const accountResponse = await this.accountModel!.getActiveAccount();
    if (accountResponse.status !== 200) {
      this.signinNoti = { display: 'block', text: '롤 계정을 불러오는데 실패했습니다. 다시 로그인해주세요.' };
      return;
    }
    UserModel.dispatchUserState(true);
    browserRouter.navigate('/');
  }

  render() {
    return html`
      <section>
        <div class="div-title">
          <img src=${imgLogo} alt="로고" />
          <h1>로그인</h1>
        </div>
        <!-- 일반 로그인 -->
        <form class="form-general-signin" method="post" @submit=${this.onGeneralSignin}>
          <div class="div-input">
            <label for="email">이메일</label>
            <input required id="email" type="email" />
          </div>
          <div class="div-input">
            <label for="password">비밀번호</label>
            <input required id="password" type="password" />
          </div>
          <div class="div-setting">
            ${lazyLoad(import('../part/SDCheckbox'), html`<sd-checkbox ?checked=${this.keepSignin} @click=${() => (this.keepSignin = !this.keepSignin)} />`)}
            <label>로그인 상태 유지</label>
          </div>
          <div class="div-alternative">
            <router-link>비밀번호 찾기</router-link>
            <router-link href="/signup/terms">회원가입</router-link>
          </div>
          <div class="btn-container">
            <!-- TODO: 로딩 이미지 추가하기 -->
            <button type="submit" class="btn-signin">로그인</button>
          </div>
          <small style=${styleMap({ display: this.signinNoti?.display })}>${this.signinNoti?.text}</small>
        </form>
        <!-- sns 로그인 TODO: 클래스 명 수정하기 -->
        <div class="btn-container btn-container--sns">
          <button id="kakao-btn" class="btn-kakao">
            <figure><img src=${svgKakao} alt="카카오" /></figure>
            <div><span>카카오로 시작하기</span></div>
          </button>
          <button id="google-btn" class="btn-google">
            <figure><img src=${svgGoogle} alt="구글" /></figure>
            <div><span>구글로 시작하기</span></div>
          </button>
        </div>
      </section>
    `;
  }
}
