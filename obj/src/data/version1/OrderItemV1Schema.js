"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemV1Schema = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
class OrderItemV1Schema extends pip_services3_commons_nodex_1.ObjectSchema {
    constructor() {
        super();
        this.withRequiredProperty('product_id', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('product_name', pip_services3_commons_nodex_2.TypeCode.String);
        this.withOptionalProperty('description', pip_services3_commons_nodex_2.TypeCode.String);
        this.withRequiredProperty('quantity', pip_services3_commons_nodex_2.TypeCode.Integer);
        this.withRequiredProperty('price', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withOptionalProperty('discount', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withOptionalProperty('discount_price', pip_services3_commons_nodex_2.TypeCode.Float);
        this.withRequiredProperty('total', pip_services3_commons_nodex_2.TypeCode.Float);
    }
}
exports.OrderItemV1Schema = OrderItemV1Schema;
//# sourceMappingURL=OrderItemV1Schema.js.map