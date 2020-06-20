import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/shared/project.model';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projForm : FormGroup;
  submitted: boolean = false;
  selectedProjectId : number;

  constructor(private formBuilder:FormBuilder, 
    private projService:ProjectService,
    private router:Router) { 
    
    
  }

  ngOnInit() {   

    this.projForm = this.formBuilder.group(
      {
        ProjectName:['',Validators.required],
        StartDate:[''],
        EndDate:[''],
        Priority:['',Validators.required]
      }
    );
    
    
    //subscribe to the event listener to know which project for selected
    this.projService.editProj.subscribe(
      (selectedProj:Project)=> {
        this.selectedProjectId=selectedProj.ProjectId
       
        if(this.selectedProjectId!=null){
          this.router.navigate(['app-edit-project'],{
            queryParams: {
              projId:this.selectedProjectId
            }
          });
        }
      }
    );

    
  }

  get form(){
    return this.projForm.controls;
  }

  onCheckboxChange(e){
    
    if(e.target.checked){
      this.projForm.get('StartDate').enable();          
      this.projForm.get('StartDate').setValidators(Validators.required);
      this.projForm.get('StartDate').updateValueAndValidity();
      this.projForm.get('EndDate').enable(); 
      this.projForm.get('EndDate').setValidators(Validators.required);
      this.projForm.get('EndDate').updateValueAndValidity();
    }
    else{
      this.projForm.get('StartDate').disable();                     
      this.projForm.get('EndDate').disable(); 
    }
  }

  onAdd(){
    this.submitted = true;

    this.projForm.value;

    if(this.projForm.invalid) {
      return;
    }
    else{
      this.projService.addProject(this.projForm.value)
      .pipe(first())
      .subscribe(
        data=>
      {
        alert('Successfull');
        this.router.navigate(["app-add-project"]);
      },
      (error:HttpErrorResponse)=>{        
        alert(error.message);
      });
    }
  }

  onCancel(e){

    console.log(e);
    this.onCheckboxChange(e);

    this.projForm =  this.formBuilder.group({
      ProjectName:'',
      StartDate:'',
      EndDate:'',
      Priority:0,
    });
  }


}
