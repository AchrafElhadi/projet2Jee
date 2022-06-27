import { state } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers!:Observable<any>;
  errormessage!:string;
  searchFromGroup:FormGroup |undefined;
  constructor(private customerService:CustomerService,private fb:FormBuilder,private router:Router) {

   }

  ngOnInit(): void {

    this.searchFromGroup=this.fb.group({
      nom:this.fb.control("")
    });
   this.searchFunc();
  }

  searchFunc()
  {
    let nom=this.searchFromGroup?.value.nom;
     this.customers= this.customerService.searchCustomers(nom).pipe(
      catchError(error=>{
        this.errormessage=error.message;
        return throwError(error)
      })
     )
  }
  handlecustaccount(cust:customer)
  {
    this.router.navigateByUrl("customer-accounts/"+cust.id,{state:cust})
  }
  deleteCustomer(c:customer)
  {

    if(!confirm("are you serious"))
    return;
    this.customerService.deletecust(c.id).subscribe(
      {
        next:res=>{
        this.customers= this.customers.pipe(
            map(data=>{
              let index=data.indexOf(c)
              data.slice(index,1)
              return data;
            })
          )
        },
        error:err=>
        {
          console.log(err)
        }
      }
    )
  }
}
