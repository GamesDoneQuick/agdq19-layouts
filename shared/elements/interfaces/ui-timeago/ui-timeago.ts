import moment from 'moment';

const {customElement, property} = Polymer.decorators;

moment.updateLocale('en', {
	relativeTime: {
		future: 'in %s',
		past: '%s',
		s: 'just now',
		ss: '%ds',
		m: '1m',
		mm: '%dm',
		h: '1h',
		hh: '%dh',
		d: '1d',
		dd: '%dd',
		M: '1mo',
		MM: '%dmo',
		y: '1y',
		yy: '%dy'
	}
});

@customElement('ui-timeago')
export default class UiTimeagoElement extends Polymer.Element {
	@property({type: String, notify: true})
	timeago = '';

	@property({type: String, observer: UiTimeagoElement.prototype._datetimeChanged})
	datetime = '0000-00-00T00:00:00.000Z';

	private interval?: number;

	ready() {
		super.ready();
		this.restartInterval();
	}

	restartInterval() {
		this.recalculate();
		clearInterval(this.interval);
		this.interval = window.setInterval(this.recalculate.bind(this), 60000);
	}

	recalculate() {
		// TODO: This is the only thing in this entire codebase that uses Moment. Can we eliminate this dependency?
		this.timeago = moment(new Date(this.datetime)).fromNow();
	}

	_datetimeChanged() {
		this.restartInterval();
	}
}
