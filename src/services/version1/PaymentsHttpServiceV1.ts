import { CommandableHttpService } from 'pip-services3-rpc-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

export class PaymentsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/payments');
        this._dependencyResolver.put('controller', new Descriptor('service-payments', 'controller', '*', '*', '1.0'));
    }
}