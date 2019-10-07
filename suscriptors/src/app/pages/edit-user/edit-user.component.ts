import { OnInit, Component } from '@angular/core';

import { ItemDataMail, StatusText } from 'src/app/services/mails/mails.model';
import { MailsService } from 'src/app/services/mails/mails.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ListsService } from 'src/app/services/lists/lists.service';


@Component({
  selector: 'neo-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  statusOptions = StatusText;
  listValue;
  dropdownList = [];
  selectedItems = [];
  resultsList = [
    {id: '8', name: 'Carlos Matias'},
    {id: '6', name: 'ignacio'},
    {id: '1', name: 'mio'},
    {id: '4', name: 'mononn ikni en casa'},
    {id: '7', name: 'test'},
    {id: '3', name: 'trea'}];
  // private originList: object[];

  data: ItemDataMail;
  private _id: string;
  constructor(
    private mailService: MailsService,
    private listService: ListsService,
    private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.loadMail();
      // this.loadLists();
    });
  }

  onSubmit() {
    this.mailService.updateMail(this.data)
      .subscribe(obj => {
        !!obj ? this.onCancel() : alert('no actualizado');
      });
  }
  onCancel() {
    this.router.navigate(['/']);
  }

  searchLists(index) {
    // console.log(index);
    this.loadLists();
  }
  handleDropdown(event) {
    this.loadLists(event.query);
  }
  private loadMail() {
    this.mailService.getMail(this._id)
    .pipe(first())
    .subscribe(mail => {
      this.data = mail;
    });
  }
  private loadLists(textToFilter?: string) {
    this.listService.getLists().subscribe((lists: any[]) => {
      if (lists.length) {
        debugger;
        this.resultsList = lists.map(e => e.name);
        // this.originList = lists;
        // this.resultsList = lists.map( e => e.name);
        console.log(this.resultsList);
      }
    });

  }
}
