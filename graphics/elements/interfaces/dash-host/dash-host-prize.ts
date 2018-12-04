import {Prize} from '../../../../src/types';

const {customElement, property} = Polymer.decorators;

@customElement('dash-host-prize')
export default class DashHostPrizeElement extends Polymer.MutableData(Polymer.Element) {
	@property({type: Object})
	prize: Prize;
}
