import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import { DependencyRequester } from '../../../../core/component/di';
import { browserRouter } from '../../../../core/router/BrowserRouter';
import btnStyle from '../../../style/share/btn.module.css';
import signupInfoStyle from '../../../style/part/fragment/sd.signup.info.module.css';
import svgLoading from '../../../../assets/icon/loading-white.svg';
import svgCheck from '../../../../assets/icon/check--main.svg';
import UserModel from '../../../model/UserModel';
import svgCancel from '../../../../assets/icon/cancel--red.svg';

@customElement('sd-signup-info')
class SDSignupInfo extends DependencyRequester(LitElement) {
  static styles = [btnStyle, signupInfoStyle];

  private userModel?: UserModel;
  private infoValidations = { email: false, password: false }; // 이메일, 비밀번호 유효성 검사 체크

  @property({ type: Object }) summonerInfo?: object;
  @property({ type: Boolean }) isEnterInfoFinished = false; // 정보 입력 : "가입하기" 버튼 활성화 여부 확인
  @property({ type: Object }) emailNoti = { display: 'none', icon: svgCancel, color: '', text: '' }; // 이메일 유효성 검사 알림
  @property({ type: Object }) passwordNoti = { display: 'none', icon: svgCancel, color: '', text: '' }; // 비밀번호 유효성 검사 알림
  @property({ type: Boolean }) userUploadLoading = false;

  /** @override */
  connectedCallback() {
    super.connectedCallback();
    this.userModel = this._requestInstance('Model:User');
  }

  willUpdate() {
    if (!this.summonerInfo) browserRouter.replace('/signin');
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) click 리스너 -------- */
  private async onJoin(e: Event) {
    e.preventDefault();
    const inputEmail = this.shadowRoot!.getElementById('email') as HTMLInputElement;
    const inputPassword = this.shadowRoot!.getElementById('password') as HTMLInputElement;
    const email = inputEmail.value;
    const password = inputPassword.value;

    this.userUploadLoading = true;
    const response = await this.userModel!.uploadUser(email, password, this.summonerInfo!);
    console.log(response);
    this.userUploadLoading = false;

    if (response.status !== 200) return; // 사용자 정보 업로드 실패 시 :TODO: 예외처리 추가하기
    this.dispatchEvent(
      new CustomEvent('SDSignupInfo:Completed', {
        detail: { email: email },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  /** -------- @category (2) onchange 리스너 -------- */
  private async onEmailInput(e: Event) {
    const inputEmail = e.currentTarget as HTMLInputElement;
    const regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    this.infoValidations.email = regularExpression.test(inputEmail.value);

    if (!this.infoValidations.email) {
      this.emailNoti = { display: 'flex', icon: svgCancel, color: 'var(--red-color)', text: '이메일 형식에 맞게 입력해주세요.' };
      this.isEnterInfoFinished = false;
      return;
    }
    const response = await this.userModel!.checkDuplicateEmail(inputEmail.value);

    switch (response.status) {
      case 409:
        this.emailNoti = { display: 'flex', icon: svgCancel, color: 'var(--red-color)', text: '중복된 이메일입니다.' };
        this.isEnterInfoFinished = false;
        break;
      case 200:
        this.emailNoti = { display: 'flex', icon: svgCheck, color: 'var(--primary)', text: '사용가능한 이메일 입니다.' };
        if (this.infoValidations.password) this.isEnterInfoFinished = true;
        break;
    }
  }

  // <2> 비밀번호 유효성 검사
  private onPasswordInput(e: Event) {
    const inputPassword = e.currentTarget as HTMLInputElement;

    const regularExpression = /^(?=.*[a-zA-Z])(?=.*[!@$%^*+=-])(?=.*[0-9]).{6,16}/;
    this.infoValidations.password = regularExpression.test(inputPassword.value);

    if (this.infoValidations.password) {
      this.passwordNoti = { display: 'flex', icon: svgCheck, color: 'var(--primary)', text: '사용가능한 비밀번호 입니다.' };
      if (this.infoValidations.email) this.isEnterInfoFinished = true;
      return;
    }
    this.passwordNoti = { display: 'flex', icon: svgCancel, color: 'var(--red-color)', text: '8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.' };
    this.isEnterInfoFinished = false;
  }

  render() {
    return html`
      <form class="form-enter-info">
        <div class="div-info-field">
          <label>이메일</label>
          <input id="email" type="email" @input=${this.onEmailInput} />
          <div class="div-validation" style=${styleMap({ display: this.emailNoti.display })}>
            <img src=${this.emailNoti.icon} alt="알림 아이콘" />
            <small style=${styleMap({ color: this.emailNoti.color })}>${this.emailNoti.text}</small>
          </div>
        </div>
        <div class="div-info-field">
          <label>비밀번호</label>
          <input id="password" type="password" @input=${this.onPasswordInput} />
          <div class="div-validation" style=${styleMap({ display: this.passwordNoti.display })}>
            <img src=${this.passwordNoti.icon} alt="알림 아이콘" />
            <small style=${styleMap({ color: this.passwordNoti.color })}>${this.passwordNoti.text}</small>
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" ?loading=${this.userUploadLoading} ?disabled=${!this.isEnterInfoFinished} @click=${this.onJoin}>
            <img src=${svgLoading} alt="로딩" />
            <span>가입하기</span>
          </button>
        </div>
      </form>
    `;
  }
}
