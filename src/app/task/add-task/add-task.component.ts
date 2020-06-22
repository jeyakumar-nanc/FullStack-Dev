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
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  public taskForm : any;
  public submitted: boolean = false;
  checked:boolean = false;

  projList : Project[];
  userList : User[];
  parentTaskList :ParentTask[];
  taskDataSubmitted: Task;
  parentTask : ParentTask;

  constructor(private formBuilder:FormBuilder, 
    private taskService:TaskService, 
    private projService:ProjectService,
    private userService:UserService,
    private router:Router,) {

     
   }

  ngOnInit() {

    this.taskForm = this.formBuilder.group({
      ProjectId : [0,Validators.required],
      TaskName:['',Validators.required],
      ParentId:[0,Validators.required],
      Priority:['', Validators.required],
      StartDate:[formatDate(new Date(),'M/d/yy', 'en-US'),Validators.required],
      EndDate:[formatDate(new Date(),'M/d/yy', 'en-US'),Validators.required],
      UserId:[0,Validators.required]
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
    
    if(this.checked){          

      this.taskService.addParentTask(this.taskForm.value)
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
    else{
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
    
    }

    onCancel(){

      this.taskForm = this.formBuilder.group({
        ProjectName : '',
        TaskName:'',
        ParentTask:'',
        Priority:0,
        StartDate:formatDate(new Date(),'M/d/yy', 'en-US'),
        EndDate:formatDate(new Date(),'M/d/yy', 'en-US'),
        User:''
      });

     this.router.navigate(['app-add-task']);      
    }

    onCheckboxChange(e){
    
      if(e.target.checked){
        this.taskForm.get('StartDate').disable();                     
        this.taskForm.get('EndDate').disable(); 
        this.taskForm.get('Priority').disable(); 
        this.taskForm.get('ParentId').disable(); 
        this.taskForm.get('UserId').disable(); 
        this.taskForm.get('ProjectId').disable(); 
        
      }
      else{
        this.taskForm.get('StartDate').enable();          
        this.taskForm.get('StartDate').setValidators(Validators.required);
        this.taskForm.get('StartDate').updateValueAndValidity();
        this.taskForm.get('EndDate').enable(); 
        this.taskForm.get('EndDate').setValidators(Validators.required);
        this.taskForm.get('EndDate').updateValueAndValidity();
        this.taskForm.get('Priority').enable();  
        this.taskForm.get('Priority').setValidators(Validators.required);
        this.taskForm.get('Priority').updateValueAndValidity();
        this.taskForm.get('ParentId').enable();  
        this.taskForm.get('ParentId').setValidators(Validators.required);
        this.taskForm.get('ParentId').updateValueAndValidity();
        this.taskForm.get('UserId').enable();  
        this.taskForm.get('UserId').setValidators(Validators.required);
        this.taskForm.get('UserId').updateValueAndValidity();
        this.taskForm.get('ProjectId').enable();  
        this.taskForm.get('ProjectId').setValidators(Validators.required);
        this.taskForm.get('ProjectId').updateValueAndValidity();
      }
    }

  
 
  

}
