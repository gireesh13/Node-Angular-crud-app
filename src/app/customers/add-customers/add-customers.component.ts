import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {CustomerService} from '../../services/customer.service'

@Component({
  selector: 'app-add-customers',
  templateUrl: './add-customers.component.html',
  styleUrls: ['./add-customers.component.css']
})
export class AddCustomersComponent implements OnInit {
  
  imageURL: any;
  formData:any;
  showMessage = false;
  submitted = false;
  CustomerProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin']
  customerForm = new FormGroup({
    image:new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    designation: new FormControl('', [Validators.required]),
    mobile_number:new FormControl('', [Validators.required]),
    acceptTerms:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    gender:new FormControl(null),
  });

  constructor(public router: Router,private customerService :CustomerService ) {}

  ngOnInit() { 
    this.formData = this.customerForm.controls
  }
  uploadFile(event:Event) {
   
    const target = (event.target as HTMLInputElement).files;
   
    if(target){
     
      const file =  target[0];
      this.customerForm.patchValue({
        image: file
      });
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
    
  }
  
  onSubmit() {
    console.log(this.customerForm.value);
   
    this.submitted =true;
  
    this.customerService.createCustomer(this.customerForm.value).subscribe((res:any) => {
    
      if (res.status) {
        this.showMessage = true
        setTimeout(()=>{
          this.showMessage = false;
          this.router.navigate(['customer']);
        },3000)
      }
    })
  }

}
