import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddTaskComponent } from './task/add-task/add-task.component';
import { AddProjectComponent } from './project/add-project/add-project.component';
import { EditProjectComponent } from './project/edit-project/edit-project.component';
import { TaskComponent } from './task/task.component';
import { EditTaskComponent } from './task/edit-task/edit-task.component';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path:'add-user', component: AddUserComponent },
  { path:'app-user', component:UserComponent },
  { path:'app-edit-user', component:EditUserComponent },
  { path:'app-add-task', component:AddTaskComponent },
  { path:'app-add-project', component:AddProjectComponent},
  { path:'app-edit-project', component:EditProjectComponent},
  { path:'app-task', component:TaskComponent},
  { path:'app-edit-task', component:EditTaskComponent},
  { path:'app-root',component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
