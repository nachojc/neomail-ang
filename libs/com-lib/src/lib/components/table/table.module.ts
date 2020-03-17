
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header/table-header.component';
import { TableNavComponent } from './table-nav/table-nav.component';




@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableComponent,
    TableNavComponent
  ],
  providers: [
  ],
})
export class TableModule {}
