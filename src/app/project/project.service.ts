import { Project } from '../shared/project.model';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable() 
export class ProjectService{

    restUrl :string= 'http://localhost:50326/Project/';

    constructor(private http:HttpClient){

    }    

    editProj = new EventEmitter<Project>(); //event emitter for cross component interation when edit button is clicked

    getProjectList():Observable<any>{
        return this.http
            .get(this.restUrl+"GetAll")
            .pipe(map((res:Response)=>res));
    }

    getProjectbyId(id:number):Observable<any>{
        return this.http
            .get(this.restUrl+`Get/${id}`)
            .pipe(map((res:Response)=>res));
    }

    addProject(item:Project):Observable<any>
    {
        return this.http
                .post(this.restUrl+'Add',item,this.generateHeaders())
                .pipe(map((res:Response)=>res));
    }

    updateProj(item: Project):Observable<any>{
        return this.http
            .put(this.restUrl+"Update",item,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    suspendProj(item: Project):Observable<any>{
        return this.http
            .put(this.restUrl+"Suspend",item,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    private generateHeaders = () => {
        return {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
    }
}