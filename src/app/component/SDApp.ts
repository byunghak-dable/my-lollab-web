import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { DependencyProvider } from '../../core/component/di';
import { lazyLoad, PendingContainer } from '../../core/component/async';
import { browserRouter } from '../../core/router/BrowserRouter';
import AuthController from '../controller/AuthController';
import UserModel from '../model/UserModel';
import RecruitModel from '../model/RecruitModel';
import AccountModel from '../model/AccountModel';
import sdAppStyle from '../style/sd.app.module.css';
import progressStyle from '../style/essential/progress.linear.module.css';
import '../style/index.css';
import { MatchParams } from './page/SDMatches';
import { RecruitParams } from './page/SDRecruit';
import { SignupParams } from './page/SDSignup';
import { TeamsParams } from './page/SDTeams';
import { TeamParams } from './page/SDTeam';
import { AlertHost } from '../mixin/component/overlay';

@customElement('sd-app')
export class SDApp extends AlertHost(PendingContainer(DependencyProvider(LitElement))) {
  static styles = [progressStyle, sdAppStyle];

  private authController!: AuthController;

  @property({ type: Object }) view?: { path: string; header?: boolean; footer?: boolean; params?: object };

  constructor() {
    super();
    const userModel = new UserModel();
    const accountModel = new AccountModel();
    this.authController = new AuthController(this, userModel, accountModel);
    this.provideDependency(userModel, accountModel);
    this.defineRoute();
  }

  // 앱 동작시 필요한 객체 제공하는 메소드
  private async provideDependency(userModel: UserModel, accountModel: AccountModel) {
    this._provideInstance('Model:User', userModel);
    this._provideInstance('Model:Account', accountModel);
    this._provideInstance('Model:Recruit', new RecruitModel());
  }

  private defineRoute() {
    browserRouter.addRoute('/', () => this.setView('/')); // 홈 페이지
    /** -------- @category 1. 콘텐츠 -------- */
    // 대회
    browserRouter.addRoute('/match/scrim', () => this.setView('/match/scrim', { tab: '스크림', page: 1 }));
    browserRouter.addRoute('/match/tournament', () => this.setView('/match/tournament', { tab: '대회', page: 1 }));
    browserRouter.addRoute('/match/tournament/page/:page([0-9]+)', (page: number) => this.setView('/match/tournament', { tab: '대회', page: +page }));
    // 리쿠르트
    browserRouter.addRoute('/recruit/team', () => this.setView('/recruit/team', { tab: '팀원', page: 1 }));
    browserRouter.addRoute('/recruit/mercenary', () => this.setView('/recruit/mercenary', { tab: '용병', page: 1 }));
    // 팀
    browserRouter.addRoute('/team/rank', () => this.setView('/team/rank', { tab: '랭킹', page: 1 }));
    browserRouter.addRoute('/team/new', () => this.setView('/team/new', { tab: '신규', page: 1 }));
    browserRouter.addRoute('/team/:teamIdx([0-9]+)', (teamIdx: number) => this.setView('/team', { teamIdx: +teamIdx }));
    browserRouter.addRoute('/team/creation', () => this.setView('/team'));
    // 다운로드
    browserRouter.addRoute('/download', () => this.setView('/download')); // 고객 지원
    /** -------- @category 2. 사용자 -------- */
    browserRouter.addRoute('/signin', () => this.setView('/signin', undefined, false, false)); // 로그인
    browserRouter.addRoute('/signup/terms', () => this.setView('/signup/terms', { step: 0 }, false, false)); // 회원가입 - 약관 동의
    browserRouter.addRoute('/signup/account-auth', () => this.setView('/signup/account-auth', { step: 1 }, false, false)); // 회원가입 - 계정 인증
    browserRouter.addRoute('/signup/info', () => this.setView('/signup/info', { step: 2 }, false, false)); // 회원가입 - 정보 입력
    browserRouter.addRoute('/signup/email-auth', () => this.setView('/signup/email-auth', { step: 3 }, false, false)); // 회원가입 - 이메일 인증
    browserRouter.addRoute('/signup/completed', () => this.setView('/signup/completed', { step: 4 }, false, false)); // 회원가입 - 회원 가입 완료
    browserRouter.addRoute('*', () => this.setView('*', undefined, false, false)); // 404 에러 페이지
  }

  private setView(path: string, params?: MutableObject, isHeader = true, isFooter = true) {
    const metaDescription = document.getElementById('meta-description') as HTMLMetaElement;
    const currentPageInfo = this.setPageInfo(path);

    this.view = { path: path, header: isHeader, footer: isFooter, params: params };
    document.title = currentPageInfo.title;
    metaDescription.content = currentPageInfo.content ? currentPageInfo.content : '';
  }

