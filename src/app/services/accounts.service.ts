import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http:HttpClient) { }

  public getAccountbyId(id:string,page:number,size:number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendhost+"/AccountOperation/"+id+"/pagesOperations?page="+page+"&size="+size)
  }
  public debit(accountId:string,amount:number,description:string)
  {
    let data={accountId:accountId,amount:amount,description:description}
    return this.http.post(environment.backendhost+"/AccountOperation/debit",data);
  }
  public credit(accountId:string,amount:number,description:string)
  {
    let data={accountId:accountId,amount:amount,description:description}
    return this.http.post(environment.backendhost+"/AccountOperation/credit",data);
  }
  public transfer(accountSource:string,accountDestination:string,amount:number,description:string)
  {
    let data={accountSource,accountDestination,amount,description}
    return this.http.post(environment.backendhost+"/AccountOperation/transfer",data);
  }
}
