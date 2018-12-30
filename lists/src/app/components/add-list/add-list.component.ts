import { Component, SecurityContext, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ListsService } from 'src/app/services/lists/lists.service';
import { first} from 'rxjs/operators';


@Component({
  selector: 'neo-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: [
    './add-list.component.scss',
    '../../../../libs/neo-lib/src/styles/input/input.scss'
  ]
})
export class AddListComponent {
  @Output() close = new EventEmitter();
  dto = {name: '', description: ''};
  constructor(private sanitizer: DomSanitizer, private lists: ListsService) { }

  sendValues() {
    this.dto.name = this.sanitizer.sanitize(SecurityContext.HTML, this.dto.name);
    this.dto.description = this.sanitizer.sanitize(SecurityContext.HTML, this.dto.description);

    if ( this.isValid()) {
      this.lists.addList(this.dto)
        .pipe(first())
        .subscribe(id => {
          this.close.emit( id );
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
