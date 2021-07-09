export interface WorkOrder {
    id?: string;
    vehicleId: string;
    employeeId: string;
    description: string;
    startDate: string;
    cost: number;
}