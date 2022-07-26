"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsServiceFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const PaymentsController_1 = require("../logic/PaymentsController");
const PaymentsHttpServiceV1_1 = require("../services/version1/PaymentsHttpServiceV1");
const PayPalConnector_1 = require("../logic/paypal/PayPalConnector");
const StripeConnector_1 = require("../logic/stripe/StripeConnector");
class PaymentsServiceFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(PaymentsServiceFactory.ControllerDescriptor, PaymentsController_1.PaymentsController);
        this.registerAsType(PaymentsServiceFactory.HttpServiceV1Descriptor, PaymentsHttpServiceV1_1.PaymentsHttpServiceV1);
        this.registerAsType(PaymentsServiceFactory.PayPalConnectorDescriptor, PayPalConnector_1.PayPalConnector);
        this.registerAsType(PaymentsServiceFactory.StripeConnectorDescriptor, StripeConnector_1.StripeConnector);
    }
}
exports.PaymentsServiceFactory = PaymentsServiceFactory;
PaymentsServiceFactory.ControllerDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-payments', 'controller', 'default', '*', '1.0');
PaymentsServiceFactory.HttpServiceV1Descriptor = new pip_services3_commons_nodex_1.Descriptor('service-payments', 'service', 'http', '*', '1.0');
PaymentsServiceFactory.PayPalConnectorDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-payments', 'connector', 'paypal', '*', '1.0');
PaymentsServiceFactory.StripeConnectorDescriptor = new pip_services3_commons_nodex_1.Descriptor('service-payments', 'connector', 'stripe', '*', '1.0');
//# sourceMappingURL=PaymentsServiceFactory.js.map