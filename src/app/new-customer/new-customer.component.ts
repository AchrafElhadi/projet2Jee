import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFromGroup!:FormGroup
  constructor(private fb:FormBuilder,private customerService:CustomerService,private router:Router) { }

  ngOnInit(): void {
    this.newCustomerFromGroup=this.fb.group(
      {
        name:this.fb.control(null,[Validators.required,Validators.minLength(4)]),
        email:this.fb.control(null,[Validators.email,Validators.required]),

      }
    )
  }

  addCustomer()
  {
    this.customerService.addcust(this.newCustomerFromGroup.value).subscribe({
      next:res=>{
        alert("Added successfully")
        // this.newCustomerFromGroup.reset()
        this.router.navigateByUrl("/customers")
      },
      error:err=>
      alert(err)
    })
  }

}
