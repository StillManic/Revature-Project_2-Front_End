import { Vehicle } from './vehicle';
import { Employee } from './employee';

export interface WorkOrder {
    id?: string;
    vehicle: Vehicle;
    employee: Employee;
    description: string;
    date: string;
    cost: number;
    isCompleted: boolean;
}