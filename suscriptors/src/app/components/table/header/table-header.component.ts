import { Component, Input } from '@angular/core';
import { MailsService } from 'src/app/services/mails/mails.service';

@Component({
  selector: 'neo-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss']
})
export class TableHeaderComponent {
  @Input() data: any;

  constructor(private mails: MailsService) {}
  sortElement(field) {
  //   // this.mails.shortBy( field );
  }
}


// import { Component, Input } from '@angular/core';
// import { ListsService } from 'src/app/services/lists/lists.service';

// @Component({
//   selector: 'neo-table-header',
//   templateUrl: './table-header.component.html',
//   styleUrls: ['./table-header.component.scss']
// })
// export class TableHeaderComponent {
//   @Input() data: any;
//   constructor(private lists: ListsService) {}


//   sortElement(field) {
//     // this.lists.shortBy( field );
//   }

// }
