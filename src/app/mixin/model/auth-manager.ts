import Model from '../../../core/Model';
import UserModel from '../../model/UserModel';

export const AuthManager = <TBase extends Constructor<Model>>(Base: TBase) => {
  class Mixin extends Base {
    /** -------------------- @category 2. 사용자 인증 관련 -------------------- */
    // (1) 메인 서버에 토큰 처리가 필요한 통신을 하는 요청
    protected async _httpAuthRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', dataObj?: object) {
      if (UserModel.user) {
        const response = await this._httpRequest(url, method, dataObj, { headers: { Authorization: 'Bearer ' + UserModel.user.accessToken } });
        if (response.status !== 410) return response; // 엑세스 토큰 만기 에러 응답이 아니라면 성공한 요청
      }
      const refreshResopnse = await this.dispatchRefreshAccess();

      if (refreshResopnse.status !== 200) return refreshResopnse;
      return await this._httpRequest(url, method, dataObj, { headers: { Authorization: 'Bearer ' + UserModel.user!.accessToken }, cache: 'no-cache' });
    }

    // (2) refresh access token 결과를 이벤트로 알리는 메소드
    private async dispatchRefreshAccess() {
      const response = await this.refreshAccessToken();
      const isSignin = response.status === 200;

      UserModel.dispatchUserState(isSignin);
      return response;
    }

    // (3) refresh access token
    async refreshAccessToken() {
      const response = await this._httpRequest(this._serverUrl + '/token/jwt', 'POST', undefined, { credentials: 'include' });

      if (response.status === 200) {
        const accessToken = response.data!.access_token;
        UserModel.setAccessToken(accessToken);
        return response;
      }
      UserModel.onSignout();
      return response;
    }
  }
  return Mixin;
};
