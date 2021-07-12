import { Component, OnInit } from '@angular/core';
import { Customer } from '../interface/customer';
import { FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.css']
})
export class AddCustomerFormComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  customer?: Customer;
  firstName = new FormControl('');
  lastName = new FormControl('');
  phoneNumber = new FormControl('');
  email = new FormControl('');



  ngOnInit(): void {
  }


  addCustomer(): void {
    if (!this.firstName.value) return;
    if (!this.lastName.value) return;
    if (!this.phoneNumber.value) return;
    if (!this.email.value) return;

    this.customer = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
      phoneNumber: this.phoneNumber.value,
      email: this.email.value
    }
    console.log(this.customer)
    
    this.customerService.addCustomer(this.customer).subscribe(customer => console.log(customer))
    //Add the addCustomer service here
    
  }
}
