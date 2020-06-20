import { User } from '../shared/user.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable() 
export class UserService{

restUrl :string= 'http://localhost:50326/User/';

    constructor(private http:HttpClient){

    }

    getUserList():Observable<any> {
        return this.http
            .get(this.restUrl+"GetAll")
            .pipe(map((res:Response)=>res))
    }

    addUser(user:User):Observable<any>{
        return this.http
            .post(this.restUrl+"Add",user,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    getUserbyId(id:number):Observable<any>{
        return this.http
            .get(this.restUrl+`Get/${id}`)
            .pipe(map((res:Response)=>res));
    }

    updateUser(user:User):Observable<any>{     
        return this.http
            .put(this.restUrl+"Update",user,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    deleteUser(userId:number):Observable<any>{
        return this.http
            .delete(this.restUrl+`Remove/${userId}`,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    private generateHeaders = () => {
        return {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
    }
}

