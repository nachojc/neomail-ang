import { Component, SecurityContext, Output, EventEmitter, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ListsService } from 'src/app/services/lists/lists.service';
import { first} from 'rxjs/operators';
import { ItemDataList } from 'src/app/models/list.model';

@Component({
  selector: 'neo-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: [
    './edit-list.component.scss',
    // '../../../../libs/neo-lib/src/styles/input/input.scss'
  ]
})
export class EditListComponent {
  @Output() close = new EventEmitter();
  @Input() set value(val) {
    if (val.hasOwnProperty('name') && val.hasOwnProperty('description')){
      this.dto = val;
    }
  }
  dto: ItemDataList;
  constructor(private sanitizer: DomSanitizer, private lists: ListsService) { }

  sendValues() {
    this.dto.name = this.sanitizer.sanitize(SecurityContext.HTML, this.dto.name);
    this.dto.description = this.sanitizer.sanitize(SecurityContext.HTML, this.dto.description);

    if ( this.isValid()) {
      this.lists.updateItem(this.dto)
        .pipe(first())
        .subscribe(id => {
          this.close.emit( this.dto.id );
        });
    }
  }
  closeModal() {
    this.close.emit(false);
  }
  isValid(): boolean {
    return this.isValidName() && this.isValidDescription();
  }
  private isValidName(): boolean {
    return this.dto.name.length > 0;
  }
  private isValidDescription(): boolean {
    return this.dto.description.length > 0;
  }
}
