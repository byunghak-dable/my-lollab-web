import { LitElement } from 'lit';
import { ReactiveController } from '@lit/reactive-element';

export default class WindowResizeController implements ReactiveController {
  private host?: LitElement;
  private onBoundWindowResize = this.onWindowResize.bind(this);

  constructor(host: LitElement) {
    (this.host = host).addController(this);
  }

  hostConnected() {
    addEventListener('resize', this.onBoundWindowResize);
  }

  hostDisconnected() {
    removeEventListener('resize', this.onBoundWindowResize);
  }

  private onWindowResize(e: Event) {
    this.host!.requestUpdate();
  }
}
