import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import checkboxStyle from '../../style/part/sd.checkbox.module.css';

@customElement('sd-checkbox')
class SDCheckbox extends LitElement {
  static styles = checkboxStyle;

  render() {
    return html`
      <svg width="12px" height="9px" viewbox="0 0 12 9">
        <polyline points="1 5 4 8 11 1"></polyline>
      </svg>
    `;
  }
}
