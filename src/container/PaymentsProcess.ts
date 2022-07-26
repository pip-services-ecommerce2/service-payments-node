import { ProcessContainer } from 'pip-services3-container-nodex';
import { DefaultRpcFactory } from 'pip-services3-rpc-nodex';
import { DefaultSwaggerFactory } from 'pip-services3-swagger-nodex';

import { PaymentsServiceFactory } from '../build/PaymentsServiceFactory';

export class PaymentsProcess extends ProcessContainer {
    public constructor() {
        super('service-payments', 'Payments microservice');

        this._factories.add(new PaymentsServiceFactory());
        this._factories.add(new DefaultRpcFactory());
        this._factories.add(new DefaultSwaggerFactory());
    }
}