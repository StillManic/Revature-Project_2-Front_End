import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  constructor() { }

  customer?: Customer;
  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  email = new FormControl('');



  ngOnInit(): void {
  }

  addCustomer(): void {
    if(!this.firstName.value) return;
    if(!this.lastName.value) return;
    if(!this.phoneNumber.value) return;
    if(!this.email.value) return;

    this.customer = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value
    }
    //Add the addCustomer service here
    console.log(this.customer);
  }
}
