import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import gameRecordStyle from '../../../style/part/card/sd.game.record.card.module.css';

@customElement('sd-game-record-card')
class SDGameRecord extends LitElement {
  static styles = gameRecordStyle;

  render() {
    return html``;
  }
}
