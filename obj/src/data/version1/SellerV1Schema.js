"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const AddressV1Schema_1 = require("./AddressV1Schema");
class SellerV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('first_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('last_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('email', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('address', new AddressV1Schema_1.AddressV1Schema());
        this.withOptionalProperty('birth_date', pip_services3_commons_nodex_2.TypeCode.DateTime);
        this.withOptionalProperty('ssn_last4', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('ip_address', pip_services3_commons_nodex_2.TypeCode.String);
    }
}
exports.SellerV1Schema = SellerV1Schema;
//# sourceMappingURL=SellerV1Schema.js.map