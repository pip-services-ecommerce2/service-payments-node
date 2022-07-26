import { IStringIdentifiable } from 'pip-services3-commons-nodex';
export declare class PaymentV1 implements IStringIdentifiable {
    id: string;
    system: string;
    status: string;
    status_details?: string;
    order_id?: string;
    order_amount?: number;
    order_currency?: string;
    authorization_id?: string;
    confirm_data?: string;
    capture_id?: string;
}
