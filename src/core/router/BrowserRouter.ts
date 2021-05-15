import { makeQuery } from '../query-parser';

class BrowserRouter {
  private routes = new Map();
  private regexRoutes = new Map();

  constructor() {
    const onPageChange = this.ohPageChange.bind(this);

    import('./RouterLink');
    addEventListener('DOMContentLoaded', onPageChange);
    addEventListener('popstate', onPageChange);
    addEventListener('stateChange', onPageChange);
  }

  // 라우트를 추가할 때 페이지 정규식 경로와 콜백함수를 저장
  addRoute(path: string, callback: Function) {
    if (path.includes(':')) {
      path = path.replace(new RegExp(':.[^/]+(?=\\([^/]+\\))', 'g'), '').replace(new RegExp('(:[^/]+)', 'g'), '([^/]+)');
      this.regexRoutes.set(new RegExp(`^${path}$`), callback);
      return;
    }
    this.routes.set(path, callback);
  }

  navigate(path: string, queryObj?: MutableObject, state?: object) {
    history.pushState(state, '', location.origin + path + makeQuery(queryObj));
    dispatchEvent(new Event('stateChange'));
  }

  replace(path: string, queryObj?: MutableObject, state?: object) {
    history.replaceState(state, '', location.origin + path + makeQuery(queryObj));
    dispatchEvent(new Event('stateChange'));
  }

  private ohPageChange(e: Event) {
    const path = location.pathname;

    // url에 불필요한 '/'가 붙으면 슬래쉬 제거하고 페이지 replace
    if (path !== '/' && path.endsWith('/')) return this.replace(path.replace(new RegExp('[/]*$'), ''));
    if (e.type === 'stateChange') scrollTo(0, 0); // 새로운 페이지일 떄는 스크롤 초기화

    // 파라미터가 없는 경로인 경우 체크
    if (this.routes.has(path)) {
      this.routes.get(path)();
      return;
    }
    // 파라미터가 있는 경로인 경우 체크
    for (const [regexPath, callback] of this.regexRoutes.entries()) {
      if (regexPath.test(path)) {
        const matches = path.match(regexPath)!;

        matches.shift(); // 첫 번째 요소 제거
        callback(...matches); // uri 파라미터 추가하여 콜백메소드 호출
        return;
      }
    }
    this.routes.has('*') ? this.routes.get('*')() : console.error('no 404(*) route');
  }
}
export const browserRouter = new BrowserRouter();
