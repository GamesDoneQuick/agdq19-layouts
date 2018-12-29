'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// Packages
const express = require("express");
// Ours
const nodecgApiContext = require("./util/nodecg-api-context");
const nodecg = nodecgApiContext.get();
const app = express();
const log = new nodecg.Logger(`${nodecg.bundleName}:zabbix`);
const namespacesRep = nodecg.Replicant('_obs:namespaces');
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
//# sourceMappingURL=zabbix.js.map