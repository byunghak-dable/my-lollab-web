import { html, LitElement } from 'lit';
import { property } from '@lit/reactive-element/decorators/property';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import graphStyle from '../../style/part/sd.odds.linear.graph.module.css';

export type OddsGraph = { wins: number; losses: number; odds: number };

@customElement('sd-odds-linear-graph')
class SDGraphOdds extends LitElement {
  static styles = graphStyle;

  @property({ type: Object }) odds?: OddsGraph;

  render() {
    return html`
      <style>
        :host {
          background: linear-gradient(to right, var(--blue-color) 0% ${this.odds!.odds}%, var(--red-color) ${this.odds!.odds}% ${100 - this.odds!.odds}%);
        }
      </style>
      <small>${this.odds!.wins} 승</small>
      <span class="span-odds">${this.odds!.odds}%</span>
      <small>${this.odds!.losses} 패</small>
    `;
  }
}
