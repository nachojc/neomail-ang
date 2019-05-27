import { OnInit, Component } from '@angular/core';

import { ItemDataMail, StatusText } from 'src/app/services/mails/mails.model';
import { MailsService } from 'src/app/services/mails/mails.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'neo-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  statusOptions = StatusText;

  data: ItemDataMail;
  private _id: string;
  constructor(
    private mailService: MailsService,
    private router: Router,
    private route: ActivatedRoute
    ) {
   }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this._id = params.get('id');
      this.loadMail();
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

  private loadMail() {
    this.mailService.getMail(this._id)
    .pipe(first())
    .subscribe(mail => {
      this.data = mail;
    });
  }
}
