import { NgModule} from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';


import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';

import { TableModule } from '@neo/common';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { AddListComponent } from '../../components/add-list/add-list.component';
import { DialogComponent } from '@neo/common';


@NgModule({
  declarations: [
    MainComponent,
    ListItemComponent,
    DialogComponent,
    AddListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    TableModule,
    
  ],
  exports: [
    MainComponent
  ],
  providers: [
  ],
  entryComponents: [
    DialogComponent,
    AddListComponent
  ]
})
export class MainModule {
}
