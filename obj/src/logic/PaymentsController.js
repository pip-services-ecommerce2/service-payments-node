"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const version1_1 = require("../data/version1");
const PaymentsCommandSet_1 = require("./PaymentsCommandSet");
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
class PaymentsController {
    constructor() {
        this._logger = new pip_services3_components_nodex_1.CompositeLogger();
    }
    configure(config) {
        this._logger.configure(config);
    }
    setReferences(references) {
        this._paypalConnector = references.getOneOptional(new pip_services3_commons_nodex_2.Descriptor('service-payments', 'connector', 'paypal', '*', '1.0'));
        this._stripeConnector = references.getOneOptional(new pip_services3_commons_nodex_2.Descriptor('service-payments', 'connector', 'stripe', '*', '1.0'));
    }
    getCommandSet() {
        if (this._commandSet == null) {
            this._commandSet = new PaymentsCommandSet_1.PaymentsCommandSet(this);
        }
        return this._commandSet;
    }
    isOpen() {
        return this._paypalConnector != null || this._stripeConnector != null;
    }
    open(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    close(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._paypalConnector.isOpen) {
                yield this._paypalConnector.close(correlationId);
                this._paypalConnector = null;
            }
            if (this._stripeConnector.isOpen) {
                yield this._stripeConnector.close(correlationId);
                this._stripeConnector = null;
            }
        });
    }
    makePayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.makePaymentAsync(correlationId, account, buyer, order, paymentMethod, amount, currencyCode);
        });
    }
    submitPayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.submitPaymentAsync(correlationId, account, buyer, order, paymentMethod, amount, currencyCode);
        });
    }
    authorizePayment(correlationId, system, account, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.authorizePaymentAsync(correlationId, account, payment);
        });
    }
    checkPayment(correlationId, system, account, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.checkPaymentAsync(correlationId, account, payment);
        });
    }
    refundPayment(correlationId, system, account, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.refundPaymentAsync(correlationId, account, payment);
        });
    }
    makePayout(correlationId, system, account, seller, description, amount, currencyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.makePayoutAsync(correlationId, account, seller, description, amount, currencyCode);
        });
    }
    checkPayout(correlationId, system, account, payout) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.checkPayoutAsync(correlationId, account, payout);
        });
    }
    cancelPayout(correlationId, system, account, payout) {
        return __awaiter(this, void 0, void 0, function* () {
            let connector = this.getSystemConnector(correlationId, system);
            if (!connector)
                return;
            return yield connector.cancelPayoutAsync(correlationId, account, payout);
        });
    }
    getSystemConnector(correlationId, system) {
        switch (system) {
            case version1_1.PaymentSystemV1.PayPal: return this._paypalConnector;
            case version1_1.PaymentSystemV1.Stripe: return this._stripeConnector;
            default:
        }
        throw new pip_services3_commons_nodex_1.BadRequestException(correlationId, 'ERR_PAYMENT_SYSTEM', 'Payment system is not supported')
            .withDetails('system', system);
    }
}
exports.PaymentsController = PaymentsController;
//# sourceMappingURL=PaymentsController.js.map