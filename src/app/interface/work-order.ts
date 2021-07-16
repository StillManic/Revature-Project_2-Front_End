import { Vehicle } from './vehicle';
import { Employee } from './employee';

export interface WorkOrder {
    id?: number;
    vehicleId: Vehicle;
    employeeId: Employee;
    description: string;
    date: string;
    cost: number;
    complete: boolean;
}

