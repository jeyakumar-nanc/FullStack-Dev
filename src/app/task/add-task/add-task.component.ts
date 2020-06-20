import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TaskService } from '../task.service';
import { ProjectService } from 'src/app/project/project.service';
import { Project } from 'src/app/shared/project.model';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/user/user.service';
import { ParentTask } from 'src/app/shared/parenttask.model';
import { first } from 'rxjs/internal/operators/first';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Task } from 'src/app/shared/task.model';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public taskForm : any;
  public submitted: boolean = false;

  projList : Project[];
  userList : User[];
  parentTaskList :ParentTask[];
  taskDataSubmitted: Task;

  constructor(private formBuilder:FormBuilder, 
    private taskService:TaskService, 
    private projService:ProjectService,
    private userService:UserService,
    private router:Router,) {

     
   }

  ngOnInit() {

    this.taskForm = this.formBuilder.group({
      ProjectId : [0],
      TaskName:['',Validators.required],
      ParentId:[0],
      Priority:[0, Validators.required],
      StartDate:[new Date(),Validators.required],
      EndDate:[new Date(),Validators.required],
      UserId:[0]
    });

    this.projService.getProjectList().subscribe(res=>this.projList=res);
    this.userService.getUserList().subscribe(res=>this.userList=res);
    this.taskService.getParentTaskList().subscribe(res=>this.parentTaskList=res);
  }

  get form(){
    return this.taskForm.controls;
  }

  FillProj(filterVal:any){    

      this.taskForm.setValue({
        ProjectName : filterVal, options: {
          onlySelf: true}});  
 
  }

  FillUser(filterVal:any){

    this.taskForm.setValue({
        User : filterVal, options: {
        onlySelf: true}});
  }

  FillParenTask(filterVal:any){

    this.taskForm.setValue({
      ParentTask :filterVal, options: {
        onlySelf: true}});    
  }

  onAdd(){

    this.submitted = true;    

    if(this.taskForm.invalid){
      return;
    }

    this.taskService.addTask(this.taskForm.value)
      .pipe(first())
      .subscribe(
        data=>{
          alert("successfully added");
          this.router.navigate(['app-task']);
        },
        (error:HttpErrorResponse)=>{        
          alert(error.message);
        }        
      );
    }

    onCancel(){

      this.taskForm = this.formBuilder.group({
        ProjectName : '',
        TaskName:'',
        ParentTask:'',
        Priority:0,
        StartDate:new Date(),
        EndDate:new Date(),
        User:''
      });

     this.router.navigate(['app-add-task']);      
    }

  
 
  

}
