"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsProcess = void 0;
const pip_services3_container_nodex_1 = require("pip-services3-container-nodex");
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
const pip_services3_swagger_nodex_1 = require("pip-services3-swagger-nodex");
const PaymentsServiceFactory_1 = require("../build/PaymentsServiceFactory");
class PaymentsProcess extends pip_services3_container_nodex_1.ProcessContainer {
    constructor() {
        super('service-payments', 'Payments microservice');
        this._factories.add(new PaymentsServiceFactory_1.PaymentsServiceFactory());
        this._factories.add(new pip_services3_rpc_nodex_1.DefaultRpcFactory());
        this._factories.add(new pip_services3_swagger_nodex_1.DefaultSwaggerFactory());
    }
}
exports.PaymentsProcess = PaymentsProcess;
//# sourceMappingURL=PaymentsProcess.js.map