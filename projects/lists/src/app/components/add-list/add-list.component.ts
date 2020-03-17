import { Component, Output, EventEmitter, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { SizeModal, OverlayControllerRef, OverlayParams } from '@neo/common';
let index = 1;
@Component({
  selector: 'neo-modal',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  host: {
    '[attr.id]' : 'modalId',
    '[class.open]': 'opened',
    'role': 'dialog'
  },
  // animations: [
  //   trigger('openClose', [
  //     state('open', style({
  //       opacity: 1
  //     })),
  //     state('closed', style({
  //       opacity: 0,
  //     })),
  //     transition('closed => open', [
  //       animate('0.5s')
  //     ]),
  //   ]),
  // ]
})
export class AddListComponent implements OnInit {

  constructor(
    public viewRef: OverlayControllerRef,
    public viewParams: OverlayParams,
  ) {
  }
  ngOnInit(): void {
    debugger;
  }

  // open(size?: Size): void {
  //   this.render.addClass(this.elem.nativeElement, size || this.size);
  //   this.opened = true;

  // }
  // close(): void {
  //   this.opened = false;
  //   this.closed.emit( this.opened );
  // }
  // cancel() {
  //   this.close();
  // }
  // isOpen() {
  //   return this.opened ? 'open' : 'closed';
  // }
  close() {
    this.viewRef.close('close');
  }
}
