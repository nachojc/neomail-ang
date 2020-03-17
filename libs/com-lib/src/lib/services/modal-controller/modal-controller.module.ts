import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from './modal-controller.service';
import { OverlayController } from '../overlay-controller/overlay-controller.service';

@NgModule({
  providers: [
    OverlayController,
    ModalController,
  ],
  imports: [
    CommonModule,
    OverlayModule,
  ]
})
export class ModalControllerModule { }
