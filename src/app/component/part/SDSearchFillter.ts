import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import btnStyle from '../../style/share/btn.module.css';
import searchFilterStyle from '../../style/part/sd.search.filter.module.css';
import svgSearch from '../../../assets/icon/search.svg';
import svgFilter from '../../../assets/icon/filter-white.svg';

@customElement('sd-search-filter')
class SDSearchFilter extends LitElement {
  static styles = [btnStyle, searchFilterStyle];

  @property({ type: String }) placeHolder?: string;

  render() {
    return html`
      <form class="form-search">
        <img src=${svgSearch} alt="검색" />
        <input type="text" placeholder=${this.placeHolder!} />
      </form>
      <div class="btn-container">
        <button>
          <img src=${svgFilter} alt="필터" />
          <span>필터</span>
        </button>
      </div>
    `;
  }
}
