import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import btnStyle from '../../../style/share/btn.module.css';
import signupCompleted from '../../../style/part/fragment/sd.signup.completed.module.css';

@customElement('sd-signup-complete')
class SDSignupComplete extends LitElement {
  static styles = [btnStyle, signupCompleted];

  render() {
    return html`
      <router-link href="/" class="btn-container">
        <button>메인으로 가기</button>
      </router-link>
    `;
  }
}
