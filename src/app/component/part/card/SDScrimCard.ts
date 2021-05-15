import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import scrimCardStyle from '../../../style/part/card/sd.scrim.card.module.css';

export type ScrimCard = {};

@customElement('sd-scrim-card')
class SDCardScrim extends LitElement {
  static styles = scrimCardStyle;

  @property({ type: Object }) scrim?: ScrimCard;

  render() {
    return html` <div>ScrimCard page</div> `;
  }
}
