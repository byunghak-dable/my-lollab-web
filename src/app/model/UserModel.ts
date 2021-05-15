import Model from '../../core/Model';
import AccountModel from './AccountModel';
import { AuthManager } from '../mixin/model/auth-manager';
import { fcm } from '../util/firebase';

export default class UserModel extends AuthManager(Model) {
  static user?: { idx: number; email: string; accessToken: string };
  static mobileDevice = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && innerWidth < 480;

  constructor() {
    super();
    if (Notification.permission !== 'granted') Notification.requestPermission(); // TODO: https 적용 후 테스트해보기
    fcm.onMessage(this.onDuplicateSignin.bind(this));
  }

  private onDuplicateSignin(payload: any) {
    const target = payload.data.target;

    if (target === 'duplicate-signin') {
      UserModel.onSignout();
      UserModel.dispatchUserState(false, 'duplicate-signin');
    }
  }

  /** -------------------- @category 1. 회원가입 -------------------- */
  // (1) 이메일 중복 확인
  async checkDuplicateEmail(email: string) {
    const params = { email: email };
    return await this._httpRequest(this._serverUrl + '/signup/verification/email', 'GET', params);
  }

  // (2) 유저 정보 업로드
  async uploadUser(email: string, password: string, summonerInfo: MutableObject) {
    const body = {
      email: email,
      password: password,
      summoner_name: summonerInfo.name,
      summoner_id: summonerInfo.id,
      puuid: summonerInfo.puuid,
      account_id: summonerInfo.accountId,
      profile_icon_id: summonerInfo.profileIconId,
    };
    return await this._httpRequest(this._serverUrl + '/signup', 'POST', body); // TODO: 테스트 중
  }

  /** -------------------- @category 2. 로그인, 로그아웃, JWT -------------------- */
  // (1) 일반 로그인
  async signin(email: string, password: string) {
    const firebaseToken = await this.getFirebaseToken();
    const body = { email: email, password: password, firebase_token: firebaseToken };
    const response = await this._httpRequest(this._serverUrl + '/signin/general', 'POST', body, { credentials: 'include' });

    if (response.status === 200) UserModel.setAccessToken(response.data!.access_token);
    return response;
  }

  // (?) 로그아웃
  async signout() {
    const response = await this._httpRequest(this._serverUrl + '/signout', 'DELETE', undefined, { credentials: 'include' });

    if (response.status === 200) {
      UserModel.onSignout();
      UserModel.dispatchUserState(false);
    }
    return response;
  }

  /** -------------------- @category 3. 파이어베이스 -------------------- */
  async getFirebaseToken() {
    const localToken = localStorage.getItem('firebase-token');
    if (localToken) return localToken;
    if (Notification.permission! === 'denied') return '';

    const token = await fcm.getToken();
    localStorage.setItem('firebase-token', token);
    return token;
  }

  /** -------------------- @category ?. 유틸 -------------------- */
  // 서버에서 응답받은 access token 저장 + 만료 시간전에 삭제 timeout
  static setAccessToken(accessToken: string) {
    const encodedPayload = accessToken.split('.')[1];
    const payload = JSON.parse(atob(encodedPayload));
    const userIdx = payload.data.user_idx;
    const email = payload.data.email;
    const expireTime = payload.exp;
    const expireTimeout = expireTime * 1000 - Date.now() - 10000;

    setTimeout(() => (UserModel.user = undefined), expireTimeout); // 만료 시간 전에 access token 클라이언트에서 제거
    UserModel.user = { idx: userIdx, email: email, accessToken: accessToken };
  }

  // 로그인 상태 이벤트
  static dispatchUserState(signin: boolean, state?: string) {
    const detail = state ? { signin: signin, state: state } : { signin: signin };
    dispatchEvent(new CustomEvent('userState', { detail: detail }));
  }

  // 로그아웃할 떄
  static onSignout() {
    UserModel.user = undefined;
    AccountModel.account = undefined;
  }
}
