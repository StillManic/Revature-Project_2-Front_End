import { Customer } from './customer';

export interface Vehicle {
    id?: number;
    customerId: Customer;
    vin: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
}