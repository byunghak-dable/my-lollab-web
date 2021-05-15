import { Part, TemplateResult } from 'lit';
import { Directive, DirectiveParameters } from 'lit/directive';
import { sendPendingEvent } from '../async';

export default class LazyLoadDirective extends Directive {
  resolved = new WeakSet(); // 동적 import가 완료된 node 저장

  update(part: Part, [importPromise, templateResult]: DirectiveParameters<this>) {
    if (!this.resolved.has(part)) {
      const hostElement = part.options!.host as HTMLElement;
      importPromise.then(() => this.resolved.add(part));
      sendPendingEvent(hostElement, importPromise);
    }
    return this.render(importPromise, templateResult);
  }

  render(importPromise: Promise<unknown>, templateResult: TemplateResult) {
    return templateResult;
  }
}
