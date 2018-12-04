/* eslint-disable comma-style, no-sparse-arrays */
'use strict';

const test = require('ava');
const {calcOriginalValues, mergeChangesFromTracker} = require('../dist/extension/lib/diff-run');

test('calcOriginalValues - should return undefined if there are no changes', t => {
	const original = {name: 'a'};
	const run = {name: 'a'};
	const originalValues = calcOriginalValues(run, original);
	t.is(originalValues, undefined);
});

test('calcOriginalValues - should error if a new property is added', t => {
	const original = {name: 'a'};
	const run = {name: 'a', newProp: 'newProp'};
	t.throws(() => {
		calcOriginalValues(run, original);
	}, /Unexpected difference:/);
});

test('calcOriginalValues - should error if a property is deleted', t => {
	const original = {name: 'a', category: 'a'};
	const run = {name: 'a'};
	t.throws(() => {
		calcOriginalValues(run, original);
	}, /Unexpected difference:/);
});

test('calcOriginalValues - should calculate the correct diff', t => {
	const original = {
		name: 'a',
		category: 'a',
		estimate: 'a',
		console: 'a',
		releaseYear: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'b',
		category: 'b',
		estimate: 'b',
		console: 'b',
		releaseYear: 'b',
		runners: [
			{name: 'b', stream: 'b'}
		]
	};
	const originalValues = calcOriginalValues(run, original);
	t.deepEqual(originalValues, {
		name: 'a',
		category: 'a',
		estimate: 'a',
		console: 'a',
		releaseYear: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	});
});

test('calcOriginalValues - should handle the addition of runners', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'b', stream: 'b'}
		]
	};
	const originalValues = calcOriginalValues(run, original);
	t.deepEqual(originalValues, {
		runners: [
			,
			{
				name: '',
				stream: ''
			}
		]
	});
});

test('calcOriginalValues - should handle the removal of runners', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};
	const originalValues = calcOriginalValues(run, original);
	t.deepEqual(originalValues, {
		runners: [
			,
			{
				name: 'a',
				stream: 'a'
			}
		]
	});
});

test('calcOriginalValues - should handle the addition of a runner stream', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const originalValues = calcOriginalValues(run, original);
	t.deepEqual(originalValues, {
		runners: [
			{
				stream: ''
			}
		]
	});
});

test('calcOriginalValues - should handle the removal of a runner stream', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a'}
		]
	};

	const originalValues = calcOriginalValues(run, original);
	t.deepEqual(originalValues, {
		runners: [
			{
				stream: 'a'
			}
		]
	});
});

test('mergeChangesFromTracker - should handle updated properties', t => {
	const original = {
		name: 'c',
		runners: [
			{name: 'c', stream: 'a'}
		]
	};

	const run = {
		name: 'b',
		runners: [
			{name: 'b', stream: 'b'}
		],
		originalValues: {
			name: 'a',
			runners: [
				{name: 'a', stream: 'a'}
			]
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'c',
		runners: [
			{name: 'c', stream: 'b'}
		],
		originalValues: {
			runners: [
				{stream: 'a'}
			]
		}
	});
});

test('mergeChangesFromTracker - should handle added runners', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	});
});

test('mergeChangesFromTracker - should handle runners removed from the original', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	});
});

test('mergeChangesFromTracker - should handle runners removed from the run', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		],
		originalValues: {
			runners: [
				,
				{name: 'a', stream: 'a'}
			]
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		],
		originalValues: {
			runners: [
				,
				{name: 'a', stream: 'a'}
			]
		}
	});
});

test('mergeChangesFromTracker - should handle runner properties added to the original', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a'},
			{name: 'a', stream: 'b'}
		],
		originalValues: {
			runners: [
				,
				{stream: 'a'}
			]
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'},
			{name: 'a', stream: 'b'}
		],
		originalValues: {
			runners: [
				,
				{stream: 'a'}
			]
		}
	});
});

test('mergeChangesFromTracker - should handle runner properties removed from the original', t => {
	const original = {
		name: 'a',
		runners: [
			{name: 'a'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'b'}
		],
		originalValues: {
			runners: [
				{stream: 'a'}
			]
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'a',
		runners: [
			{name: 'a'}
		]
	});
});

test('mergeChangesFromTracker - merge updated props from the tracker and remove them from originalValues', t => {
	const original = {
		name: 'c'
	};

	const run = {
		name: 'b',
		originalValues: {
			name: 'a'
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {name: 'c'});
});

test('mergeChangesFromTracker - remove keys from originalValues when the original run has been updated to match local changes', t => {
	const original = {
		name: 'b',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const run = {
		name: 'b',
		runners: [
			{name: 'b', stream: 'a'}
		],
		originalValues: {
			name: 'a',
			runners: [
				{name: 'a'}
			]
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'b',
		runners: [
			{name: 'b', stream: 'a'}
		],
		originalValues: {
			runners: [
				{name: 'a'}
			]
		}
	});
});

// The structure of the diff changes depending on how many props are in the object. Dumb.
// This tests the other type of diff that can be generated, which has no `path` property.
test('mergeChangesFromTracker - ugh', t => {
	const original = {
		name: 'b'
	};

	const run = {
		name: 'b',
		originalValues: {
			name: 'a'
		}
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'b'
	});
});

test('mergeChangesFromTracker - does nothing if nothing has changed since last fetch', t => {
	const original = {
		name: 'a'
	};

	const run = {
		name: 'a'
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {name: 'a'});
});

test('mergeChangesFromTracker - should merge new changes from the tracker when there are no local changes', t => {
	const original = {
		name: 'b',
		runners: [
			{name: 'a', stream: 'b'}
		]
	};

	const run = {
		name: 'a',
		runners: [
			{name: 'a', stream: 'a'}
		]
	};

	const newRun = mergeChangesFromTracker(run, original);
	t.deepEqual(newRun, {
		name: 'b',
		runners: [
			{name: 'a', stream: 'b'}
		]
	});
});
