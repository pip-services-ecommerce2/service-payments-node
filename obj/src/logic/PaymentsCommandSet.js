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
exports.PaymentsCommandSet = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
const version1_1 = require("../data/version1");
const PaymentSystemAccountV1Schema_1 = require("../data/version1/PaymentSystemAccountV1Schema");
const BuyerV1Schema_1 = require("../data/version1/BuyerV1Schema");
const PaymentMethodV1Schema_1 = require("../data/version1/PaymentMethodV1Schema");
const PayoutV1Schema_1 = require("../data/version1/PayoutV1Schema");
const SellerV1Schema_1 = require("../data/version1/SellerV1Schema");
class PaymentsCommandSet extends pip_services3_commons_nodex_1.CommandSet {
    constructor(controller) {
        super();
        this._controller = controller;
        this.addCommand(this.makeMakePaymentCommand());
        this.addCommand(this.makeSubmitPaymentCommand());
        this.addCommand(this.makeAuthorizePaymentCommand());
        this.addCommand(this.makeCheckPaymentCommand());
        this.addCommand(this.makeRefundPaymentCommand());
        this.addCommand(this.makeMakePayoutCommand());
        this.addCommand(this.makeCheckPayoutCommand());
        this.addCommand(this.makeCancelPayoutCommand());
    }
    makeMakePaymentCommand() {
        return new pip_services3_commons_nodex_2.Command('make_payment', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withRequiredProperty('buyer', new BuyerV1Schema_1.BuyerV1Schema())
            .withOptionalProperty('order', new version1_1.OrderV1Schema())
            .withOptionalProperty('payment_method', new PaymentMethodV1Schema_1.PaymentMethodV1Schema())
            .withOptionalProperty('amount', pip_services3_commons_nodex_4.TypeCode.Float)
            .withOptionalProperty('currency_code', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let buyer = args.getAsObject('buyer');
            let order = args.getAsObject('order');
            let paymentMethod = args.getAsObject('payment_method');
            let amount = args.getAsNullableFloat('amount');
            let currencyCode = args.getAsNullableString('currency_code');
            return yield this._controller.makePayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode);
        }));
    }
    makeSubmitPaymentCommand() {
        return new pip_services3_commons_nodex_2.Command('submit_payment', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withRequiredProperty('buyer', new BuyerV1Schema_1.BuyerV1Schema())
            .withOptionalProperty('order', new version1_1.OrderV1Schema())
            .withOptionalProperty('payment_method', new PaymentMethodV1Schema_1.PaymentMethodV1Schema())
            .withOptionalProperty('amount', pip_services3_commons_nodex_4.TypeCode.Float)
            .withOptionalProperty('currency_code', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let buyer = args.getAsObject('buyer');
            let order = args.getAsObject('order');
            let paymentMethod = args.getAsObject('payment_method');
            let amount = args.getAsNullableFloat('amount');
            let currencyCode = args.getAsNullableString('currency_code');
            return yield this._controller.submitPayment(correlationId, system, account, buyer, order, paymentMethod, amount, currencyCode);
        }));
    }
    makeAuthorizePaymentCommand() {
        return new pip_services3_commons_nodex_2.Command('authorize_payment', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withOptionalProperty('payment', new version1_1.PaymentV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let payment = args.getAsObject('payment');
            return yield this._controller.authorizePayment(correlationId, system, account, payment);
        }));
    }
    makeCheckPaymentCommand() {
        return new pip_services3_commons_nodex_2.Command('check_payment', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withOptionalProperty('payment', new version1_1.PaymentV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let payment = args.getAsObject('payment');
            return yield this._controller.checkPayment(correlationId, system, account, payment);
        }));
    }
    makeRefundPaymentCommand() {
        return new pip_services3_commons_nodex_2.Command('refund_payment', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withOptionalProperty('payment', new version1_1.PaymentV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let payment = args.getAsObject('payment');
            return yield this._controller.refundPayment(correlationId, system, account, payment);
        }));
    }
    makeMakePayoutCommand() {
        return new pip_services3_commons_nodex_2.Command('make_payout', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withRequiredProperty('seller', new SellerV1Schema_1.SellerV1Schema())
            .withOptionalProperty('description', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('amount', pip_services3_commons_nodex_4.TypeCode.Float)
            .withRequiredProperty('currency_code', pip_services3_commons_nodex_4.TypeCode.String), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let seller = args.getAsObject('seller');
            let description = args.getAsNullableString('description');
            let amount = args.getAsFloat('amount');
            let currencyCode = args.getAsString('currency_code');
            return yield this._controller.makePayout(correlationId, system, account, seller, description, amount, currencyCode);
        }));
    }
    makeCheckPayoutCommand() {
        return new pip_services3_commons_nodex_2.Command('check_payout', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withRequiredProperty('payout', new PayoutV1Schema_1.PayoutV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let payout = args.getAsObject('payout');
            return yield this._controller.checkPayout(correlationId, system, account, payout);
        }));
    }
    makeCancelPayoutCommand() {
        return new pip_services3_commons_nodex_2.Command('cancel_payout', new pip_services3_commons_nodex_3.ObjectSchema(true)
            .withRequiredProperty('system', pip_services3_commons_nodex_4.TypeCode.String)
            .withRequiredProperty('account', new PaymentSystemAccountV1Schema_1.PaymentSystemAccountV1Schema())
            .withRequiredProperty('payout', new PayoutV1Schema_1.PayoutV1Schema()), (correlationId, args) => __awaiter(this, void 0, void 0, function* () {
            let system = args.getAsString('system');
            let account = args.getAsObject('account');
            let payout = args.getAsObject('payout');
            return yield this._controller.cancelPayout(correlationId, system, account, payout);
        }));
    }
}
exports.PaymentsCommandSet = PaymentsCommandSet;
//# sourceMappingURL=PaymentsCommandSet.js.map