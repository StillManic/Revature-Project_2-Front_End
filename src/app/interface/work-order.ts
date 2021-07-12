import { Vehicle } from './vehicle';
import { Employee } from './employee';

export interface WorkOrder {
    id?: string;
    vehicleId: Vehicle;
    employeeId: Employee;
    description: string;
    date: string;
    cost: number;
    complete: boolean;
}

