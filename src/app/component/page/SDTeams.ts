import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { lazyLoad } from '../../../core/component/async';
import { browserRouter } from '../../../core/router/BrowserRouter';
import defaultPageStyle from '../../style/share/default.page.module.css';
import teamsStyle from '../../style/page/sd.teams.module.css';
import { TeamCard } from '../part/card/SDTeamCard';

export type TeamsParams = { tab: string; page: number };

@customElement('sd-teams')
class SDTeam extends LitElement {
  static styles = [defaultPageStyle, teamsStyle];

  private tabs = ['랭킹', '신규'];

  @property({ type: Object }) params?: TeamsParams;
  @property({ type: Object }) teamInfoByRank?: { totalPage: number; teams: TeamCard[] };
  @property({ type: Object }) teamInfoByCreationDate?: { totalPage: number; teams: TeamCard[] };

  constructor() {
    super();
    this.test();
    this.addEventListener('SDTab:ActiveTab', this.onTabChange.bind(this));
  }

  private test() {
    const team = {
      logoUrl: 'http://15.164.39.103:3000/src/assets/team.png',
      name: '담원',
      representative: '육군만기전역자',
      personnel: 3,
      recruiting: true,
      tier: 'B',
      exp: 25,
      wins: 87,
      losses: 43,
      odds: 72,
      createDate: '2020.12.17',
    };
    const team2 = {
      logoUrl: 'http://15.164.39.103:3000/src/assets/team.png',
      name: 'SKT t1',
      representative: 'coconutt01',
      personnel: 6,
      recruiting: true,
      tier: 'P',
      exp: 70,
      wins: 157,
      losses: 43,
      odds: 32,
      createDate: '2020.11.17',
    };
    this.teamInfoByRank = { totalPage: 3, teams: [team, team2, team, team, team2, team, team2, team, team2, team, team2] };
    this.teamInfoByCreationDate = { totalPage: 3, teams: [team, team, team, team, team, team, team2, team2, team2, team2, team2] };
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) 커스텀 리스너 -------- */
  onTabChange(e: Event) {
    e.stopPropagation();
    const position = (e as CustomEvent).detail.position;
    const targetName = this.tabs[position];

    if (targetName === '랭킹') return browserRouter.replace('/team/rank');
    if (targetName === '신규') return browserRouter.replace('/team/new');
  }

  /** -------------------- @category ?. 렌더링 -------------------- */
  private renderTeamCards(tab: string, id: string, teams?: TeamCard[]) {
    if (this.params!.tab === tab) return teams?.map((team, index) => lazyLoad(import('../part/card/SDTeamCard'), html` <sd-team-card data-id=${id} data-position=${index} .team=${team} />`));
  }

  private renderPagination(currentTab: string, targetTab: string, path: string, page: number, totalPage?: number) {
    if (currentTab === targetTab) {
      if (totalPage) {
        return lazyLoad(import('../part/SDPagination'), html`<sd-pagination .activePage=${page} .config=${{ path: path, totalPage: totalPage }} />`);
      }
    }
  }

  render() {
    return html`
      ${lazyLoad(import('../part/SDTab'), html`<sd-tab .active=${this.params!.tab} .tabs=${this.tabs} />`)}
      <!-- 상세 검색  -->
      <section class="section-search">
        ${lazyLoad(import('../part/SDSearchFillter'), html`<sd-search-filter .placeHolder=${`팀 검색하기`} />`)}
        <!-- TODO: 상세 검색 필터 추가하기 -->
      </section>
      <section class="section-team">
        <div class="div-table-title">
          <div></div>
          <span>로고</span>
          <span>이름</span>
          <span>대표</span>
          <span>인원</span>
          <span>팀 상태</span>
          <span>티어</span>
          <span>경험치</span>
          <span>스크림 승률</span>
          <span>생성 날짜</span>
        </div>
        <!-- 랭킹별 팀 리스트 -->
        ${this.renderTeamCards('랭킹', 'teams-rank', this.teamInfoByRank?.teams)}
        <!-- 신규 팀 리스트 -->
        ${this.renderTeamCards('신규', 'teams-new', this.teamInfoByCreationDate?.teams)}
      </section>
      <div class="div-pagination">
        <!-- 랭킹 페이지네이션 -->
        ${this.renderPagination(this.params!.tab, '랭킹', '/team/rank/page', this.params!.page, this.teamInfoByRank?.totalPage)}
        <!-- 신규 페이지네이션 -->
        ${this.renderPagination(this.params!.tab, '신규', '/team/new/page', this.params!.page, this.teamInfoByCreationDate?.totalPage)}
      </div>
    `;
  }
}
