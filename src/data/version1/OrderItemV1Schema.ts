import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class OrderItemV1Schema extends ObjectSchema {

    public constructor() {
        super();
  
        this.withRequiredProperty('product_id', TypeCode.String);
        this.withRequiredProperty('product_name', TypeCode.String);
        this.withOptionalProperty('description', TypeCode.String);
        this.withRequiredProperty('quantity', TypeCode.Integer);
        this.withRequiredProperty('price', TypeCode.Float);
        this.withOptionalProperty('discount', TypeCode.Float);
        this.withOptionalProperty('discount_price', TypeCode.Float);
        this.withRequiredProperty('total', TypeCode.Float);
    }
}