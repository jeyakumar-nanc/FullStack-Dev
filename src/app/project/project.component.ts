import { Component, OnInit } from '@angular/core';
import { ProjectService } from './project.service';
import { Router } from '@angular/router';
import { Project } from '../shared/project.model';
import { error } from 'protractor';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {

  projList : Project[];
  sortBy : string = "ProjectName";
  


  constructor(private projService:ProjectService, private router:Router) {

    this.projService.getProjectList()
        .subscribe(res=>{
          this.projList=res,
          (error:HttpErrorResponse)=>{        
            alert(error.message);
          }        
        });
   }

  ngOnInit() {
    
  }

  onEdit(proj:Project){
    this.projService.editProj.emit(proj);
  }

  onSort(sortValue){    
    this.projList.reverse();
  }

}
