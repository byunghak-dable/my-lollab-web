import { LitElement } from 'lit';

export const DependencyProvider = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends Base {
    private instances = new Map();

    constructor(...args: any[]) {
      super();
      this.addEventListener('request-instance', (e: Event) => {
        const detail = (e as CustomEvent).detail;
        const key = detail.key;
        if (this.instances.has(key)) {
          detail.instance = this.instances.get(key);
          e.stopPropagation();
        }
      });
    }
    protected _provideInstance<T>(key: string, instance: T) {
      this.instances.set(key, instance);
    }
  }
  return Mixin;
};

export const DependencyRequester = <TBase extends Constructor<LitElement>>(Base: TBase) => {
  class Mixin extends Base {
    protected _requestInstance<T>(key: string) {
      const detail: { key: string; instance?: T } = { key };
      const event = new CustomEvent('request-instance', {
        detail: detail,
        bubbles: true,
        composed: true,
        cancelable: true,
      });
      this.dispatchEvent(event);
      return event.detail.instance;
    }
  }
  return Mixin;
};
