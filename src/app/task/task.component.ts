import { Component, OnInit } from '@angular/core';
import { Task } from '../shared/task.model';
import { TaskService } from './task.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskList : Task[];
  taskData : Task;
  
  constructor(private taskService: TaskService,private router:Router) { }

  ngOnInit() {

    this.taskService.getTaskList()
                    .subscribe(res=>this.taskList=res);
  }

  editTask(taskId){
    this.router.navigate(['app-edit-task'],{
      queryParams: {
        id:taskId
      }
    });
  }

  endTask(task){
   
    //update the task status to complete
    this.taskService.endTask(task)
      .pipe(first())
      .subscribe(data=>{
          alert('Successfully updated!');
          this.router.navigate(['app-task']);
        },
      error=>{
        alert('Submission Failed');
        }
      );

  }

}
