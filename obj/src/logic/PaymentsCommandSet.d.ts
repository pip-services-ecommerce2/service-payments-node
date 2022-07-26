import { CommandSet } from 'pip-services3-commons-nodex';
import { IPaymentsController } from './IPaymentsController';
export declare class PaymentsCommandSet extends CommandSet {
    private _controller;
    constructor(controller: IPaymentsController);
    private makeMakePaymentCommand;
    private makeSubmitPaymentCommand;
    private makeAuthorizePaymentCommand;
    private makeCheckPaymentCommand;
    private makeRefundPaymentCommand;
    private makeMakePayoutCommand;
    private makeCheckPayoutCommand;
    private makeCancelPayoutCommand;
}
