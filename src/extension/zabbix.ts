'use strict';

// Packages
import * as express from 'express';

// Ours
import * as nodecgApiContext from './util/nodecg-api-context';

const nodecg = nodecgApiContext.get();
const app = express();
const log = new nodecg.Logger(`${nodecg.bundleName}:zabbix`);
const namespacesRep = nodecg.Replicant<string[]>('_obs:namespaces');

log.info('Zabbix integration enabled.');

app.get(`/${nodecg.bundleName}/zabbix/obs/:namespace`, (req, res) => {
	const namespace = req.params.namespace;
	if (!namespacesRep.value.includes(namespace)) {
		return res.sendStatus(404);
	}

	const replicant = nodecg.Replicant(`${namespace}:streamStatus`);
	return res.send(replicant.value);
});

nodecg.mount(app);
