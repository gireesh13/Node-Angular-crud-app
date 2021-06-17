import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service'
import { Router ,ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup,FormControl,Validators } from "@angular/forms";


@Component({
  selector: 'app-list-customers',
  templateUrl: './list-customers.component.html',
  styleUrls: ['./list-customers.component.css']
})
export class ListCustomersComponent implements OnInit {
  imageUrl:string ="http://localhost:3000/uploads/"
  searchByName="";
  page = 1;
  count=0;
  tableSize =3;
  showUpdateMsg=false
  formData:any;
  // tableSizes = [3, 6, 9, 12];
  customerList:any = [];
  showDeleteMsg = false;
  customerForm = new FormGroup({
    name: new FormControl(null),
  });

  constructor(private customerService:CustomerService,public router: Router) { }

  ngOnInit(): void {
    this.getCustomerList();
    this.formData = this.customerForm.controls
    
      $("#add-btn-data").on("click",()=>{
       
      })
    
      
    
  }

  getCustomerList(){
    this.customerService.getCustomers(this.searchByName,this.page,this.tableSize).subscribe((data:any)=>{
      this.count =  data.total_count;
      this.customerList = data.result;
      
      console.log(this.customerList);
    })
  }
  onTableDataChange(event:any){
    this.page = event;
    this.getCustomerList();
  }  
  removeCustomer(id:any){
    if(window.confirm('Are you sure?')) {
      this.customerService.deleteCustomer(id).subscribe((data) => {

        this.showDeleteMsg = true
        setTimeout(()=>{
          this.showDeleteMsg = false;
          this.getCustomerList();
          this.router.navigate(['customer']);
        },3000)
       
      }
    )    
  }
  }

  updateCustomerStatus(id:any){
    if(window.confirm('Are you sure?')) {
      this.customerService.updateStatus(id).subscribe((data) => {

        this.showUpdateMsg = true
        setTimeout(()=>{
          this.showUpdateMsg = false;
          this.getCustomerList();
          this.router.navigate(['customer']);
        },3000)
      })    
    }
  }
  onSubmit() {
    console.log(this.customerForm.value);
    if(this.customerForm.value.name != ""){
      this.searchByName = this.customerForm.value.name;
    }else{
      this.searchByName="";
    }
    this.getCustomerList();
  }
  

}
