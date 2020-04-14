import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { ModalOverlayRef } from '../../services/overlay-controller/overlay-ref';
import { DialogModalSizeEnum } from './dialog-size.enum';



@Component({
  selector: 'neo-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  host: {
    '[attr.small]': 'isSmall()',
    '[attr.large]': 'isLarge()'
  }
})
export class DialogComponent implements OnInit {
  contentType: 'template' | 'string' | 'component' = 'string';
  content: string | TemplateRef<any> | Type<any>;
  context;
  title: string;

  private _size: DialogModalSizeEnum = DialogModalSizeEnum.Medium;

  constructor(private ref: ModalOverlayRef) {
    if (!!ref.data ) {
      if (ref.data.hasOwnProperty('size')) {
        this._size = ref.data.size;
      }
      if (ref.data.hasOwnProperty('title')) {
        this.title = ref.data.title;
      }
    }
  }

  close() {
    this.ref.close(null);
  }

  ngOnInit() {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }
  isSmall(){
    return this._size = DialogModalSizeEnum.Small;
  }
  isLarge(){
    return this._size = DialogModalSizeEnum.Large;
  }
}
