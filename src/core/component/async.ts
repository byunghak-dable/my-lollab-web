import { LitElement } from 'lit';
import { property } from '@lit/reactive-element/decorators/property';
import { directive } from 'lit/directive';
import LazyLoadDirective from './directive/LazyLoadDirective';

export const lazyLoad = directive(LazyLoadDirective);

export const sendPendingEvent = (element: HTMLElement, promise: Promise<any>) => {
  element.dispatchEvent(
    new CustomEvent('Pending:State', {
      detail: { promise: promise },
      composed: true,
      bubbles: true,
      cancelable: true,
    })
  );
};

export const PendingContainer = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends Base {
    @property({ type: Boolean }) _hasPendingChildren = false;

    constructor(...args: any[]) {
      super();
      let pendingCount = 0;
      this.addEventListener('Pending:State', async (e: Event) => {
        e.stopPropagation();
        pendingCount++;
        this._hasPendingChildren = true;
        await (e as CustomEvent).detail.promise;
        pendingCount--;
        this._hasPendingChildren = pendingCount !== 0;
      });
    }
  }
  return Mixin;
};
