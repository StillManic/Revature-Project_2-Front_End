import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Customer } from '../interface/customer';
import { Vehicle } from '../interface/vehicle';
import { CustomerService } from '../services/customer.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private customerService: CustomerService) { }

  customers: Customer[] = []

  vin = new FormControl('');
  make = new FormControl('');
  model = new FormControl(0);
  year = new FormControl(0);
  mileage = new FormControl(0);
  customer = new FormControl();

  vehicle: Vehicle = {
    customerId: {
      phoneNumber: '',
      email: '',
      firstName: '',
      lastName: ''
    },
    vin: 0,
    make: '',
    model: '',
    year: 0,
    mileage: 0
  };



  ngOnInit(): void {
    this.getAllCustomer();
  }
  


  getAllCustomer(): void {
    this.customerService.getAllCustomer().subscribe(customers => {
      this.customers = customers.sort(
        (a, b) => {
          if(a.id != undefined && b.id != undefined) {
            return a.id - b.id;
          }
          return 0;
        }
      );
    });
  }

  //write a function to get a customer by id
  getCustomer(): void {
    //split customer ids into an array

    if(!this.customer.value) return

    let customerIds = this.customer.value.split(' ');
    let id = customerIds[0];

    console.log(customerIds);
    this.customerService.getCustomerById(id).subscribe(customer => {
      this.vehicle.customerId = customer;
    });
  }




  //write a function to add a vehicle with exception handling
  addVehicle(): void {
    if (this.vin.value && this.make.value && this.model.value && this.year.value && this.mileage.value) {


      this.vehicle.make = this.make.value;
      this.vehicle.model = this.model.value;
      this.vehicle.year = parseInt(this.year.value);
      this.vehicle.mileage = parseInt(this.mileage.value);
      this.vehicle.vin = parseInt(this.vin.value);

      console.log(this.vehicle)
      this.vehicleService.addVehicle(this.vehicle).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
      this.vin.setValue('');
      this.make.setValue('');
      this.model.setValue('');
      this.year.setValue('');
      this.mileage.setValue('');



    } else {
      alert('Please fill in all the fields');
    }
  }

}
