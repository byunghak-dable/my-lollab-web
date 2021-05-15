import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import page404Style from '../../style/part/sd.tab.module.css';

@customElement('sd-tab')
class SDTab extends LitElement {
  static styles = page404Style;

  @property({ type: String }) active?: string;
  @property({ type: Array }) tabs?: string[];

  private onTabClick(e: Event) {
    const spanTab = e.currentTarget as HTMLSpanElement;
    const activePosition = spanTab.dataset.position;

    if (this.tabs![+activePosition!] === this.active) return;
    this.dispatchEvent(
      new CustomEvent('SDTab:ActiveTab', {
        detail: { position: activePosition },
        bubbles: true,
        composed: true,
        cancelable: true,
      })
    );
  }

  render() {
    return html`${this.tabs!.map((tab, index) => html` <span data-position=${index} class=${this.active == tab ? 'active' : ''} @click=${this.onTabClick}>${tab}</span> `)} `;
  }
}
