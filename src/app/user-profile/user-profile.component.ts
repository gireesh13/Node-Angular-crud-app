import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service"
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  currentUser:any;
  constructor(private authService: AuthService, private actRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUserDetail()
  }
  getUserDetail(){
    let id =  this.actRoute.snapshot.paramMap.get('id');
    this.authService.getUserProfile(id).subscribe((res:any)=>{
      if (res.result) {
        this.currentUser = res.result;
        return  this.currentUser;
      }
    });
  }  
}
