import { Component, OnInit, Input, Output } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userList : User[];
  
  
  constructor(private userService:UserService, private router:Router) { 
    
  }

  ngOnInit() {
    this.userService.getUserList()
                    .subscribe(res=>this.userList=res);

  }

  editUser(id){
    this.router.navigate(['app-edit-user'],{queryParams: {usr:id}});   
  }

  deleteUser(id){    
    this.userService.deleteUser(id).subscribe(res=>this.userList=res);
  }

}
