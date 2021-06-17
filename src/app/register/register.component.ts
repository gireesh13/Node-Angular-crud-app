import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import {AuthService} from "../services/auth.service"
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  imgFile ="";
  formData:any;
  signupForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    imgSrc: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  constructor(private authservice:AuthService,public router: Router) {}

  ngOnInit() { 
    this.formData = this.signupForm.controls
  }

  onImageChange(e:any) {
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.signupForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
  }
   
  

  registerUser() {
    console.log("this.signupForm.value");
    console.log(this.signupForm.value);
    this.authservice.sigunpUser(this.signupForm.value).subscribe((res:any) => {
      if (res.result) {
        this.router.navigate(['login']);
      }
    })
  }

}
