import { LitElement, ReactiveController } from 'lit';
import AccountModel from '../model/AccountModel';
import UserModel from '../model/UserModel';

// 모바일(안드로이드) 사용할 때 필요 : 팝업 모달 뒤로가기 버튼 누르면 dismiss되도록
export default class AuthStateController implements ReactiveController {
  private host?: LitElement;
  private onBoundAuthStateChange = this.onAuthChange.bind(this);
  signin?: boolean;

  constructor(host: LitElement, userModel: UserModel, accountModel: AccountModel) {
    (this.host = host).addController(this);
    this.autoSignin(userModel, accountModel);
  }

  hostConnected() {
    addEventListener('authState', this.onBoundAuthStateChange.bind(this));
  }

  hostDisconnected() {
    removeEventListener('authState', this.onBoundAuthStateChange.bind(this));
  }

  // 자동 로그인 리스너
  private async autoSignin(userModel: UserModel, accountModel: AccountModel) {
    const authResponse = await userModel.refreshAccessToken(); // access token 요청

    this.signin = false;
    if (authResponse.status === 200) {
      const accountResponse = await accountModel.getAccounts(); // 롤 계정 정보 요청
      this.signin = accountResponse.status === 200;
    }
    this.host!.requestUpdate();
  }

  private onAuthChange(e: Event) {
    e.stopPropagation();
    this.signin = (e as CustomEvent).detail;
    this.host!.requestUpdate();
  }
}