  private setPageInfo(page: string) {
    switch (page) {
      case '/':
        return { title: 'LoL Lab', content: 'home' };
      /** -------- @category 1. 콘텐츠 -------- */
      case '/match/scrim':
        return { title: 'LoL Lab', content: 'lol scrim match service' };
      case '/match/tournament':
      case '/match/tournament/page/:page([0-9]+)':
        return { title: 'LoL Lab', content: 'lol tournament match service' };
      case '/recruit/team':
        return { title: 'LoL Lab', content: 'recruit' };
      case '/recruit/mercenary':
        return { title: 'LoL Lab', content: 'recruit' };
      case '/team/rank':
        return { title: 'LoL Lab', content: 'team' };
      case '/team/new':
        return { title: 'LoL Lab', content: 'team' };
      case '/team':
        return { title: 'LoL Lab', content: 'my team' };
      case '/download':
        return { title: 'LoL Lab', content: 'download' };
      /** -------- @category 2. 사용자 -------- */
      case '/signin':
        return { title: '로그인', content: 'sign in' };
      case '/signup/terms':
        return { title: '회원가입 - 약관 동의', content: 'terms' };
      case '/signup/account-auth':
        return { title: '회원가입 - 계정 인증', content: 'lol account auth' };
      case '/signup/info':
        return { title: '회원가입 - 정보 입력', content: 'entering user info' };
      case '/signup/email-auth':
        return { title: '회원가입 - 이메일 인증', content: 'email verification' };
      case '/signup/completed':
        return { title: '회원가입 - 가입 완료', content: 'sign up completed' };
    }
    return { title: '404 page' };
  }

  private renderPage(path?: string, params?: object) {
    switch (path) {
      case '/':
        return lazyLoad(import(/* webpackChunkName: "SDHome" */ './page/SDHome'), html`<sd-home />`);
      /** -------- @category 1. 콘텐츠 -------- */
      case '/match/scrim':
      case '/match/tournament':
      case '/match/tournament/page/:page([0-9]+)':
        return lazyLoad(import(/* webpackChunkName: "SDMatches" */ './page/SDMatches'), html`<sd-matches .params=${params as MatchParams} />`);
      case '/recruit/team':
      case '/recruit/mercenary':
        return lazyLoad(import(/* webpackChunkName: "SDRecruit" */ './page/SDRecruit'), html`<sd-recruit .params=${params as RecruitParams} />`);
      case '/team/rank':
      case '/team/new':
        return lazyLoad(import(/* webpackChunkName: "SDTeams" */ './page/SDTeams'), html`<sd-teams .params=${params as TeamsParams} />`);
      case '/team':
        return lazyLoad(import(/* webpackChunkName: "SDTeam" */ './page/SDTeam'), html`<sd-team .params=${params as TeamParams} />`);
      case '/download':
        return lazyLoad(import(/* webpackChunkName: "SDDownload" */ './page/SDDownload'), html`<sd-download />`);
      /** -------- @category 2. 사용자 -------- */
      case '/signin':
        return lazyLoad(import(/* webpackChunkName: "SDSigin" */ './page/SDSigin'), html`<sd-signin />`);
      case '/signup/terms':
      case '/signup/account-auth':
      case '/signup/info':
      case '/signup/email-auth':
      case '/signup/completed':
        return lazyLoad(import(/* webpackChunkName: "SDSignup" */ './page/SDSignup'), html`<sd-signup .params=${params as SignupParams} />`);
    }
    return lazyLoad(import(/* webpackChunkName: "SD404" */ './page/SD404'), html`<sd-404 />`);
  }

  render() {
    return html`
      <progress class="progress-linear" ?closed=${!this._hasPendingChildren}></progress>
      ${this.view?.header
        ? lazyLoad(
            import(/* webpackChunkName: "SDHeader" */ './essential/SDHeader'),
            html`<header><sd-header .path=${this.view!.path + location.hash} .signin=${this.authController.signin} /></header>`
          )
        : null}
      <main>${this.renderPage(this.view?.path, this.view?.params)}</main>
      ${this.view?.footer ? lazyLoad(import(/* webpackChunkName: "SDFooter" */ './essential/SDFooter'), html`<footer><sd-footer /></footer>`) : null}
      ${lazyLoad(import('./part/modal/SDAlertModal'), html`<sd-alert-modal id="alert-modal" data-hash="#alert" ?focused=${location.hash === '#alert'} .alert=${this._alert} />`)}
    `;
  }
}
