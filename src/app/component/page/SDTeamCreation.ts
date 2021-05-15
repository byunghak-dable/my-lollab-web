import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import btnStyle from '../../style/share/btn.module.css';
import defaultPageStyle from '../../style/share/default.page.module.css';
import teamCreationStyle from '../../style/page/sd.team.creation.module.css';

@customElement('sd-404')
class SDTeamCreation extends LitElement {
  static styles = [btnStyle, defaultPageStyle, teamCreationStyle];

  render() {
    return html` <span>team creation</span> `;
  }
}
