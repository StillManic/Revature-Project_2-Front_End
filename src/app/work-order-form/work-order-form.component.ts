import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkOrder } from '../interface/work-order';
import { Customer } from '../interface/customer';
import { Vehicle } from '../interface/vehicle';
import { PartLookUp } from '../interface/part-lookup'
import { CustomerService } from '../services/customer.service';
import { VehicleService } from '../services/vehicle.service';
import { PartlookupService } from '../services/partlookup.service';
import { EmployeeService } from '../services/employee.service';
import { WorkorderService } from '../services/workorder.service';
import { PartListService } from '../services/part-list.service';
import { ASTWithSource } from '@angular/compiler';
import { PartList } from '../interface/part-list';
@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent implements OnInit {

  constructor(private customerService: CustomerService, private vehicleService: VehicleService, private partLookUpService: PartlookupService, private employeeService: EmployeeService, private workOrderService: WorkorderService, private partListService: PartListService) { }

  vehicleId = new FormControl('');
  customer = new FormControl('');
  employeeId = new FormControl('');
  startDate = new FormControl('');
  description = new FormControl('');

  partsSelect = new FormControl('');
  total: number = 0;
  //question mark means undefined at start
  workOrder: WorkOrder = {
    id: '',
    vehicleId: {
      customerId: {
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
    complete: false,
    employee: {
      jobTitle: '',
      username: '',
      password: ''
    }

  };

  partLookUp?: PartLookUp[];
  customerArray: Customer[] = [];
  vehicleArray: Vehicle[] = [];
  parts?: PartLookUp[];
  part?: PartLookUp;
  vehicle?: Vehicle;
  partList?: PartList;

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllParts();
  }


  getAllCustomers(): void {
    this.customerService.getAllCustomer().subscribe(customer => {
      this.customerArray = customer;
      // console.log(this.customerArray)
    })
  }

  getVehicleByCustomer() {
    let selectedCustomer: number = this.customer.value.split(' ')[0];
    console.log(selectedCustomer)
    this.vehicleService.getVehicleByCustomerId(selectedCustomer).subscribe(
      vehicles => {
        this.vehicleArray = vehicles
        // console.log(this.vehicleArray)
      }
    )

  }

  calculateTotal(): void {
    if (this.partsSelect.value.length >= 1) {
      this.total = 0;
      for (let value of this.partsSelect.value) {
        let valueString = value.split(' ')
        let price = valueString[2]
        this.total += parseInt(price);
      }
    }
  }

  getAllParts(): void {
    this.partLookUpService.getAllParts().subscribe(
      parts => {
        this.parts = parts;
      }
    )
  }

  addWorkOrder(): void {
    //Makes sure input fields are not null;
    // if (!this.vehicleId.value) return;
    // if (!this.customer.value) return;
    // if (!this.employeeId.value) return;
    // if (!this.startDate.value) return;
    // if (!this.description.value) return;

    this.vehicleService.getVehicleById(this.vehicleId.value).subscribe(
      vehicles => {
        // this.vehicle = vehicles;
        this.workOrder.vehicleId = vehicles
      }
    )
    this.employeeService.getEmployeeById(this.employeeId.value).subscribe(employee => {
      this.workOrder.employee = employee
    })

    //create a pitchlist object

    this.workOrder.description = this.description.value;
    this.workOrder.date = this.startDate.value;
    this.workOrder.cost = this.total;
    this.workOrder.complete = false;

    // console.log(this.workOrder)

    this.workOrderService.addWorkOrder(this.workOrder).subscribe(workOrder => {
      console.log(workOrder)
      for (let value of this.partsSelect.value) {
        //split the value by space
        let valueString = value.split(' ')
        let partId = valueString[0]
        let partPrice = valueString[1]
        this.partLookUpService.getPartById
          (partId).subscribe(parts => {this.partList = {
            part: parts,
            order: workOrder,
          }
          this.partListService.addPartList(this.partList).subscribe(partList => {console.log(partList)})
        })


        
      }
    });



  }
}
