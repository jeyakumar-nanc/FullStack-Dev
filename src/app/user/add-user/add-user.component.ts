import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { first } from 'rxjs/internal/operators/first';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

   userForm : FormGroup;
   submitted: boolean = false;

  constructor(private formBuilder:FormBuilder, private userService:UserService,private router:Router) {

   }

  ngOnInit() {

    this.userForm = this.formBuilder.group(
      {
        FirstName:['',Validators.required],
        LastName: ['',Validators.required],
        EmployeeId: ['',Validators.required]
      }
    );
  }

  get form(){
    return this.userForm.controls;
  }

  addUser(){
    this.submitted = true;
    if(this.userForm.invalid) {
      return;
    }
    else {
      this.userService.addUser(this.userForm.value)
      .pipe(first())
      .subscribe(
        data=>{
          alert("successful");
        },
        (error:HttpErrorResponse)=>{        
          alert(error.message);
        }       
      );
    }
  }

  resetUser(){
    this.userForm = this.formBuilder.group({
      FirstName:'',
      LastName:'',
      EmployeeId:''
    });
  }

  viewUser(){
    this.router.navigate(['app-user']);
  }

}
