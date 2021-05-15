import { LitElement, ReactiveController } from 'lit';
import { browserRouter } from '../../core/router/BrowserRouter';
import AccountModel from '../model/AccountModel';
import UserModel from '../model/UserModel';

export default class AuthController implements ReactiveController {
  private host?: LitElement;
  private onBoundUserState = this.onUserState.bind(this);
  signin?: boolean;
  authState?: string;

  /**
   * SDApp 컴포넌트에서만 사용
   * - 다른 페이지에서 로그인 여부를 확인하고 싶으면, property로 전달
   */
  constructor(host: LitElement, userModel: UserModel, accountModel: AccountModel) {
    (this.host = host).addController(this);
    this.autoSignin(userModel, accountModel);
  }

  hostConnected() {
    addEventListener('userState', this.onBoundUserState.bind(this));
  }

  hostDisconnected() {
    removeEventListener('userState', this.onBoundUserState.bind(this));
  }

  // 자동 로그인
  private async autoSignin(userModel: UserModel, accountModel: AccountModel) {
    const authResponse = await userModel.refreshAccessToken(); // access token 요청
    this.signin = false;
    if (authResponse.status === 200) {
      const accountResponse = await accountModel.getActiveAccount(); // 롤 계정 정보 요청
      if (accountResponse.status === 200) this.signin = true;
    }
    this.host!.requestUpdate();
  }

  // 사용자 인증 리스너
  private onUserState(e: Event) {
    e.stopPropagation();
    const detail = (e as CustomEvent).detail;
    this.signin = detail.signin;
    this.checkUserState(detail.state);
  }

  private checkUserState(authState: string) {
    if (authState === 'duplicate-signin') {
      const detail = { title: '중복 로그인', body: '다른 기기에서 로그인 하여 이 기기에서는 자동으로 로그아웃 되었습니다. ' };
      this.host!.dispatchEvent(new CustomEvent('Alert', { detail }));
      browserRouter.navigate('/');
      return;
    }
    this.host!.requestUpdate();
  }
}
