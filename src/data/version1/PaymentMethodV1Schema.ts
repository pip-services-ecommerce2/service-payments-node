import { ObjectSchema, ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class PaymentMethodV1Schema extends ObjectSchema {

    public constructor() {
        super();

        this.withRequiredProperty('id', TypeCode.String);
        this.withOptionalProperty('type', TypeCode.String);
        this.withOptionalProperty('card', null);
        this.withOptionalProperty('bank_account', null);
        this.withOptionalProperty('paypal_account', null);
        this.withOptionalProperty('stripe_account', null);
        this.withOptionalProperty('billing_address', null);
    }
}