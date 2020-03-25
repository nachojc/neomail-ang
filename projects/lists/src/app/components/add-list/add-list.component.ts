import { Component} from '@angular/core';

import { ModalOverlayRef } from '@neo/common';
let index = 1;
@Component({
  selector: 'neo-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
})
export class AddListComponent {

  dto = {name: null, description: null};
  textTitle = "Add list";
  constructor(
    public viewRef: ModalOverlayRef,
    ) {
      if (viewRef.data.data ) {
        this.textTitle = "Edit list";
        this.dto = viewRef.data.data;

      }
  }

  close() {
      this.viewRef.close();
  }
  send(){
    if (this.isValid() ){
      this.viewRef.close(this.dto);
    }
  }
  isValid(){
    return !!this.dto.name;
  }
}
