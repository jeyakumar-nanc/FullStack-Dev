import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';
import { Project } from 'src/app/shared/project.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { HttpErrorResponse } from '@angular/common/http';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements AfterContentInit {

  submitted: boolean = false;  
  projectidSelected : number;
  projectSelected : Project;

  projForm = new FormGroup({
    ProjectName : new FormControl(['',Validators.required]),    
    Priority:new FormControl([0, Validators.min(1)]),
    StartDate:new FormControl(['',Validators.required]),
    EndDate:new FormControl(['',Validators.required]),
    Status: new FormControl([''])
  });
  
  constructor(
    private formBuilder:FormBuilder,
    private projService:ProjectService,
    private router:Router,
    private activeRoute:ActivatedRoute) {

    this.activeRoute.queryParams.subscribe(param=>{
      this.projectidSelected=param.projId

      this.projService.getProjectbyId(this.projectidSelected)
                      .subscribe(
                        res=>this.setValue(this.projectSelected=res),
                        (error:HttpErrorResponse)=>{        
                          alert(error.message);
                        }
                        );
    });
   }

   ngAfterContentInit() {
    this.projForm = this.formBuilder.group({
      ProjectName : ['',Validators.required],      
      Priority:[0, Validators.min(1)],
      StartDate:['',Validators.required],
      EndDate:['',Validators.required],
      ProjectId:[0],
      Status:['Not Started']
    });
  }

  get form(){return this.projForm.controls;}

  setValue(projSelected: Project) {

    this.projForm.setValue(
      {
        ProjectName : projSelected.ProjectName,       
        Priority:projSelected.Priority,
        StartDate:formatDate(projSelected.StartDate,'M/d/yy', 'en-US'),
        EndDate:formatDate(projSelected.EndDate,'M/d/yy', 'en-US'),
        ProjectId:projSelected.ProjectId,
        Status: projSelected.Status     
      }
    );
    
  }

  onUpdate(){
    this.submitted = true;

    if(this.projForm.invalid){
      return;
    }

    this.projService.updateProj(this.projForm.value)
      .pipe(first())
      .subscribe(data=>{
          console.log(data);
          alert('Successfully updated!');
          this.router.navigate(['app-add-project']);
        },
        (error:HttpErrorResponse)=>{        
        alert(error.message);
        }
      );
  }

  onCancel(){
    this.router.navigate(['app-add-project']);
  }
}
