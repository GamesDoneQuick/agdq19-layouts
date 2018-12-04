import {BidElement} from './gdq-break-bids';
import {TweenLite, TimelineLite, Sine, Power3, Power4} from 'gsap';
import {typeAnim} from '../../../../shared/lib/type-anims';
import {createMaybeRandomTween} from '../../../../shared/lib/maybe-random';
import {ParentBid} from '../../../../src/types/index';

const {customElement, property} = Polymer.decorators;
const SVG = ((window as any).svgjs || (window as any).SVG) as svgjs.Library;
const ROTATION_FACTOR = 0.65;

/**
 * @customElement
 * @polymer
 */
@customElement('gdq-break-bid-binary')
export default class GDQBreakBidBinaryElement extends Polymer.Element implements BidElement {
	@property({type: Object})
	bid: ParentBid;

	_svgDoc: svgjs.Doc;
	_winningSlice: svgjs.Path;

	ready() {
		super.ready();
		this._initPieChartSVG();
		TweenLite.set(this.$.winningOptionAmount, {opacity: 0, x: -36, color: 'transparent'});
		TweenLite.set(this.$.losingOptionAmount, {opacity: 0, x: 36, color: 'transparent'});
		TweenLite.set(this._svgDoc.node, {opacity: 0});
	}

	enter() {
		const tl = new TimelineLite();
		const winningPercent = this.bid.options[0].rawTotal / this.bid.rawTotal;
		const proxy = {percent: 0};
		const winningOptionNameEl = this.$.winningOptionName as HTMLDivElement;
		const losingOptionNameEl = this.$.losingOptionName as HTMLDivElement;
		const winningOptionAmountEl = this.$.winningOptionAmount as HTMLDivElement;
		const losingOptionAmountEl = this.$.losingOptionAmount as HTMLDivElement;

		tl.call(() => {
			winningOptionAmountEl.innerText = '$' + this.bid.options[0].rawTotal.toLocaleString('en-US', {
				maximumFractionDigits: 0,
				useGrouping: false
			});
			losingOptionAmountEl.innerText = '$' + this.bid.options[1].rawTotal.toLocaleString('en-US', {
				maximumFractionDigits: 0,
				useGrouping: false
			});
		}, undefined, null, '+=0.03');

		tl.to([this.$.winningOptionAmount, this.$.losingOptionAmount], 0.384, {
			opacity: 1,
			x: 0,
			ease: Sine.easeOut
		});

		tl.call(() => {
			winningOptionAmountEl.style.color = '';
			losingOptionAmountEl.style.color = '';
			typeAnim(winningOptionAmountEl);
			typeAnim(losingOptionAmountEl);
		});

		tl.add(createMaybeRandomTween({
			target: this._svgDoc.node.style,
			propName: 'opacity',
			duration: 0.465,
			ease: Power4.easeIn,
			start: {probability: 1, normalValue: 0},
			end: {probability: 0, normalValue: 1}
		}), '+=0.1');

		tl.to(proxy, 1, {
			percent: winningPercent,
			ease: Power3.easeInOut,
			onStart: () => {
				this._svgDoc.style({transform: `rotate(${ROTATION_FACTOR}turn)`});

				winningOptionNameEl.innerText = this.bid.options[0].description || this.bid.options[0].name;
				losingOptionNameEl.innerText = this.bid.options[1].description || this.bid.options[1].name;
				typeAnim(winningOptionNameEl);
				typeAnim(losingOptionNameEl);
			},
			onUpdate: () => {
				this.drawWinningSlice(proxy.percent);
			}
		});

		return tl;
	}

	exit() {
		const tl = new TimelineLite();

		tl.add(createMaybeRandomTween({
			target: this.style,
			propName: 'opacity',
			duration: 0.2,
			ease: Power4.easeIn,
			start: {probability: 1, normalValue: 1},
			end: {probability: 0, normalValue: 0}
		}));

		return tl;
	}

	_initPieChartSVG() {
		const svgDoc = SVG(this.$.chart as HTMLElement);
		svgDoc.viewbox(-1, -1, 2, 2);
		this._svgDoc = svgDoc;

		svgDoc.circle(2).fill({color: '#ffee54', opacity: 0.25}).move(-1, -1);

		const anglePI = (ROTATION_FACTOR * 360) * (Math.PI / 180);
		const gradientCoords = {
			x1: Math.round((Math.sin(anglePI) * 50) + 50) + '%',
			y1: Math.round((Math.cos(anglePI) * 50) + 50) + '%',
			x2: Math.round((Math.sin(anglePI + Math.PI) * 50) + 50) + '%',
			y2: Math.round((Math.cos(anglePI + Math.PI) * 50) + 50) + '%'
		};

		const gradient = svgDoc
			.gradient('linear', stop => {
				stop.at(0, '#57c7ef');
				stop.at(1, '#63f1fd');
			})
			.from(gradientCoords.x1 as any, gradientCoords.y1 as any)
			.to(gradientCoords.x2 as any, gradientCoords.y2 as any);

		this._winningSlice = svgDoc.path().fill(gradient);
	}

	drawWinningSlice(percent: number) {
		// Note the svg viewBox is offset so the center of the SVG is 0,0.
		const arcLength = Math.PI * 2 * percent;

		const startX = Math.cos(arcLength / -2);
		const startY = Math.sin(arcLength / -2);
		const endX = Math.cos(arcLength / 2);
		const endY = Math.sin(arcLength / 2);
		const largeArcFlag = percent > 0.5 ? 1 : 0;

		const d = [
			`M ${startX} ${startY}`,
			`A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
			'L 0 0'
		].join(' ');

		this._winningSlice.plot(d);
	}
}
