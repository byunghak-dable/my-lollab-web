import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { lazyLoad } from '../../../core/component/async';
import defaultPageStyle from '../../style/share/default.page.module.css';
import matchesStyle from '../../style/page/sd.matches.module.css';
import { TournamentCard } from '../part/card/SDTournamentCard';
import { browserRouter } from '../../../core/router/BrowserRouter';
import { ScrimCard } from '../part/card/SDScrimCard';

export type MatchParams = { tab: string; page: number };

@customElement('sd-matches')
class SDMatch extends LitElement {
  static styles = [defaultPageStyle, matchesStyle];

  private tabs = ['대회', '스크림'];

  @property({ type: Object }) params?: MatchParams;
  @property({ type: Object }) tournamentInfo?: { totalPage: number; tournaments: TournamentCard[] };
  @property({ type: Object }) scrimInfo?: { totalPage: number; scrims: ScrimCard[] };

  constructor() {
    super();
    this.test();
    this.addEventListener('SDTab:ActiveTab', this.onTabChange.bind(this));
  }

  private test() {
    const tournament = {
      title: '아마추어 ACK 리그 대회',
      imageUrl: 'https://i.imgur.com/rrMvsyB.png',
      tags: ['sd'],
      tierLimit: { min: 'B', max: 'P' },
      participationStatus: { current: 3, total: 8 },
    };
    const srcim = {};
    this.tournamentInfo = { totalPage: 3, tournaments: [tournament, tournament, tournament, tournament, tournament, tournament, tournament, tournament, tournament, tournament, tournament] };
    this.scrimInfo = { totalPage: 5, scrims: [srcim, srcim, srcim, srcim, srcim, srcim, srcim, srcim, srcim, srcim, srcim] };
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  // -------- (1) 커스텀 리스너 --------
  private onTabChange(e: Event) {
    e.stopPropagation();
    const position = (e as MutableObject).detail.position;
    const targetName = this.tabs[position];

    if (targetName === '스크림') return browserRouter.replace('/match/scrim');
    if (targetName === '대회') return browserRouter.replace('/match/tournament');
  }

  /** -------------------- @category ?. 랜더링 -------------------- */
  private renderPagination(currentTab: string, tab: string, path: string, page: number, totalPage?: number) {
    if (currentTab === tab) {
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
        ${lazyLoad(import('../part/SDSearchFillter'), html`<sd-search-filter .placeHolder=${`${this.params!.tab} 검색`} />`)}
        <!-- TODO: 상세 검색 필터 추가하기 -->
      </section>
      <!-- 대회 리스트 -->
      <section class="section-match">
        ${this.params!.tab === '대회'
          ? this.tournamentInfo?.tournaments.map((tournament, index) =>
              lazyLoad(import('../part/card/SDTournamentCard'), html`<sd-tournament-card class="sd-card-tournament" data-position=${index} .tournament=${tournament} />`)
            )
          : null}
        ${this.params!.tab === '스크림'
          ? this.scrimInfo?.scrims.map((scrim, index) => lazyLoad(import('../part/card/SDScrimCard'), html`<sd-scrim-card class="sd-card-scrim" data-position=${index} .scrim=${scrim} />`))
          : null}
      </section>
      <div class="div-pagination">
        <!-- 대회 페이지 -->
        ${this.renderPagination(this.params!.tab, '대회', '/match/tournament/page', this.params!.page, this.tournamentInfo?.totalPage)}
        <!-- 스크림 페이지 -->
        ${this.renderPagination(this.params!.tab, '스크림', '/match/scrim/page', this.params!.page, this.scrimInfo?.totalPage)}
      </div>
    `;
  }
}
