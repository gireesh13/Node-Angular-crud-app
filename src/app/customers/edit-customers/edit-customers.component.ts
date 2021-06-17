import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";
import { Router ,ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../services/customer.service'

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {
  oldImageStatus = true;
  imageUrl:string ="http://localhost:3000/uploads/" 
  oldImage:any
  submitted = false;
  imageURL: any;
  formData:any;
  showMessage=false;
  CustomerProfile:any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin'];
  customerForm = new FormGroup({
    image:new FormControl(null),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    designation: new FormControl('', [Validators.required]),
    mobile_number:new FormControl('', [Validators.required]),
    acceptTerms:new FormControl('',[Validators.required]),
    gender:new FormControl(null),
  });
  constructor(public router: Router,private customerService :CustomerService, private actRoute: ActivatedRoute,public fb: FormBuilder, ) { }
  

  ngOnInit(): void {
    this.formData = this.customerForm.controls
    this.getCustomer()
 
  }

  getCustomer(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.customerService.getCustomerDetail(id).subscribe(data => {
      this.oldImage = data.result['profile_image'],
      this.customerForm.setValue({
        image :  data.result['profile_image'],
        name: data.result['name'],
        email: data.result['email'],
        mobile_number: data.result.mobile_number,
        designation: data.result.designation,
        gender:data.result.gender,
        acceptTerms:(data.result.term_condition == 1) ? true : false
      });
    });

  }
  
  uploadFile(event:Event) {
    this.oldImageStatus = false
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
    this.submitted = true;
    if(!this.customerForm.value.name || !this.customerForm.value.email || !this.customerForm.value.designation || !this.customerForm.value.gender||!this.customerForm.value.mobile_number|| !this.customerForm.value.acceptTerms){
      return;
    }
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.customerService.updateCustomer(id,this.customerForm.value).subscribe((res:any) => {
      console.log(res)
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
