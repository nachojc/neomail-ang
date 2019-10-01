
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import { NeoSelectComponent } from './select.component';

@NgModule({
  imports: [
    CommonModule,
    NeoSelectComponent
  ],
  exports: [
    NeoSelectComponent
  ],
  declarations: [
  ],
  providers: [
  ],
})
export class NeoSelectModule {}
