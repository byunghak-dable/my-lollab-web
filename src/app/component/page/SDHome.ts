import { html, LitElement } from 'lit'
import { customElement } from '@lit/reactive-element/decorators/custom-element'
import { styleMap } from 'lit/directives/style-map'
import WindowResizeController from '../../controller/WindowResizeController'
import btnStyle from '../../style/share/btn.module.css'
import defaultPageStyle from '../../style/share/default.page.module.css'
import homeStyle from '../../style/page/sd.home.module.css'
import videoBanner from '../../../assets/video/repeat-gaming.mp4'
import svgTrophy from '../../../assets/icon/trophy.svg'
import imgSynthesis from '../../../assets/image/banner/synthesis.png'
import imgScrim from '../../../assets/image/banner/contents-scrim.png'
import imgTeam from '../../../assets/image/banner/contents-team.png'
import imgChampion from '../../../assets/image/banner/champion.png'

@customElement('sd-home')
class SDHome extends LitElement {
  static styles = [btnStyle, defaultPageStyle, homeStyle]

  constructor() {
    super()
    new WindowResizeController(this)
  }

  render() {
    return html`
      <section class="section-banner">
        <div class="div-banner-video">
          <video style=${styleMap({ marginLeft: innerWidth > 1550 ? '0px' : `${(innerWidth - outerWidth) / 2}px` })} autoplay loop muted>
            <source src=${videoBanner} type="video/webm" />
          </video>
        </div>
        <article class="article-banner">
          <div class="div-banner-title">
            <h1>
              <!-- 서비스 명 변경하기 -->
              <span>GET PAID TO PLAY</span>
            </h1>
          </div>
          <div class="div-banner-detail">
            <p align="center">Compete in Free and Paid entry Tournaments in just a few clicks without any additional downloads</p>
          </div>
          <div class="btn-container btn-container--banner">
            <button>
              <img src=${svgTrophy} alt="트로피" />
              <div>
                <span class="span-noti">Start playing Now!</span>
                <span class="span-signup">Create Account</span>
              </div>
            </button>
          </div>
        </article>
      </section>
      <section class="section-introduction">
        <!-- 종합 콘텐츠  -->
        <!-- <article class="article-contents">
          <div class="div-contents-title">
            <h2>Available Contents</h2>
            <p>We are constantly adding new games</p>
          </div>
          <div class="div-contents-contents">
            <a>
              <div class="E836D98A406A-repeatApp-129">
                <span data-ignore="true">Fortnite</span>
                <span class="E836D98A406A-repeatApp-130">218 Tournaments</span>
              </div>
            </a>
          </div>
          <div class="div-contents-text"></div>
        </article> -->
        <!-- 종합 -->
        <article class="article-synthesis">
          <!-- <figure class="figure-synthesis-background">
            <img  />
          </figure> -->
          <div class="div-synthesis-main">
            <figure>
              <img src=${imgSynthesis} alt="콘텐츠 종합" />
            </figure>
            <div class="div-synthesis-detail">
              <h2>Play Unlimited<br />Tournaments</h2>
              <p>On Repeat you can play in an unlimited number of tournaments, any time, for any game. The best thing is that your scores will count in every single active tournament you enter.</p>
              <div class="btn-container btn-container--contents"><button>JOIN US</button></div>
            </div>
          </div>
        </article>
        <!-- 스크림 / 대회 -->
        <article class="article-contents article-contents--scrim">
          <figure class="figure-contents figure-contents--scrim">
            <img src=${imgScrim} alt="스크림" />
          </figure>
          <div class="div-contents-detail div-contents-detail--scrim">
            <h2>Climb to the top of the leaderboard</h2>
            <p>
              In our tournaments everyone has a chance to shine. Play as many games as you want and we will only track your best scores meaning that you can never have a worse score than the current
              one.
            </p>
            <div class="btn-container btn-container--contents"><button>JOIN US</button></div>
          </div>
        </article>
        <!-- 팀원 모집 / 팀 전적 -->
        <article class="article-contents article-contents--team">
          <div class="div-contents-detail div-contents-detail--team">
            <h2>Climb to the top of the leaderboard</h2>
            <p>
              In our tournaments everyone has a chance to shine. Play as many games as you want and we will only track your best scores meaning that you can never have a worse score than the current
              one.
            </p>
            <div class="btn-container btn-container--contents"><button>JOIN US</button></div>
          </div>
          <figure class="figure-contents figure-contents--team">
            <img src=${imgTeam} alt="팀" />
          </figure>
        </article>
        <!-- Just Join -->
        <article class="article-join">
          <div class="div-join-background">
            <figure class="figure-contents figure-contents--join">
              <img src=${imgChampion} alt="챔피온-레오나" />
            </figure>
            <div class="div-contents-detail div-contents-detail--join">
              <h2>Stop Scrolling, Start Playing</h2>
              <p>Create your account now and earn 500 coins</p>
              <div class="btn-container btn-container--contents"><button>JOIN US</button></div>
            </div>
          </div>
        </article>
      </section>
    `
  }
}
