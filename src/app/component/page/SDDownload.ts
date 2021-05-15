import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import btnStyle from '../../style/share/btn.module.css';
import defaultPageStyle from '../../style/share/default.page.module.css';
import downloadStyle from '../../style/page/sd.download.module.css';
import imgLogo from '../../../assets/image/logo/logo.png';
import videoBackground from '../../../assets/video/background-lol.mp4';
import imgLolLogo from '../../../assets/image/logo/lol-logo.png';
import svgWindow from '../../../assets/icon/window--white.svg';
import imgProgramAnalyze from '../../../assets/image/banner/program-util.png';
import imgProgramUtil from '../../../assets/image/banner/program-custom-game.png';

@customElement('sd-download')
class SDDownload extends LitElement {
  static styles = [btnStyle, defaultPageStyle, downloadStyle];

  /** -------------------- @category ?. 랜더링 -------------------- */
  private renderDownloadBtn(svgColor: string) {
    return html`
      <router-link href="/">
        <span>지금 다운로드</span>
        <svg aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
          <path d="M10.707 17.707L16.414 12l-5.707-5.707l-1.414 1.414L13.586 12l-4.293 4.293z" fill=${svgColor} />
          <rect x="0" y="0" width="24" height="24" fill="rgba(0, 0, 0, 0)" />
        </svg>
      </router-link>
    `;
  }

  render() {
    return html`
      <section class="section-intro">
        <video src=${videoBackground} autoplay loop muted></video>
        <article>
          <h1 class="h1-logo">
            <img src=${imgLogo} alt="로고" />
          </h1>
          <p class="p-intro">팀을 위한 리그 오브 레전드 코치가 여기있습니다</p>
          <figure class="figure-lol-logo">
            <div></div>
            <img src=${imgLolLogo} alt="롤 로고" />
            <div></div>
          </figure>
          <div class="btn-container">
            <button>
              <img src=${svgWindow} alt="윈도우" />
              <span>윈도우 버전 다운로드</span>
            </button>
          </div>
          <p class="p-intro-detail">매치된 대회<strong>·</strong>스크림을 하기 위한 게임을 55L 프로그램이 쉽게 만들어주고, 게임이 종료되면 결과를 분석을 도와줍니다</p>
        </article>
      </section>
      <section class="section-banner">
        <article class="article-contents article-contents--analyze">
          <div>
            <h2>대회<strong>·</strong>스크림 분석</h2>
            <p>데이터 수집에 동의한 스크림<strong>·</strong>대회 게임 결과를 분석할 수 있어요 분석한 게임 데이터를 통해 피드백을 해보세요</p>
            ${this.renderDownloadBtn('var(--on-primary)')}
          </div>
          <figure>
            <img src=${imgProgramAnalyze} alt="경기 분석" />
          </figure>
        </article>
        <article class="article-contents article-contnets--util">
          <figure><img src=${imgProgramUtil} alt="프로그램 유틸리티" /></figure>
          <div>
            <h2>유틸리티 제공</h2>
            <p>매치된 스크림 대회를 즐기기 위한 방 만들기, 소환사 초대하기를 클릭 한번으로 모두 해결</p>
            ${this.renderDownloadBtn('')}
          </div>
        </article>
      </section>
    `;
  }
}
