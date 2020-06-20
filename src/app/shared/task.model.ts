import { User } from './user.model';
import { DatePipe } from '@angular/common';

export class Task{
    constructor(
        public TaskId:number,
        public TaskName:string,
        public ParentId:number,
        public ParentTask:string,
        public ProjectId:number,
        public ProjectName:string,
        public StartDate:Date,
        public EndDate:Date,
        public Priority:number,
        public Status:string,
        public User:string,
        public UserId:number
    ){

    }

    
}