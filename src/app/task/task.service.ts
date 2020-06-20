import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from '../shared/task.model';


@Injectable()
export class TaskService{

  
  
    restUrl :string= 'http://localhost:50326/Task/';



    constructor(private http:HttpClient){

    }

    getTaskList():Observable<any>{
        return this.http.get(this.restUrl+"GetAll")
                        .pipe(map((res:Response)=>res));
    }

    getParentTaskList():Observable<any>{
        return this.http.get(this.restUrl+"GetParentTask")
                        .pipe(map((res:Response)=>res));
    }


    getTaskbyId(id:number):Observable<any>{
        return this.http
            .get(this.restUrl+`Get/${id}`)
            .pipe(map((res:Response)=>res))
    }

    updateTask(task: Task):Observable<any>{
        return this.http
            .put(this.restUrl+"Update",task,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    endTask(task: Task):Observable<any>{
        return this.http
            .put(this.restUrl+"EndTask",task,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    
    addTask(task:Task):Observable<any>{
        return this.http
            .post(this.restUrl+"Add",task,this.generateHeaders())
            .pipe(map((res:Response)=>res));
    }

    private generateHeaders = () => {
        return {
          headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
    }


      
    
}