import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import { styleMap } from 'lit/directives/style-map';
import championCardStyle from '../../../style/part/card/sd.champion.card.module.css';
import { getChampionIconUrl } from '../../../util/ddragon-api';

export type Champion = { nameEng: string; nameKor: string; odds: number; kda: string; kdaAverage: number; cs: number; csPerMinute: number };

@customElement('sd-champion-card')
class SDChampionCard extends LitElement {
  static styles = championCardStyle;

  @property({ type: Object }) champion?: Champion;

  private setStatisticFiguresColor(max: number, min: number, statisticFigure: number) {
    if (statisticFigure > max) return '#00c0a4';
    if (statisticFigure < min) return 'var(--red-color)';
  }

  render() {
    return html`
      <img src=${getChampionIconUrl(this.champion!.nameEng)} alt="챔피언" />
      <span class="span-odds">${this.champion!.odds}%</span>
      <ul class="ul-detail">
        <li>${this.champion!.nameKor}</li>
        <li class="li-section">
          <span>승률</span>
          <span>${this.champion!.odds}%</span>
        </li>
        <li class="li-section">
          <span>KDA</span>
          <span>${this.champion!.kda}</span>
          <span style=${styleMap({ color: this.setStatisticFiguresColor(3, 2, this.champion!.kdaAverage) })}>(${this.champion!.kdaAverage})</span>
        </li>
        <li class="li-section">
          <span>CS</span>
          <span>${this.champion!.cs}</span>
          <span style=${styleMap({ color: this.setStatisticFiguresColor(8, 5, this.champion!.csPerMinute) })}>(${this.champion!.csPerMinute})</span>
        </li>
      </ul>
    `;
  }
}
