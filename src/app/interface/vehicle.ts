import { Customer } from './customer';

export interface Vehicle {
    id?: number;
    customer: Customer;
    vin: number;
    make: string;
    model: string;
    year: number;
    mileage: number;
}