import { Component, Output, EventEmitter, Input, Renderer2, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

import { Size } from './size.enum';
let index = 1;
@Component({
  selector: 'neo-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  host: {
    '[attr.id]' : 'modalId',
    '[class.open]': 'opened',
    'role': 'dialog'
  },
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1
      })),
      state('closed', style({
        opacity: 0,
      })),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ]
})
export class ModalComponent {
  @Input() modalId = 'modal-dialog' + index++;
  @Output() closed = new  EventEmitter<boolean>();

  opened = false;
  private size: Size = Size.Medium;

  constructor(
    private elem: ElementRef,
    private render: Renderer2
  ) {}

  open(size?: Size): void {
    this.render.addClass(this.elem.nativeElement, size || this.size);
    this.opened = true;

  }
  close(): void {
    this.opened = false;
    this.closed.emit( this.opened );
  }
  cancel() {
    this.close();
  }
  isOpen() {
    return this.opened ? 'open' : 'closed';
  }
}
