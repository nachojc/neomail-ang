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
  dropdownList = [];
  selectedItems = [];
  resultsList: string[];
  private originList: object[];

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
      this.loadLists();
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
  }
  handleDropdown(event) {
    console.log(event);
  }
  private loadMail() {
    this.mailService.getMail(this._id)
    .pipe(first())
    .subscribe(mail => {
      this.data = mail;
    });
  }
  private loadLists() {
    this.listService.getLists().subscribe((lists: any[]) => {
      if (lists.length) {
        this.resultsList = lists;
        // this.originList = lists;
        // this.resultsList = lists.map( e => e.name);
        console.log(this.resultsList);
      }
    });

  }
}
