import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './pages/main/main.component';
import { AddListComponent } from './components/add-list/add-list.component';
import { TableComponent } from './components/table/table.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from 'libs/neo-lib/src/components/modal/modal.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableNavComponent } from './components/table-nav/table-nav.component';
import { EditListComponent } from './components/edit-list/edit-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddListComponent,
    EditListComponent,
    TableComponent,
    TableRowComponent,
    ModalComponent,
    TableHeaderComponent,
    TableNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [
    // appRoutingProviders,
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule { }
