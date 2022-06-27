import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
}) 
export class CustomerService {

  constructor(private http:HttpClient) {

   }
   public getCustomers():Observable<Array<customer>>{
    return this.http.get<Array<customer>>(environment.backendhost+"/customers")
   }
   public searchCustomers(key:string):Observable<Array<customer>>{
    return this.http.get<Array<customer>>(environment.backendhost+"/customers/search?keyword="+key)
   }

   public addcust(customer:customer):Observable<customer>{
    return this.http.post<customer>(environment.backendhost+"/customers",customer);
   }
   public deletecust(id:number){
    return this.http.delete(environment.backendhost+"/customers/"+id);
   }
}
