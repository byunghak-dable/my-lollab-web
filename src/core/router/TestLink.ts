import { browserRouter } from './BrowserRouter';

/**
 * customize built in element 방식
 * safari에서 적용을 안해 사용 중지 => 제대로된 polyfill이 나오거나 safari 지원이 되면 사용하기
 *
 * ※ TODO: 변경 사항
 *
 * (1) 파일명 변경
 *   TestLink.ts => RouterLink.ts
 * (2) 태그 선언 방법
 *   <router-link></router-link> => <a is=router-link></a> 로 선언
 * (3) css 변경 사항
 *   router-link => a[is="router-link"]로 변경
 * */
class RouterLink extends HTMLAnchorElement {
  connectedCallback() {
    if (this.href) this.addEventListener('click', this.onLinkClick);
  }

  private onLinkClick(e: Event) {
    e.preventDefault();
    if (this.hasAttribute('disabled')) return;
    const aTag = e.currentTarget as HTMLAnchorElement;
    const path = aTag.pathname + aTag.search;
    const replaceStack = this.hasAttribute('replace');
    const deduplicateStack = this.hasAttribute('deduplicate');

    if (replaceStack && deduplicateStack) return console.error('RouterLink : cannot replace and deduplicate stack at the same time');
    if (replaceStack) return browserRouter.replace(path);
    if (deduplicateStack) return location.href === aTag.href ? browserRouter.replace(path) : browserRouter.navigate(path);
    browserRouter.navigate(path);
  }
}
customElements.define('router-link', RouterLink, { extends: 'a' });
