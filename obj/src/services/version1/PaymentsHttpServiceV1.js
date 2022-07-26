"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsHttpServiceV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
class PaymentsHttpServiceV1 extends pip_services3_rpc_nodex_1.CommandableHttpService {
    constructor() {
        super('v1/payments');
        this._dependencyResolver.put('controller', new pip_services3_commons_nodex_1.Descriptor('service-payments', 'controller', '*', '*', '1.0'));
    }
}
exports.PaymentsHttpServiceV1 = PaymentsHttpServiceV1;
//# sourceMappingURL=PaymentsHttpServiceV1.js.map