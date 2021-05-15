import { browserRouter } from './BrowserRouter';

const template = document.createElement('template');
template.innerHTML = `
  <a style="all:inherit;position:static;padding:0;margin:0;color:inherit;background-color:rgba(0,0,0,0);border:none;box-shadow:none;">
    <slot/>
  </a>
`;

/**
 * Autonomous custom element 방식
 *
 * safari에서 customize built in element 지원을 안해서 사용 중
 * TODO: polyfill을 찾거나, safari 지원이 완료되면 TestLink.ts로 변경하기
 */
class RouterLink extends HTMLElement {
  private aTag?: HTMLAnchorElement;
  static observedAttributes = ['href'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    this.aTag = this.shadowRoot!.firstElementChild as HTMLAnchorElement;
  }

  connectedCallback() {
    if (!this.hasAttribute('href')) return;
    this.style.cursor = 'pointer';
    this.addEventListener('click', this.onLinkClick.bind(this));
    this.aTag!.addEventListener('click', (e: Event) => e.preventDefault());
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    this.aTag!.href = newValue;
  }

  private onLinkClick(e: Event) {
    if (this.hasAttribute('disabled')) return;
    const path = this.aTag!.pathname + this.aTag!.search;
    const replaceStack = this.hasAttribute('replace');
    const deduplicateStack = this.hasAttribute('deduplicate');

    if (replaceStack && deduplicateStack) return console.error('RouterLink : cannot replace and deduplicate stack at the same time');
    if (replaceStack) return browserRouter.replace(path);
    if (deduplicateStack) return location.href === this.aTag!.href ? browserRouter.replace(path) : browserRouter.navigate(path);
    browserRouter.navigate(path);
  }
}
customElements.define('router-link', RouterLink);
