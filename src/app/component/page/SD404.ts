import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import page404Style from '../../style/page/sd.404.module.css';

@customElement('sd-404')
class SD404 extends LitElement {
  static styles = page404Style;

  render() {
    return html` <span>404 page</span> `;
  }
}
