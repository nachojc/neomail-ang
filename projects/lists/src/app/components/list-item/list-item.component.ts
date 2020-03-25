import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Status, ItemDataList } from '@neo/common';
import { EventListItem, EventListItemType } from '../../models/event-list-item.model';

@Component({
  selector: 'neo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent  {
  @Input() 
  set value(val: ItemDataList){
    this._value = val; };
  get value(){ return this._value; };
  private _value: ItemDataList;


  @Input() status: Status;

  @Output() action: EventEmitter<EventListItem> 
    = new EventEmitter<EventListItem>();
  
  isActives() { return this.status === Status.Actives; }

  editItem() {this.action.emit({type: EventListItemType.edit, id: this._value.id}); }
  viewSubscriptors() {this.action.emit({type: EventListItemType.view, id: this._value.id}); }
  removeItem() {this.action.emit({type: EventListItemType.remove, id: this._value.id}); }
  reverteItem() {this.action.emit({type: EventListItemType.reverte, id: this._value.id}); }
  deleteItem() {this.action.emit({type: EventListItemType.delete, id: this._value.id}); }


}
