import { ObjectSchema, ArraySchema } from 'pip-services3-commons-nodex';
import { TypeCode } from 'pip-services3-commons-nodex';

export class PayoutV1Schema extends ObjectSchema {

    public constructor() {
        super();

        this.withRequiredProperty('id', TypeCode.String);
        this.withRequiredProperty('system', TypeCode.String);
        this.withRequiredProperty('status', TypeCode.String);

        this.withOptionalProperty('status_details', TypeCode.String);
        this.withOptionalProperty('account_id', TypeCode.String);
        this.withOptionalProperty('reversal_id', TypeCode.String);
    }
}