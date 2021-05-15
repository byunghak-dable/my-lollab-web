import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { OverlayHost } from '../../mixin/component/overlay';
import MediaQueryController from '../../controller/MediaQueryController';
import { lazyLoad } from '../../../core/component/async';
import { browserRouter } from '../../../core/router/BrowserRouter';
import btnStyle from '../../style/share/btn.module.css';
import svgStyle from '../../style/share/svg.module.css';
import defaultPageStyle from '../../style/share/default.page.module.css';
import recruitStyle from '../../style/page/sd.recruit.module.css';
import svgSend from '../../../assets/icon/send-white.svg';
import svgMicronphone from '../../../assets/icon/microphone.svg';
import svgMicronphoneSlash from '../../../assets/icon/micronphone-slash.svg';
import { Champion } from '../part/card/SDChampionCard';

export type RecruitParams = { tab: string; page: number };
type SummonerInfo = {
  name: string;
  profileIconId: number;
  position: RiotPosition;
  tier: string;
  tierRank?: number;
  wins: number;
  losses: number;
  kda: string;
  kdaAverage: number;
  oneWord: string;
  voice: boolean;
  date: string;
  champions: Champion[];
};

@customElement('sd-recruit')
class SDRecruit extends OverlayHost(LitElement) {
  static styles = [btnStyle, svgStyle, defaultPageStyle, recruitStyle];

  private tabs = ['팀원', '용병'];

  @property({ type: Object }) params?: RecruitParams;
  @property({ type: Object }) teamMemberInfo?: { totalPage: number; summoners: SummonerInfo[] };
  @property({ type: Object }) mercenaryInfo?: { totalPage: number; summoners: SummonerInfo[] };

  constructor() {
    super();
    new MediaQueryController(this, '(max-width: 1250px)');
    this.test();
    this.addEventListener('SDTab:ActiveTab', this.onTabChange.bind(this));
  }

  private test() {
    const champion = { nameEng: 'Aatrox', nameKor: '아트록스', odds: 50, kda: '2.5/3.4/14.1', kdaAverage: 3.5, cs: 118, csPerMinute: 7.3 };
    const champion2 = { nameEng: 'Lux', nameKor: '럭스', odds: 44, kda: '2.5/3.4/14.1', kdaAverage: 3.5, cs: 118, csPerMinute: 7.3 };
    const champion3 = { nameEng: 'Garen', nameKor: '가렌', odds: 34, kda: '2.5/3.4/14.1', kdaAverage: 3.5, cs: 118, csPerMinute: 7.3 };
    const team = {
      name: '육군전역자',
      profileIconId: 1,
      position: 'BOT' as RiotPosition,
      tier: 'G',
      tierRank: 3,
      lp: 23,
      odds: 75,
      wins: 234,
      losses: 150,
      kda: '3.0/6.6/15.1',
      kdaAverage: 2.6,
      oneWord: '전적 봐주세요. 잘합니다~',
      voice: true,
      date: '하루 전',
      champions: [champion, champion3, champion2],
    };
    const mercenary = {
      name: 'coconutt01',
      profileIconId: 1,
      position: 'JGL' as RiotPosition,
      tier: 'P',
      tierRank: 3,
      lp: 23,
      odds: 75,
      wins: 150,
      losses: 300,
      kda: '3.0/6.6/15.1',
      kdaAverage: 3.6,
      oneWord: '전적 봐주세요. 잘합니다~',
      voice: false,
      date: '1분 전',
      champions: [champion, champion3, champion2],
    };
    this.teamMemberInfo = { totalPage: 5, summoners: [mercenary, mercenary, mercenary, mercenary, team, team, team, team, team, team, team] };
    this.mercenaryInfo = { totalPage: 3, summoners: [mercenary, mercenary, mercenary, mercenary, mercenary, mercenary] };
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) 커스텀 리스너 -------- */
  private onTabChange(e: Event) {
    e.stopPropagation();
    const position = (e as CustomEvent).detail.position;
    const targetName = this.tabs[position];

    if (targetName === '팀원') return browserRouter.replace('/recruit/team');
    if (targetName === '용병') return browserRouter.replace('/recruit/mercenary');
  }

