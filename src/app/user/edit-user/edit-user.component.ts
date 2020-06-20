import { Component, AfterContentInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm} from '@angular/forms';  
import { User } from 'src/app/shared/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements AfterContentInit{
  
  submitted:boolean= false;
  userId:number;
  selectedUser:User;
  
  userForm = new FormGroup({
    FirstName : new FormControl(['',Validators.required]),
    LastName:new FormControl(['',Validators.required]),   
    EmployeeId:new FormControl(['',Validators.required])
  });

  constructor(private formBuilder:FormBuilder, 
    private userService: UserService, 
    private activeRoute:ActivatedRoute,
    private router:Router) {

    this.activeRoute.queryParams.subscribe(param=>{
      this.userId=param.usr

      this.userService.getUserbyId(this.userId)
                      .subscribe(res=>this.setValue(this.selectedUser=res));
      });    
   }

   ngAfterContentInit(): void {
   
    this.userForm = this.formBuilder.group({
      FirstName : ['',Validators.required],
      LastName:['',Validators.required],      
      EmployeeId:['',Validators.required],
      UserId:[0],
      ProjectId:[0]
    });

  }

  setValue(userVal:User) {    
    this.userForm.setValue({
      FirstName : userVal.FirstName,
      LastName:userVal.LastName,
      EmployeeId:userVal.EmployeeId,
      UserId : userVal.UserId,
      ProjectId : userVal.ProjectId
    });
  }

  get form(){return this.userForm.controls;}
   
  onSubmit(){
    
    this.submitted=true;
        
    this.userService.updateUser(this.userForm.value)
          .pipe(first())
          .subscribe(data=>{
            alert('Successfully updated!');
            this.router.navigate(['app-user']);
          },
          (error:HttpErrorResponse)=>{        
            alert(error.message);
          }
    );
  }

  onCancel(){
    this.router.navigate(['app-user']);
  }


}
