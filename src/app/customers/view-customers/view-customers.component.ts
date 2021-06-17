import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import {CustomerService} from '../../services/customer.service'

@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.css']
})
export class ViewCustomersComponent implements OnInit {
  imageUrl:string ="http://localhost:3000/uploads/" 
  constructor(public router: Router,private customerService :CustomerService, private actRoute: ActivatedRoute) { }
  customerDetail:any
  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer(){
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.customerService.getCustomerDetail(id).subscribe(data => {
      this.customerDetail = data.result
    });

  }

}
