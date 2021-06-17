import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { AddLoanComponent } from './add-loan/add-loan.component';
import { EditLoanComponent } from './edit-loan/edit-loan.component';
import { ListLoanComponent } from './list-loan/list-loan.component';
import { ViewLoanComponent } from './view-loan/view-loan.component';


@NgModule({
  declarations: [
    LoansComponent,
    AddLoanComponent,
    EditLoanComponent,
    ListLoanComponent,
    ViewLoanComponent
  ],
  imports: [
    CommonModule,
    LoansRoutingModule
  ]
})
export class LoansModule { }
