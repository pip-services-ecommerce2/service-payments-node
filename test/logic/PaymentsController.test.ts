const assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { PaymentStatusV1, OrderV1, PaymentSystemV1, PaymentV1 } from '../../src/data/version1';
import { PaymentsController } from '../../src/logic/PaymentsController';

import { TestModel } from '../data/TestModel';
import { PayPalConnector } from '../../src/logic/paypal/PayPalConnector';
import { StripeConnector } from '../../src/logic/stripe/StripeConnector';
import { PayoutV1 } from '../../src/data/version1/PayoutV1';

var now = new Date();

suite('PaymentsController', () => {
    let controller: PaymentsController;
    let terminate: boolean = false;
    let STRIPE_ACCESS_KEY: string;

    setup(async () => {
        STRIPE_ACCESS_KEY = process.env["STRIPE_ACCESS_KEY"];

        if (!STRIPE_ACCESS_KEY) {
            terminate = true;
            return;
        }

        controller = new PaymentsController();
        controller.configure(new ConfigParams());

        let stripeConnector = new StripeConnector();
        stripeConnector.configure(ConfigParams.fromTuples(
            'options.auto_confirm', false,
            'credential.access_key', STRIPE_ACCESS_KEY
        ));

        let references = References.fromTuples(
            new Descriptor('service-payments', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-payments', 'connector', 'stripe', '*', '1.0'), stripeConnector
        );

        controller.setReferences(references);

        await stripeConnector.open(null);
    });

    teardown((done) => {
        if (terminate) {
            done();
            return;
        }

    });

    test('[Stripe] Make payment', async (done) => {
        let order: OrderV1 = TestModel.createOrder();
        let paymentMethodId: string;

        if (terminate) {
            done();
            return;
        }

        let methodId = await TestModel.findPaymentMethod(STRIPE_ACCESS_KEY, '2');

        assert.isNotNull(methodId);
        paymentMethodId = methodId;


        let payment = await controller.makePayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            {   // buyer
                id: '2',
                name: 'Steve Jobs',
            },
            order,
            {   // payment method
                id: paymentMethodId,
                type: 'card'
            },
            order.total,
            order.currency_code
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);
    })

    test('[Stripe] Make submit/authorize payment', async (done) => {
        let order: OrderV1 = TestModel.createOrder();
        let payment1: PaymentV1;
        let paymentMethodId: string;

        if (terminate) {
            done();
            return;
        }

        let methodId = await TestModel.findPaymentMethod(STRIPE_ACCESS_KEY, '2');

        assert.isNotNull(methodId);
        paymentMethodId = methodId;


        let payment = await controller.submitPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            {   // buyer
                id: '2',
                name: 'Steve Jobs',
            },
            order,
            {   // payment method
                id: paymentMethodId,
                type: 'card'
            },
            order.total,
            order.currency_code
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.order_id);

        assert.equal(payment.status, PaymentStatusV1.Unconfirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);

        payment1 = payment;

        payment = await controller.authorizePayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);

        payment1 = payment;

        payment = await controller.checkPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Confirmed);
        assert.equal(payment.system, PaymentSystemV1.Stripe);

        payment = await controller.refundPayment(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payment1
        );

        assert.isObject(payment);
        assert.isNotNull(payment.id);
        assert.isNotNull(payment.capture_id);

        assert.equal(payment.status, PaymentStatusV1.Canceled);
        assert.equal(payment.system, PaymentSystemV1.Stripe);
    })

    test('[Stripe] Make/check/cancel payout', async (done) => {
        let payout1: PayoutV1;

        if (terminate) {
            done();
            return;
        }

        let payout = await controller.makePayout(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            {   // seller
                id: '1',
                name: 'Denis Kuznetsov',
                first_name: 'Denis',
                last_name: 'Kuznetsov',
                email: 'deniskuzn@gmail.com',
                phone: '2135880065',
                address: {
                    city: 'Anchorage',
                    country_code: 'US',
                    line1: 'line1',
                    postal_code: '99524',
                    state: 'Alaska'
                }
            },
            'Tests payout',
            5,
            'USD'
        );

        assert.isObject(payout);
        assert.isNotNull(payout.id);
        assert.isNotNull(payout.account_id);
        assert.equal(payout.status, PaymentStatusV1.Confirmed);

        payout1 = payout;

        payout = await controller.checkPayout(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payout1
        );

        assert.isObject(payout);
        assert.isNotNull(payout.id);
        assert.isNotNull(payout.account_id);
        assert.equal(payout.status, PaymentStatusV1.Confirmed);

        payout = await controller.cancelPayout(
            null,
            'stripe',
            {   // account
                access_key: STRIPE_ACCESS_KEY
            },
            payout1
        );

        assert.isObject(payout);
        assert.isNotNull(payout.id);
        assert.isNotNull(payout.account_id);
        assert.isNotNull(payout.reversal_id);

        assert.equal(payout.status, PaymentStatusV1.Canceled);
        assert.equal(payout.system, PaymentSystemV1.Stripe);
    })

});

