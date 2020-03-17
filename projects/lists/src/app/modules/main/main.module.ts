import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

import { TableModule, ModalControllerModule } from '@neo/common';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { AddListComponent } from '../../components/add-list/add-list.component';


@NgModule({
  declarations: [
    MainComponent,
    ListItemComponent,
    AddListComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    TableModule,
    ModalControllerModule
  ],
  exports: [
    MainComponent
  ],
  providers: [
  ],
  entryComponents: [
    AddListComponent
  ]
})
export class MainModule {
}
