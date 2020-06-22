import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TaskService } from '../task.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Task } from 'src/app/shared/task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements AfterContentInit {

  submitted: boolean = false;  
  selectedTaskId:number;
  taskSelected: Task;  

  taskForm = new FormGroup({
    ProjectName : new FormControl(['',Validators.required]),
    TaskName:new FormControl(['',Validators.required]),
    ParentTask:new FormControl(['']),
    Priority:new FormControl([0, Validators.min(1)]),
    StartDate:new FormControl(['',Validators.required]),
    EndDate:new FormControl(['',Validators.required]),
    User:new FormControl(['',Validators.required]),
    TaskId:new FormControl([0]),
    ProjectId:new FormControl([0]),
    ParentId:new FormControl([0]),
    Status: new FormControl([''])
  });

  constructor(
    private formBuilder:FormBuilder,
    private taskService:TaskService,
    private activeRoute:ActivatedRoute, 
    private router:Router) {


      this.activeRoute.queryParams.subscribe(param=>{
        this.selectedTaskId=param.id
  
        this.taskService.getTaskbyId(this.selectedTaskId)
                        .subscribe(res=>this.setValue(this.taskSelected=res));
        
        
      });

   }


  get form(){return this.taskForm.controls;}
  
  setValue(taskVal:Task) {    
    this.taskForm.setValue({
      ProjectName : taskVal.ProjectName,
      TaskName:taskVal.TaskName,
      ParentTask:taskVal.ParentTask,
      Priority:taskVal.Priority,
      StartDate:formatDate(taskVal.StartDate,'M/d/yy', 'en-US'),
      EndDate:formatDate(taskVal.EndDate,'M/d/yy', 'en-US'),
      User:taskVal.User,
      TaskId:taskVal.TaskId,
      ProjectId:taskVal.ProjectId,
      ParentId:taskVal.ParentId,
      Status:taskVal.Status
    });
  }

  ngAfterContentInit() {
      this.taskForm = this.formBuilder.group({
        ProjectName : new FormControl(['',Validators.required]),
        TaskName:new FormControl(['',Validators.required]),
        ParentTask:new FormControl(['']),
        Priority:new FormControl([0, Validators.min(1)]),
        StartDate:new FormControl(['',Validators.required]),
        EndDate:new FormControl(['',Validators.required]),
        User:new FormControl(['',Validators.required]),
        TaskId:new FormControl([0]),
        ProjectId:new FormControl([0]),
        ParentId:new FormControl([0]),
        Status: new FormControl([''])
      });
  }

  onUpdate(){

    this.submitted = true;

    if(this.taskForm.invalid){
      return;
    }

    this.taskService.updateTask(this.taskForm.value)
      .pipe(first())
      .subscribe(data=>{
          alert('Successfully updated!');
          this.router.navigate(['app-task']);
        },
        (error:HttpErrorResponse)=>{        
          alert(error.message);
        }
      );
    
  }

  onCancel(){
    this.router.navigate(['app-task']);
  }
  
}
