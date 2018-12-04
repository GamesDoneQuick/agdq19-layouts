/* eslint-disable new-cap */
'use strict';

const io = require('socket.io')(22341);
let totalInCents = 0;

generateAndEmitDonation();

function generateAndEmitDonation() {
	const rawAmountInCents = randomInt(100, 60000);
	totalInCents += rawAmountInCents;

	const data = {
		rawAmount: String(rawAmountInCents / 100),
		newTotal: String(totalInCents / 100)
	};

	io.emit('donation', data);
	console.log('Emitted donation:', data);

	setTimeout(generateAndEmitDonation, randomInt(100, 3000));
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
