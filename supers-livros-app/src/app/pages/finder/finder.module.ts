import { NgxPaginationModule } from 'ngx-pagination';
import { FinderComponent } from './finder.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinderRoutingModule } from './finder-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FinderComponent
  ],
  imports: [
    CommonModule,
    FinderRoutingModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class FinderModule { }
