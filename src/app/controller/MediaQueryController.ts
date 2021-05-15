import { LitElement, ReactiveController } from 'lit';

export default class MediaQueryController implements ReactiveController {
  private host?: LitElement;
  private mediaQueryList?: MediaQueryList;
  private onBoundMediaChange = this.onMediaChange.bind(this);

  constructor(host: LitElement, mediaQueryString: string) {
    (this.host = host).addController(this);
    this.mediaQueryList = matchMedia(mediaQueryString);
  }

  hostConnected() {
    this.mediaQueryList!.addEventListener('change', this.onBoundMediaChange);
  }

  hostDisconnected() {
    this.mediaQueryList!.removeEventListener('change', this.onBoundMediaChange);
  }

  private onMediaChange(e: Event) {
    this.host!.requestUpdate();
  }
}
