import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import { lazyLoad } from '../../../../core/component/async';
import btnStyle from '../../../style/share/btn.module.css';
import summonerCardStyle from '../../../style/part/card/sd.summoner.card.module.css';
import { getProfileIconUrl } from '../../../util/ddragon-api';
import { getPositionImg } from '../../../util/riot-svg';
import { Champion } from './SDChampionCard';

export type SummonerCard = {
  name: string;
  profileIconId: number;
  position: RiotPosition;
  tier: string;
  tierRank?: number;
  wins: number;
  losses: number;
  odds: number;
  kda: string;
  kdaAverage: number;
  champions: Champion[];
};

@customElement('sd-summoner-card')
class SDCardSummoner extends LitElement {
  static styles = [btnStyle, summonerCardStyle];

  @property({ type: Object }) summoner?: SummonerCard;
  @property({ type: Boolean }) card?: boolean;

  private setKdaColor(kdaAverage: number) {
    if (kdaAverage > 3) return '#00c0a4';
    if (kdaAverage < 2) return 'var(--red-color)';
    return 'var(--font-grey-color)';
  }

  render() {
    return html`
      <a class="a-profile" href=${`https://www.op.gg/summoner/userName=${this.summoner!.name}`} target="_blank" rel="noopener noreferrer">
        <img src=${getProfileIconUrl(this.summoner!.profileIconId)} alt="소환사 아이콘" />
        <span>${this.summoner!.name}</span>
      </a>
      <figure class="figure-position">${getPositionImg(this.summoner!.position)}</figure>
      <figure class="figure-tier">
        <img src=${require.context('../../../../assets/image/tier', true, /\.png/)(`./${this.summoner!.tier}.png`).default} alt="티어" />
        <figcaption>${this.summoner!.tier + this.summoner!.tierRank}</figcaption>
      </figure>
      ${this.card ? html`<span class="span-champion-title">선호 챔피언</span>` : null}
      <div class="div-champion">${this.summoner!.champions.map((champion) => lazyLoad(import('./SDChampionCard'), html`<sd-champion-card .champion=${champion} />`))}</div>
      ${this.card ? html`<span class="span-odds-title">승률</span>` : null}
      <div class="div-odds">
        ${this.card
          ? lazyLoad(
              import('../SDOddsCircleGraph'),
              html`
                <sd-odds-circle-graph .odds=${this.summoner!.odds} />
                <span>${this.summoner!.wins}승 ${this.summoner!.losses}패</span>
              `
            )
          : lazyLoad(import('../SDOddsLinearGraph'), html`<sd-odds-linear-graph .odds=${{ wins: this.summoner!.wins, losses: this.summoner!.losses, odds: this.summoner!.odds }} />`)}
      </div>
      ${this.card ? html`<span class="span-kda-title">KDA</span>` : null}
      <div class="div-kda">
        <span>${this.summoner!.kda}</span>
        <span style=${styleMap({ color: this.setKdaColor(this.summoner!.kdaAverage) })}>(${this.summoner!.kdaAverage})</span>
      </div>
      <slot />
    `;
  }
}