  /** -------------------- @category ?. 렌더링 -------------------- */
  private renderSummonerCards(currentTab: string, tab: string, id: string, cardMode: boolean, summoners?: SummonerInfo[]) {
    if (currentTab === tab) {
      return summoners?.map((summoner, index) =>
        lazyLoad(
          import('../part/card/SDSummonerCard'),
          html`
            <sd-summoner-card data-id=${id} data-position=${index} ?card=${cardMode} .summoner=${summoner}>
              <p>${summoner.oneWord}</p>
              <span>${summoner.date}</span>
              <img class="img-voice" src=${summoner.voice ? svgMicronphone : svgMicronphoneSlash} alt="해드폰" />
              <button class="btn-default"><img src=${svgSend} alt="초대" /></button>
            </sd-summoner-card>
          `
        )
      );
    }
  }

  private renderPagination(currentTab: string, tab: string, path: string, page: number, totalPage?: number) {
    if (currentTab === tab) {
      if (totalPage) {
        return lazyLoad(import('../part/SDPagination'), html`<sd-pagination .activePage=${page} .config=${{ path: path, totalPage: totalPage }} />`);
      }
    }
  }

  render() {
    const cardMode = innerWidth <= 1250;

    return html`
      ${lazyLoad(import('../part/SDTab'), html`<sd-tab .active=${this.params!.tab} .tabs=${this.tabs} />`)}
      <!-- 상세 검색  -->
      <section class="section-search">
        ${lazyLoad(import('../part/SDSearchFillter'), html`<sd-search-filter .placeHolder=${`소환사 검색`} />`)}
        <!-- TODO: 상세 검색 필터 추가하기 -->
      </section>
      <!-- 팀원 리스트 -->
      <section class="section-summoners">
        <header>
          <h2>소환사 영입</h2>
          <span>팀에 필요한 소환사를 영입해보세요</span>
        </header>
        <article class="article-summoner" ?card=${cardMode}>
          ${cardMode
            ? null
            : html`
                <div class="div-table-title">
                  <span>소환사</span>
                  <span>라인</span>
                  <span>티어</span>
                  <span>선호 챔피언</span>
                  <span>KDA</span>
                  <span>승률</span>
                  <span>한 마디</span>
                  <span>등록일</span>
                </div>
              `}
          <!-- 팀원 리스트 -->
          ${this.renderSummonerCards(this.params!.tab, '팀원', 'team-member', cardMode, this.teamMemberInfo?.summoners)}
          <!-- 용병 리스트 -->
          ${this.renderSummonerCards(this.params!.tab, '용병', 'mercenary', cardMode, this.mercenaryInfo?.summoners)}
        </article>
      </section>

      <div class="div-pagination">
        <!-- 팀원 페이지 -->
        ${this.renderPagination(this.params!.tab, '팀원', '/recruit/team/page', this.params!.page, this.teamMemberInfo?.totalPage)}
        <!-- 용병 페이지 -->
        ${this.renderPagination(this.params!.tab, '용병', '/recruit/mercenary/page', this.params!.page, this.mercenaryInfo?.totalPage)}
      </div>
      <!-- 글쓰기 플로팅 버튼 -->
      <div class="div-floating">
        <svg class="svg-default" @click=${() => this._onOverlayTrigger('recruit-modal')} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512">
          <path
            d="M290.74 93.24l128.02 128.02l-277.99 277.99l-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22l277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55l128.02 128.02l56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
            fill="#626262"
          />
          <rect x="0" y="0" width="512" height="512" fill="rgba(0, 0, 0, 0)" />
        </svg>
      </div>
      <!-- 리쿠르팅 모달 -->
      ${lazyLoad(import('../part/modal/SDRecruitModal'), html`<sd-recruit-modal data-hash="#recruit" id="recruit-modal" ?focused=${location.hash === '#recruit'} />`)}
    `;
  }
}
