import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { styleMap } from 'lit/directives/style-map';
import teamRecordStyle from '../../../style/part/card/sd.team.record.card.module.css';

@customElement('sd-team-record-card')
class SDTeamRecordCard extends LitElement {
  static styles = teamRecordStyle;

  render() {
    return html`
      <div class="div-record">
        <div class="div-result-flag" style=${styleMap({ backgroundColor: 'var(--blue-color)' })}></div>
        <div class="div-date"><span>1시간 전</span></div>
        <div class="div-map">
          <span>소환사 협곡</span>
          <small>5 vs 5</small>
        </div>
        <div class="div-result"><span style=${styleMap({ color: 'var(--blue-color)' })}>승리</span></div>
        <div class="div-table">
          <figure>
            <img src="http://15.164.39.103:3000/src/assets/team.png" alt="팀 로고" />
            <figcaption>담원 기아</figcaption>
          </figure>
          <span>VS</span>
          <figure>
            <img src="http://15.164.39.103:3000/src/assets/team.png" alt="팀 로고" />
            <figcaption>SKT T1</figcaption>
          </figure>
        </div>
        <div class="div-point"><span style=${styleMap({ color: 'var(--blue-color)' })}>+25LP</span></div>
        <div class="div-expand-btn">
          <svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
            <path d="M7.71 9.29l3.88 3.88l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.29 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z" fill="white" />
            <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
          </svg>
        </div>
      </div>
    `;
  }
}
