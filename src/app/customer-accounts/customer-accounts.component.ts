import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { customer } from '../model/customer.model';

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {

  custid!:string;
  customer!:customer
  constructor(private route:ActivatedRoute,private router :Router) {
this.customer=this.router.getCurrentNavigation()?.extras.state as customer;
   }

  ngOnInit(): void {
    this.custid=this.route.snapshot.params['id'];
  }

}
