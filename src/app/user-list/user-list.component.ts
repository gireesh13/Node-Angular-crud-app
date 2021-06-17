import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList:any
  constructor(private authservice : AuthService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.authservice.getAllUsers().subscribe((res:any)=>{
      console.log("res");
      console.log(res)
      if (res.result) {
        this.userList = res.result;
        
        return  this.userList;
      }
    });
  }
  logout(){
    this.authservice.doLogout();
  }

}
