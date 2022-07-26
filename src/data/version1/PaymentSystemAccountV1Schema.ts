import { ObjectSchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class PaymentSystemAccountV1Schema extends ObjectSchema {

    public constructor() {
        super();

        this.withOptionalProperty('access_id', TypeCode.String);
        this.withOptionalProperty('access_key', TypeCode.String);
    }
}