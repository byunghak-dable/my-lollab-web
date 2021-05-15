import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import paginationStyle from '../../style/part/sd.pagination.module.css';

@customElement('sd-pagination')
class SDPagination extends LitElement {
  static styles = paginationStyle;

  @property({ type: Object }) config?: { path: string; totalPage: number };
  @property({ type: Number }) activePage?: number;

  renderPages() {
    const pages = [];
    for (let page = 1; page < this.config!.totalPage + 1; page++) {
      pages.push(html`<router-link href="/">${page}</router-link>`);
    }
  }

  render() {
    const pages = new Array(this.config!.totalPage).fill(undefined);

    return pages.map((value, index) => {
      const page = index + 1;
      const href = `${this.config!.path}/${page}`;
      return html`<router-link ?active=${page === this.activePage!} href=${href}>${page}</router-link> `;
    });
  }
}
