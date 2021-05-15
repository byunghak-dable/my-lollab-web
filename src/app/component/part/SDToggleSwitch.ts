import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import toggleSwitchStyle from '../../style/part/sd.toggle.switch.module.css';

@customElement('sd-toggle-switch')
class SDToggleSwitch extends LitElement {
  static styles = toggleSwitchStyle;

  render() {
    return html` <span></span> `;
  }
}
