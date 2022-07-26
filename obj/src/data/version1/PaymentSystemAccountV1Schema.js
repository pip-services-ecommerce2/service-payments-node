"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSystemAccountV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class PaymentSystemAccountV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('access_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('access_key', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.PaymentSystemAccountV1Schema = PaymentSystemAccountV1Schema;
//# sourceMappingURL=PaymentSystemAccountV1Schema.js.map