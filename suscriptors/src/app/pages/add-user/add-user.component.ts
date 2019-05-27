import { Component, OnInit } from '@angular/core';
import { MailsService } from 'src/app/services/mails/mails.service';
import { Router } from '@angular/router';
import { ItemDataMail, StatusText } from 'src/app/services/mails/mails.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  data = {status: 0};
  statusOptions = StatusText;

  constructor(
    private mailService: MailsService,
    private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.mailService.addMail(<ItemDataMail>this.data)
      .subscribe(obj => {
        if (!!obj ) {
          this.mailService.reset();
          this.onCancel();
        } else {
          alert('no creado');
        }
      });
  }
  onCancel() {
    this.router.navigate(['/']);
  }

}
