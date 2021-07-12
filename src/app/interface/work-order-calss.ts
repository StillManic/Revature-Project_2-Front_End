import { WorkOrder } from "./work-order";

export default function createWorkOrder(): WorkOrder {
    return {
        id: '',
        vehicle: {
            customer: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: ''
            },
            mileage: 0,
            vin: 0,
            make: '',
            model: '',
            year: 0
        },
        description: '',
        cost: 0,
        date: '',
        isCompleted: false,
        employee: {
            jobTitle: '',
            username: '',
            password: ''
        }




    }
}