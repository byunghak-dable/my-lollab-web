import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import footerStyle from '../../style/essential/sd.footer.module.css';

@customElement('sd-footer')
class SDFooter extends LitElement {
  static styles = footerStyle;

  render() {
    return html`
      <div>
        <ul class="ul-link">
          <li><router-link href="/">개인정보 처리 방침</router-link></li>
          <li><router-link href="/">서비스 이용약관</router-link></li>
          <li><router-link href="/">문의하기</router-link></li>
        </ul>
        <div class="div-company-info"><span>얼굴 연구소</span><span>대표자명 : 류 대 희</span><span>연락처 : 010-0000-0000</span></div>
        <div class="div-copyright"><span>ⓒ copyright</span></div>
      </div>
    `;
  }
}
