import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import tournamentCardStyle from '../../../style/part/card/sd.tournament.card.module.css';
import svgMap from '../../../../assets/icon/map.svg';

export type TournamentCard = {
  title: string;
  imageUrl: string;
  tags: string[];
  tierLimit: { min: string; max: string };
  participationStatus: { current: number; total: number };
};

@customElement('sd-tournament-card')
class SDCardTournament extends LitElement {
  static styles = tournamentCardStyle;

  @property({ type: Object }) tournament?: TournamentCard;

  render() {
    const participantsPercent = (this.tournament!.participationStatus.current / this.tournament!.participationStatus.total) * 100;
    return html`
      <figure class="figure-title" style=${styleMap({ backgroundImage: `url(${this.tournament!.imageUrl ? this.tournament!.imageUrl : ''})` })}>
        <div class="div-tag div-tags--state"><small>모집중</small></div>
      </figure>
      <div class="div-info div-info--base">
        <div class="div-title"><span>${this.tournament!.title}</span></div>
        <!-- TODO: 서버와 애기 후 태그들 어떤 식으로 표현할지 애기하기 -->
        <div class="div-tags">
          <div class="div-tag div-tag--type"><small>토너먼트 4강</small></div>
          <div class="div-tag"><img src=${svgMap} alt="맵" /><small>소환사 협곡</small></div>
        </div>
        <!-- TODO: 여기까지 -->
      </div>
      <div class="div-info div-info--sub">
        <div class="div-tier-limit">
          <span class="div-tier-limit__span">티어 제한</span>
          <div class="div-tier-limit__div">
            <figure>
              <img src=${require.context('../../../../assets/image/tier', true, /\.png/)(`./${this.tournament!.tierLimit.min}.png`).default} alt="최소 티어" />
              <figcaption>${this.tournament!.tierLimit.min.toUpperCase()}</figcaption>
            </figure>
            <div></div>
            <figure>
              <img src=${require.context('../../../../assets/image/tier', true, /\.png/)(`./${this.tournament!.tierLimit.max}.png`).default} alt="최대 티어" />
              <figcaption>${this.tournament!.tierLimit.max.toUpperCase()}</figcaption>
            </figure>
          </div>
        </div>
        <div class="div-participants-state">
          <span>${this.tournament!.participationStatus.total}팀 중 ${this.tournament!.participationStatus.current}팀 참여 (${participantsPercent}%) </span>
          <div
            style=${styleMap({
              background: `linear-gradient(to right, var(--primary)0% ${participantsPercent}%, var(--surface-light-line-color) ${participantsPercent}% ${100 - participantsPercent}%)`,
            })}
          ></div>
        </div>
      </div>
    `;
  }
}
``;
