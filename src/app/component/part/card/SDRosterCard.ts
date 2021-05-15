import { html, LitElement } from 'lit';
import { customElement } from '@lit/reactive-element/decorators/custom-element';
import { property } from '@lit/reactive-element/decorators/property';
import rosterStyle from '../../../style/part/card/sd.roster.card.module.css';
import topImage from '../../../../assets/image/line/TOP-WHITE.png';
import jungleImage from '../../../../assets/image/line/JGL-WHITE.png';
import midImage from '../../../../assets/image/line/MID-WHITE.png';
import botImage from '../../../../assets/image/line/BOT-WHITE.png';
import suppotImage from '../../../../assets/image/line/SPT-WHITE.png';
import { getProfileIconUrl } from '../../../util/ddragon-api';

type Position = 'TOP' | 'JG' | 'MID' | 'BOT' | 'SPT';
type Summoner = { idx: number; profileIconId: number; name: string };
export type Roster = { TOP: Summoner[]; JG: Summoner[]; MID: Summoner[]; BOT: Summoner[]; SPT: Summoner[] };

@customElement('sd-roster-card')
class SDRoster extends LitElement {
  static styles = rosterStyle;

  @property({ type: Array }) roster?: Roster;

  render() {
    const summoners = new Array(3).fill(undefined);

    return [
      { name: 'TOP', image: topImage },
      { name: 'JG', image: jungleImage },
      { name: 'MID', image: midImage },
      { name: 'BOT', image: botImage },
      { name: 'SPT', image: suppotImage },
    ].map(
      (position) => html`
        <div class="div-roster">
          <figure class="figure-position">
            <img src=${position.image} alt="포지션" />
            <figcaption>${position.name}</figcaption>
          </figure>
          <div class="div-summoner">
            ${summoners.map(
              (value, index) => html`
                <figure>
                  ${this.roster![position.name as Position][index]
                    ? html`
                        <img src=${getProfileIconUrl(this.roster![position.name as Position][index].profileIconId)} alt="소환사" />
                        <figcaption>${this.roster![position.name as Position][index].name}</figcaption>
                      `
                    : null}
                </figure>
              `
            )}
          </div>
        </div>
      `
    );
  }
}
