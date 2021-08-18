import { Account } from "./Account";

export interface Order {
    firstname: string,
    lastname: string,
    contact1: string,
    contact2: string,
    address1: string,
    address2: string,
    paymentMethod: string,
    orderStatus: string,
    ispaid: boolean,
    total: string,
    dateandtime: string,
    user?: Account,
    productsToOrder: any
}