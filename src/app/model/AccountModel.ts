import Model from '../../core/Model';
import { AuthManager } from '../mixin/model/auth-manager';

type Account = {
  idx: number;
  teamIdx: number;
  summonerName: string;
  summonerId: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  soloTier: string;
  soloWins: number;
  soloLosses: number;
};

export default class AccountModel extends AuthManager(Model) {
  static account?: Account;

  // (1) 중복 소환사 체크 후 소환사 정보 가져오기
  async getSummonerInfo(summonerName: string) {
    const params = { summoner_name: summonerName };
    return await this._httpRequest(this._serverUrl + '/account-auth', 'GET', params);
  }

  // (2) 롤 계정 추가하기
  async uploadAccount(userIdx: number, summonerInfo: MutableObject) {
    const body = {
      userIdx: userIdx,
      summoner_name: summonerInfo.name,
      summoner_id: summonerInfo.id,
      puuid: summonerInfo.puuid,
      account_id: summonerInfo.accountId,
      profile_icon_id: summonerInfo.profileIconId,
    };
    return await this._httpRequest(this._serverUrl + '/account', 'POST', body);
  }

  async getActiveAccount() {
    const response = await this._httpAuthRequest(this._serverUrl + '/account/active', 'GET');

    if (response.status === 200) AccountModel.account = response.data!.activeAccount;
    return response;
  }

  // (4) 롤 계정 요청
  async getAccounts() {
    return await this._httpAuthRequest(this._serverUrl + '/account/all', 'GET');
  }
}
