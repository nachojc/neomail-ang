import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

import { TableModule } from '@neo/common';
import { ListItemComponent } from '../../components/list-item/list-item.component';


@NgModule({
  declarations: [
    MainComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TableModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
  ]
})
export class MainModule {
}
