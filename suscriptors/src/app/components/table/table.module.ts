import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { TableComponent } from './table.component';
import { TableRowComponent } from './row/table-row.component';
import { TableHeaderComponent } from './header/table-header.component';






@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableRowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports:[
    TableComponent,
  ],
  providers: []
})
export class TableModule { }
