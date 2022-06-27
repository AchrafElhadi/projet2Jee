import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accoutns',
  templateUrl: './accoutns.component.html',
  styleUrls: ['./accoutns.component.css']
})
export class AccoutnsComponent implements OnInit {

  searchFromGroup!:FormGroup
  operationFrom!:FormGroup
  errorMessage!:string;
  constructor(private fb:FormBuilder,private accountService:AccountsService) { }
    accountObserv!:Observable<AccountDetails>
  currentPage:number=0;
  pageSize:number=5;
  ngOnInit(): void {
    this.searchFromGroup=this.fb.group({
      accountId:this.fb.control("")
    })
    this.operationFrom=this.fb.group({
      operationType:this.fb.control(null),
      amount:this.fb.control(0),
      description:this.fb.control(null),
      accountDestination:this.fb.control(null)
    })
  }

  searchAccount()
  {
    this.accountObserv= this.accountService.getAccountbyId(this.searchFromGroup?.value.accountId,this.currentPage,this.pageSize).pipe(
     catchError (
     err=>{
      this.errorMessage=err.message;
      return throwError(err)
     }
     )
    )
  
  }
  gotoPage(page:number)
  {
    this.currentPage=page;
    this.searchAccount();
  }
  addAccountOper()
  {
    let accountId:string=this.searchFromGroup.value.accountId;
 let operationType=this.operationFrom.value.operationType;

 let description:string=this.operationFrom.value.description;
 
 let amount:number=this.operationFrom.value.amount;
 let accountdest=this.operationFrom.value.accountDestination;
    if(operationType=='debit')
    {
      this.accountService.debit(accountId,amount,description).subscribe(
        {
          next:(res)=>
          {
            alert("debit success")
            this.operationFrom.reset()

            this.searchAccount();
          },
          error:(err)=>
          {
            console.log(err)
          }
        }
      )
    }
    else if(operationType=='credit')
    {
      this.accountService.credit(accountId,amount,description).subscribe(
        {
          next:(res)=>
          {
            alert("credit success")
            this.operationFrom.reset()

            this.searchAccount()

          },
          error:(err)=>
          {
            alert("success transfer")
          }
        }
      )

    }
    else if(operationType=='transfer')
    {
      // this.accountService.transfer(accountId,accountdest,amount,description).subscribe(
      //   {
      //     next:(res)=>
      //     {
      //       alert("transfer success")
      //       this.operationFrom.reset()

      //       this.searchAccount()
      //     },
      //     error:(err)=>
      //     {
      //       console.log(err)
      //       console.log({accountId,accountdest,amount,description})
      //     }
      //   }
      // )
      this.accountService.debit(accountId,amount,description).subscribe(
        {
          next:(res)=>
          {
            alert("transfer success")
            this.operationFrom.reset()

            this.searchAccount();
          },
          error:(err)=>
          {
            console.log(err)
          }
        }
      )

    }
  }
}
