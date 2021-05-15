import { html, LitElement, Template, TemplateResult } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { DependencyRequester } from '../../../core/component/di';
import { lazyLoad } from '../../../core/component/async';
import { browserRouter } from '../../../core/router/BrowserRouter';
import btnStyle from '../../style/share/btn.module.css';
import signUpStyle from '../../style/page/sd.signup.module.css';
import imgLogo from '../../../assets/image/logo/logo.png';
import svgCheck from '../../../assets/icon/check--main.svg';

export type SignupParams = { step: number };

@customElement('sd-signup')
class SDSignup extends DependencyRequester(LitElement) {
  static styles = [btnStyle, signUpStyle];

  private summonerInfo?: MutableObject; // 롤 계정 인증 관련 : 인증할 소환사
  private userEmail?: string; // 이메일 인증 관련 : 업로드한 사용자 이메일
  private titleView?: TemplateResult;
  private guidanceView?: TemplateResult;

  @property({ type: Object }) params?: SignupParams;

  constructor() {
    super();
    if (location.pathname === '/signup/account-auth') browserRouter.replace('/signin'); // 약관 동의 없이 계정 인증 단계로 넘어갈 떄
    this.addEventListener('SDAccountAuth:Completed', this.onAccountAuthCompleted.bind(this));
    this.addEventListener('SDSignupInfo:Completed', this.onEnterInfoCompleted.bind(this));
  }

  // 롤 계정 인증 완료
  private onAccountAuthCompleted(e: Event) {
    e.stopPropagation();
    this.summonerInfo = (e as CustomEvent).detail.summonerInfo;
    browserRouter.navigate('/signup/info');
  }

  // 사용자 정보 입력 완료
  private onEnterInfoCompleted(e: Event) {
    e.stopPropagation();
    this.userEmail = (e as CustomEvent).detail.email;
    browserRouter.navigate('/signup/email-auth');
  }

  /** -------------------- @category 1. 랜더링 -------------------- */
  private renderCurrentStep(step: number) {
    switch (step) {
      case 1:
        return lazyLoad(import('../part/fragment/SDAccountAuth'), html`<sd-account-auth />`);
      case 2:
        return lazyLoad(import('../part/fragment/SDSignupInfo'), html`<sd-signup-info .summonerInfo=${this.summonerInfo!} />`);
      case 3:
        return lazyLoad(import('../part/fragment/SDSignupEmailAuth'), html`<sd-signup-email-auth .userEmail=${this.userEmail!} />`);
      case 4:
        return lazyLoad(import('../part/fragment/SDSignupComplete'), html`<sd-signup-complete />`);
    }
    return lazyLoad(import('../part/fragment/SDSignupTerms'), html`<sd-signup-terms />`);
  }

  private renderIntro(step: number) {
    let title: string | null = null;
    let guidanceContents: TemplateResult | null = null;

    switch (step) {
      case 1:
        guidanceContents = html`<strong>계정 인증 단계</strong>에서는 롤 클라이언트에 접속하여 <strong>소환사 아이콘</strong>을 LoL LAb에서 제공하는 아이콘으로 변경하는 것을 통해 인증이 진행됩니다.`;
        break;
      case 2:
        guidanceContents = html`회원가입을 위해서 <strong>이메일 인증</strong>이 진행되며, 인증이 완료되기 전까지 회원가입이 완료가 되지 않습니다.`;
        break;
      case 3:
        title = '이메일 인증 안내';
        guidanceContents = html`메일을 <strong>1시간</strong> 이내에 확인한 후 인증 버튼을 클릭해야 <strong>55L</strong> 회원가입을 완료하실 수 있습니다.`;
        break;
      case 4:
        title = '회원가입 완료';
        guidanceContents = html`<strong>LoL LAB </strong>회원이 되신 것을 축하드립니다.<br />나만의 롤 팀을 만들고 재밌는 <strong>팀 게임</strong>을 즐겨보세요.`;
        break;
    }
    this.titleView = title ? html`<h4>${title}</h4>` : undefined;
    this.guidanceView = guidanceContents ? html`<p class="p-intro">${guidanceContents}</p>` : undefined;
  }

  render() {
    this.renderIntro(this.params!.step);
    return html`
      <section class="section-sign-up">
        <article class="article-title">
          <img src=${imgLogo} alt="로고" />
          <h1>회원가입</h1>
        </article>
        <!-- 회원가입 step -->
        <article class="article-steps">
          ${['약관 동의', '계정 인증', '정보 입력', '가입 완료'].map((name, index) => {
            const completed = index < this.params!.step;

            return html`
              <div class="div-step" ?completed=${completed}>
                <span class="div-step__span">${name}</span>
                <div class="div-round">${completed ? html` <img src=${svgCheck} alt="체크" /> ` : null}</div>
              </div>
              ${index < 3 ? html`<div class="div-line" ?completed=${completed}></div>` : null}
            `;
          })}
        </article>
        <article class="article-main">
          <!-- 현재 단계 제목 -->
          ${this.titleView}
          <!-- 현재 단계 가이드 -->
          ${this.guidanceView}
          <!-- 현재 단계 -->
          ${this.renderCurrentStep(this.params!.step)}
        </article>
      </section>
    `;
  }
}
