import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import teamCardStyle from '../../../style/part/card/sd.team.card.module.css';
import { lazyLoad } from '../../../../core/component/async';

export type TeamCard = {
  logoUrl: string;
  name: string;
  representative: string;
  personnel: number;
  recruiting: boolean;
  tier: string;
  exp: number;
  wins: number;
  losses: number;
  odds: number;
  createDate: string;
};

@customElement('sd-team-card')
class SDCardTeam extends LitElement {
  static styles = teamCardStyle;

  @property({ type: Object }) team?: TeamCard;

  render() {
    return html`
      <span>${+this.dataset.position! + 1}</span>
      <img src=${this.team!.logoUrl} alt="팀 로고" />
      <span class="span-name">${this.team!.name}</span>
      <span class="span-representative">${this.team!.representative}</span>
      <span class="span-personnel">${this.team!.personnel}명</span>
      <span class="span-recruiting">${this.team!.recruiting ? '모집 중' : '모집 완료'}</span>
      <img src=${require.context('../../../../assets/image/tier', true, /\.png/)(`./${this.team!.tier}.png`).default} alt="티어" />
      <span class="span-exp">${this.team!.exp}XP</span>
      ${lazyLoad(import('../SDOddsLinearGraph'), html`<sd-odds-linear-graph .odds=${{ wins: this.team!.wins, losses: this.team!.losses, odds: this.team!.odds }} />`)}
      ${lazyLoad(import('../SDOddsCircleGraph'), html`<sd-odds-circle-graph .odds=${this.team!.odds} />`)}
      <span class="span-create-date">${this.team!.createDate}</span>
    `;
  }
}
