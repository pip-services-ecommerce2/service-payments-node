"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class PaymentMethodV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('type', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('card', null);
        this.withOptionalProperty('bank_account', null);
        this.withOptionalProperty('paypal_account', null);
        this.withOptionalProperty('stripe_account', null);
        this.withOptionalProperty('billing_address', null);
    }
}
exports.PaymentMethodV1Schema = PaymentMethodV1Schema;
//# sourceMappingURL=PaymentMethodV1Schema.js.map