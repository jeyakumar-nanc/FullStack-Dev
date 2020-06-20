import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './user/user.service';
import { AddUserComponent } from './user/add-user/add-user.component';
import { TaskComponent } from './task/task.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './project/project.service';
import { TaskService } from './task/task.service';
import { EditTaskComponent } from './task/edit-task/edit-task.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    EditUserComponent,
    AddUserComponent,
    TaskComponent,
    AddTaskComponent,
    AddProjectComponent,
    EditProjectComponent,
    ProjectComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [UserService,ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
