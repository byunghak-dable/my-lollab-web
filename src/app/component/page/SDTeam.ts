import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import btnStyle from '../../style/share/btn.module.css';
import defaultPageStyle from '../../style/share/default.page.module.css';
import teamStyle from '../../style/page/sd.team.module.css';
import { DependencyRequester } from '../../../core/component/di';
import { lazyLoad } from '../../../core/component/async';
import { Roster } from '../part/card/SDRosterCard';
import topImage from '../../../assets/image/line/TOP.png';
import jungleImage from '../../../assets/image/line/JGL.png';
import midImage from '../../../assets/image/line/MID.png';
import botImage from '../../../assets/image/line/BOT.png';
import suppotImage from '../../../assets/image/line/SPT.png';
import AccountModel from '../../model/AccountModel';

export type TeamParams = { teamIdx: number };
type Team = {
  logo: string;
  name: string;
  intro: string;
  tierImg: string;
  tier: string;
  lp: number;
  wins: number;
  losses: number;
  odds: number;
};

@customElement('sd-team')
class SDTeam extends DependencyRequester(LitElement) {
  static styles = [btnStyle, defaultPageStyle, teamStyle];

  private tabs = ['로스터', '스크림 전적'];

  @property({ type: Object }) params?: TeamParams;
  @property({ type: Object }) team?: Team;
  @property({ type: String }) activeTab: string = this.tabs[0];
  @property({ type: Object }) roster?: Roster;

  constructor() {
    super();
    this.addEventListener('SDTab:ActiveTab', this.onTabChange.bind(this));
  }

  /** @override */
  firstUpdated() {
    this.team = {
      logo: 'http://15.164.39.103:3000/src/assets/team.png',
      name: '담원 기아',
      intro: '[가입안내]※필수자격 : 18세이상 / 성별무관＊ 브론즈는 안되요!!',
      tierImg: 'GM',
      tier: 'GrandMaster',
      lp: 33,
      wins: 24,
      losses: 34,
      odds: Math.round((24 * 100) / (24 + 34)),
    };
    const TOP = { idx: 1, profileIconId: 3, name: 'coconutt01' };
    const JG = { idx: 1, profileIconId: 25, name: '해군용사' };
    const MID = { idx: 1, profileIconId: 5, name: '육군만기제대' };
    const BOT = { idx: 1, profileIconId: 7, name: 'hide on bush' };
    const SPT = { idx: 1, profileIconId: 13, name: '뀨오리' };
    this.roster = { TOP: [TOP, TOP], JG: [JG, MID], MID: [BOT, MID], BOT: [BOT], SPT: [SPT, SPT] };
  }

  /** -------------------- @category 1. 리스너 -------------------- */
  /** -------- @category (1) 커스텀 리스너 -------- */
  private onTabChange(e: Event) {
    e.stopPropagation();
    const position = (e as CustomEvent).detail.position;
    this.activeTab = this.tabs[position];
  }

  render() {
    return this.team
      ? html`
          <section class="section-team-base">
            <article class="article-team-info btn-container">
              <img src=${this.team.logo} alt="팀 로고" />
              <div>
                <h2>${this.team.name}</h2>
                ${AccountModel.account && this.params!.teamIdx === AccountModel.account!.teamIdx ? html`<button>가입 신청</button>` : null}
              </div>
              <small>2008.01.09</small>
              <p>${this.team.intro}</p>
            </article>
          </section>
          ${lazyLoad(import('../part/SDTab'), html`<sd-tab .active=${this.activeTab} .tabs=${this.tabs} />`)}
          <section class="section-roster" style=${styleMap({ display: this.activeTab === this.tabs[0] ? 'block' : 'none' })}>
            ${['챔피언스', '챌리전스'].map(
              (lastName) => html`
                <article class="article-roster">
                  <h3>${`${this.team?.name} ${lastName}`}</h3>
                  ${lazyLoad(import('../part/card/SDRosterCard'), html`<sd-roster-card .roster=${this.roster} />`)}
                </article>
              `
            )}
          </section>
          <section class="section-scrim-record" style=${styleMap({ display: this.activeTab === this.tabs[1] ? 'grid' : 'none' })}>
            <article class="article-team-tier">
              <img src=${require.context('../../../assets/image/tier', true, /\.png/)(`./${this.team.tierImg}.png`).default} alt="티어" />
              <div class="div-text">
                <h4>55L 팀 랭크</h4>
                <span>${this.team.tier}</span>
                <small>${this.team.lp}LP</small>
              </div>
            </article>
            <article class="article-team-odds">
              ${lazyLoad(import('../part/SDOddsCircleGraph'), html`<sd-odds-circle-graph .odds=${this.team?.odds} />`)}
              <div class="div-text">
                <h4>스크림 승률</h4>
                <span>${this.team.wins + this.team.losses}전 ${this.team.wins}승 ${this.team.losses}패</span>
              </div>
            </article>
            <article class="article-team-member">
              <div class="div-text"><h4>라인별 선호 챔피언</h4></div>
              <div class="div-prefered-champion">
                <img src=${topImage} alt="라인 이미지" />
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
              </div>
              <div class="div-prefered-champion">
                <img src=${jungleImage} alt="라인 이미지" />
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
              </div>
              <div class="div-prefered-champion">
                <img src=${midImage} alt="라인 이미지" />
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
              </div>
              <div class="div-prefered-champion">
                <img src=${botImage} alt="라인 이미지" />
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
              </div>
              <div class="div-prefered-champion">
                <img src=${suppotImage} alt="라인 이미지" />
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
                ${lazyLoad(import('../part/card/SDChampionCard'), html`<sd-champion-card .champion=${{ name: 'Aatrox', odds: 56 }} />`)}
              </div>
            </article>
            <article class="article-record">
              ${lazyLoad(import('../part/card/SDTeamRecordCard'), html`<sd-team-record-card />`)} ${lazyLoad(import('../part/card/SDTeamRecordCard'), html`<sd-team-record-card />`)}
              ${lazyLoad(import('../part/card/SDTeamRecordCard'), html`<sd-team-record-card />`)} ${lazyLoad(import('../part/card/SDTeamRecordCard'), html`<sd-team-record-card />`)}
            </article>
          </section>
        `
      : null;
  }
}
