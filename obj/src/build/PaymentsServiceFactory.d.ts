import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class PaymentsServiceFactory extends Factory {
    static ControllerDescriptor: Descriptor;
    static HttpServiceV1Descriptor: Descriptor;
    static PayPalConnectorDescriptor: Descriptor;
    static StripeConnectorDescriptor: Descriptor;
    constructor();
}
