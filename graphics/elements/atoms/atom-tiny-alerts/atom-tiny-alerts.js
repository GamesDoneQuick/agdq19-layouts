import * as tslib_1 from "tslib";
import { TimelineLite, Power1 } from 'gsap';
import Random from '../../../../shared/lib/vendor/random';
const { customElement } = Polymer.decorators;
/**
 * @customElement
 * @polymer
 */
let AtomTinyAlertsElement = class AtomTinyAlertsElement extends Polymer.Element {
    addAlert({ text, textColor = 'black', backgroundColor = 'white', holdDuration = 0.067 }) {
        const div = document.createElement('div');
        div.classList.add('alert');
        div.innerText = text;
        div.style.color = textColor;
        div.style.backgroundColor = backgroundColor;
        this.shadowRoot.appendChild(div);
        div.style.left = `${randomInt(0, this.clientWidth - div.clientWidth)}px`;
        div.style.bottom = `${randomInt(2, 8)}px`;
        const tl = new TimelineLite();
        tl.to(div, 0.1834, {
            clipPath: 'inset(0 0%)',
            ease: Power1.easeIn
        });
        tl.addLabel('exit', holdDuration);
        tl.to(div, 0.934, {
            y: -21,
            ease: Power1.easeIn
        }, 'exit');
        tl.to(div, 0.5167, {
            opacity: 0,
            ease: Power1.easeIn
        }, 'exit+=0.4167');
        tl.call(() => {
            div.remove();
        });
        return tl;
    }
};
AtomTinyAlertsElement = tslib_1.__decorate([
    customElement('atom-tiny-alerts')
], AtomTinyAlertsElement);
export default AtomTinyAlertsElement;
/**
 * Generates a random integer.
 * @param min - The minimum number, inclusive.
 * @param max - The maximmum number, inclusive.
 * @returns - A random number between min and max, inclusive.
 */
function randomInt(min, max) {
    return Random.integer(min, max)(Random.engines.browserCrypto);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRvbS10aW55LWFsZXJ0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0b20tdGlueS1hbGVydHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxZQUFZLEVBQUUsTUFBTSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzFDLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBUzFELE1BQU0sRUFBQyxhQUFhLEVBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO0FBRTNDOzs7R0FHRztBQUVILElBQXFCLHFCQUFxQixHQUExQyxNQUFxQixxQkFBc0IsU0FBUSxPQUFPLENBQUMsT0FBTztJQUNqRSxRQUFRLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxHQUFHLE9BQU8sRUFBRSxlQUFlLEdBQUcsT0FBTyxFQUFFLFlBQVksR0FBRyxLQUFLLEVBQVE7UUFDM0YsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7UUFDNUIsR0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBRTVDLElBQUksQ0FBQyxVQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3pFLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRTFDLE1BQU0sRUFBRSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO1lBQ2xCLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTTtTQUNuQixDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNsQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7WUFDakIsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsTUFBTTtTQUNuQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ1gsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxDQUFDO1lBQ1YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1NBQ25CLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFbkIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztDQUNELENBQUE7QUFuQ29CLHFCQUFxQjtJQUR6QyxhQUFhLENBQUMsa0JBQWtCLENBQUM7R0FDYixxQkFBcUIsQ0FtQ3pDO2VBbkNvQixxQkFBcUI7QUFxQzFDOzs7OztHQUtHO0FBQ0gsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLEdBQVc7SUFDMUMsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9ELENBQUMifQ==