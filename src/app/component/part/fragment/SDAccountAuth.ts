import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import { DependencyRequester } from '../../../../core/component/di';
import btnStyle from '../../../style/share/btn.module.css';
import accountStyle from '../../../style/part/fragment/sd.account.module.css';
import AccountModel from '../../../model/AccountModel';
import { getProfileIconUrl } from '../../../util/ddragon-api';
import imgSpinningRing from '../../../../assets/image/ring_spinner.png';
import svgSearch from '../../../../assets/icon/search.svg';
import svgArrow from '../../../../assets/icon/arrow-right--main.svg';
import svgExclmanation from '../../../../assets/icon/exclmanation.svg';
import svgCancel from '../../../../assets/icon/cancel--red.svg';

@customElement('sd-account-auth')
class SDSignupAccount extends DependencyRequester(LitElement) {
  static styles = [btnStyle, accountStyle];

  private accountModel?: AccountModel;
  private summonerInfo?: MutableObject; // 인증할 소환사
  private newIconId?: number; // 새로 제시한 아이콘 id

  @property({ type: String }) accountAuthStage: 'search' | 'auth' = 'search'; // 계정 인증 단계
  @property({ type: String }) currentIconSrc: string = getProfileIconUrl(29); // 현재 소환사 아이콘 이미지
  @property({ type: String }) changeIconSrc: string = getProfileIconUrl(29); // 변경해야할 소환사 아이콘 이미지
  @property({ type: Object }) authNoti = { icon: svgExclmanation, color: '', text: '소환사 닉네임으로 검색해보세요.' }; // 계정 인증 알림

  /** @override */
  connectedCallback() {
    super.connectedCallback();
    this.accountModel = this._requestInstance('Model:Account');
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  // (1) 소환사 검색
  private async onSummonerSearch(e: Event) {
    e.preventDefault();
    const formSearch = e.currentTarget as HTMLFormElement;
    const inputSearch = formSearch.querySelector('input[type="search"]') as HTMLInputElement;
    const response = await this.accountModel!.getSummonerInfo(inputSearch.value);

    switch (response.status) {
      case 200:
        this.summonerInfo = response.data!;
        this.newIconId = this.getRandomIconId(this.summonerInfo!.profileIconId);

        this.accountAuthStage = 'auth';
        this.currentIconSrc = getProfileIconUrl(this.summonerInfo!.profileIconId);
        this.changeIconSrc = getProfileIconUrl(this.newIconId);
        this.authNoti = { icon: svgExclmanation, color: 'var(--main-font-color)', text: `"${this.summonerInfo.name}"님의 소환사 아이콘을 우측 아이콘으로 변경해주세요.` };
        break;
      case 409:
        this.authNoti = { icon: svgCancel, color: 'var(--red-color)', text: '이미 가입한 소환사입니다.' };
        break;
      case 204:
        this.authNoti = { icon: svgCancel, color: 'var(--red-color)', text: '소환사가 존재하지 않습니다.' };
        break;
      default:
        console.error('onSummonerSearch : wrong response code');
        break;
    }
  }

  // 랜덤 소환사 아이콘 id
  private getRandomIconId(currentIconId: number) {
    while (true) {
      const newIconId = Math.floor(Math.random() * 20) + 1; //최댓값도 포함, 최솟값도 포함
      if (currentIconId != newIconId) return newIconId;
    }
  }

  // (2) 다시 검색 클릭
  private onReSearch(e: Event) {
    this.accountAuthStage = 'search';
    this.currentIconSrc = getProfileIconUrl(29);
    this.authNoti = { icon: svgExclmanation, color: 'var(--main-font-color)', text: '소환사 닉네임으로 검색해보세요.' };
  }

  // (3) 계정 인증 클릭
  private async onAuthenticate(e: Event) {
    const response = await this.accountModel!.getSummonerInfo(this.summonerInfo!.name);

    this.summonerInfo = response.data!;
    if (this.summonerInfo.profileIconId !== this.newIconId) {
      this.authNoti = { icon: svgCancel, color: 'var(--red-color)', text: `"${this.summonerInfo.name}"님의 소환사 아이콘을 우측 아이콘으로 변경해주세요.` };
      return;
    }
    this.dispatchEvent(
      new CustomEvent('SDAccountAuth:Completed', {
        detail: { summonerInfo: this.summonerInfo! },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  render() {
    return html`
      <div id="account-auth" stage=${this.accountAuthStage}>
        <div id="summoner-icons" class="div-summoner-icons">
          <figure id="current-icon-box" class="figure-summoner-icon">
            <img id="current-icon-loading" class="figure-summoner-icon__img figure-summoner-icon__img--loading" src=${imgSpinningRing} alt="로딩" />
            <img id="current-icon" class="figure-summoner-icon__img figure-summoner-icon__img--summoner" src=${this.currentIconSrc} alt="소환사 아이콘" />
          </figure>

          <figure class="figure-arrow">
            <img src=${svgArrow} alt="더보기" />
          </figure>

          <figure id="change-icon-box" class="figure-summoner-icon">
            <img id="change-icon-loading" class="figure-summoner-icon__img figure-summoner-icon__img--loading" src=${imgSpinningRing} alt="로딩" />
            <img id="change-icon" class="figure-summoner-icon__img figure-summoner-icon__img--summoner" src=${this.changeIconSrc} alt="소환사 아이콘" />
          </figure>
        </div>

        <div id="auth-noti" class="div-auth-noti">
          <img src=${this.authNoti.icon} alt="알림 아이콘" />
          <small style=${styleMap({ color: this.authNoti.color })}>${this.authNoti.text}</small>
        </div>

        <form class="form-search-account" @submit=${this.onSummonerSearch}>
          <img src=${svgSearch} alt="검색" />
          <input type="search" placeholder="롤 닉네임으로 검색" />
        </form>

        <!-- 버튼 박스 -->
        <div class="btn-container">
          <button id="research-btn" @click=${this.onReSearch}>다시 검색</button>
          <button id="verify-btn" @click=${this.onAuthenticate}>계정 인증</button>
        </div>
      </div>
    `;
  }
}
