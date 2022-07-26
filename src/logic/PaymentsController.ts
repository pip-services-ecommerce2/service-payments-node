import { ConfigParams, BadRequestException } from 'pip-services3-commons-nodex';
import { IOpenable } from 'pip-services3-commons-nodex';
import { IConfigurable } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { IReferences } from 'pip-services3-commons-nodex';
import { IReferenceable } from 'pip-services3-commons-nodex';
import { CommandSet } from 'pip-services3-commons-nodex';
import { ICommandable } from 'pip-services3-commons-nodex';

import { PaymentV1 } from '../data/version1';
import { PaymentSystemV1 } from '../data/version1';
import { OrderV1 } from '../data/version1';

import { IPaymentsController } from './IPaymentsController';
import { PaymentsCommandSet } from './PaymentsCommandSet';
import { CompositeLogger } from 'pip-services3-components-nodex';
import { IPaymentsConnector } from './IPaymentsConnector';
import { BuyerV1 } from '../data/version1/BuyerV1';
import { PaymentMethodV1 } from '../data/version1/PaymentMethodV1';
import { PaymentSystemAccountV1 } from '../data/version1/PaymentSystemAccountV1';
import { SellerV1 } from '../data/version1/SellerV1';
import { PayoutV1 } from '../data/version1/PayoutV1';

export class PaymentsController implements IPaymentsController, IConfigurable, IOpenable, IReferenceable, ICommandable {

    private _commandSet: PaymentsCommandSet;
    private _logger: CompositeLogger = new CompositeLogger();

    private _paypalConnector: IPaymentsConnector;
    private _stripeConnector: IPaymentsConnector;

    public constructor() {
    }

    public configure(config: ConfigParams): void {
        this._logger.configure(config);
    }

    public setReferences(references: IReferences): void {

        this._paypalConnector = references.getOneOptional<IPaymentsConnector>(
            new Descriptor('service-payments', 'connector', 'paypal', '*', '1.0')
        );

        this._stripeConnector = references.getOneOptional<IPaymentsConnector>(
            new Descriptor('service-payments', 'connector', 'stripe', '*', '1.0')
        );
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new PaymentsCommandSet(this);
        }

        return this._commandSet;
    }

    public isOpen(): boolean {
        return this._paypalConnector != null || this._stripeConnector != null;
    }

    public async open(correlationId: string): Promise<void> {
    }

    public async close(correlationId: string): Promise<void> {

        if (this._paypalConnector.isOpen) {
            await this._paypalConnector.close(correlationId);
            this._paypalConnector = null;
        }

        if (this._stripeConnector.isOpen) {
            await this._stripeConnector.close(correlationId);
            this._stripeConnector = null;

        }
    }

    public async makePayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1,
        amount: number, currencyCode: string): Promise<PaymentV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.makePaymentAsync(correlationId, account, buyer, order, paymentMethod, amount, currencyCode);
    }

    public async submitPayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        buyer: BuyerV1, order: OrderV1, paymentMethod: PaymentMethodV1,
        amount: number, currencyCode: string): Promise<PaymentV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.submitPaymentAsync(correlationId, account, buyer, order, paymentMethod, amount, currencyCode);
    }

    public async authorizePayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        payment: PaymentV1): Promise<PaymentV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

       return await connector.authorizePaymentAsync(correlationId, account, payment);
    }

    public async checkPayment(correlationId: string, system: string, account: PaymentSystemAccountV1,
        payment: PaymentV1): Promise<PaymentV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.checkPaymentAsync(correlationId, account, payment);
    }

    public async refundPayment(correlationId: string, system: string, account: PaymentSystemAccountV1, payment: PaymentV1): Promise<PaymentV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.refundPaymentAsync(correlationId, account, payment);
    }

    public async makePayout(correlationId: string, system: string, account: PaymentSystemAccountV1,
        seller: SellerV1, description: string, amount: number, currencyCode: string): Promise<PayoutV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.makePayoutAsync(correlationId, account, seller, description, amount, currencyCode);
    }

    public async checkPayout(correlationId: string, system: string, account: PaymentSystemAccountV1,
        payout: PayoutV1): Promise<PayoutV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.checkPayoutAsync(correlationId, account, payout);
    }

    public async cancelPayout(correlationId: string, system: string, account: PaymentSystemAccountV1,
        payout: PayoutV1): Promise<PayoutV1> {

        let connector = this.getSystemConnector(correlationId, system);
        if (!connector) return;

        return await connector.cancelPayoutAsync(correlationId, account, payout);
    }

    private getSystemConnector(correlationId: string, system: string): IPaymentsConnector {
        switch (system) {
            case PaymentSystemV1.PayPal: return this._paypalConnector;
            case PaymentSystemV1.Stripe: return this._stripeConnector;
            default:
        }

        throw new BadRequestException(correlationId, 'ERR_PAYMENT_SYSTEM', 'Payment system is not supported')
            .withDetails('system', system);
    }

}