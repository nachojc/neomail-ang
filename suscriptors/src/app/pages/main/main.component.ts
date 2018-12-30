import { Component, OnInit, OnDestroy } from '@angular/core';
import { ListsService } from 'src/app/services/lists/lists.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dto = {
    header: [
      {name: 'Selector', sort: true, type: 'radio'},
      {name: 'Suscriptor', sort: true},
      {name: 'Estado', sort: true},
      {name: 'Listas', sort: false},
      {name: 'Suscrito en', sort: true},
      {name: 'Última modificación', sort: true},
  ],
    data: [{}]
  };



  constructor(private lists: ListsService) { }

  ngOnInit() {
  }


}
