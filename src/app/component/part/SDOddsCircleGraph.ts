import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import graphStyle from '../../style/part/sd.odds.circle.graph.module.css';

@customElement('sd-odds-circle-graph')
class SDOddsCircleGraph extends LitElement {
  static styles = graphStyle;

  @property({ type: Object }) odds?: number;
  render() {
    return html`
      <style>
        :host {
          background: conic-gradient(var(--red-color) 0% ${100 - this.odds!}%, var(--blue-color) ${100 - this.odds!}% ${this.odds!}%);
        }
      </style>
      <div><span>${this.odds}%</span></div>
    `;
  }
}
