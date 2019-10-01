import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './pages/main/main.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from './components/table/table.module';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { EnumToArrayPipe } from './pipes/enumToArray';
import { FormsModule } from '@angular/forms';
import { NeoSelectModule } from 'libs/neo-lib/src/components/select/select.module';
import { NeoSelectComponent } from 'libs/neo-lib/src/components/select/select.component';


import {AutoCompleteModule} from 'primeng/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserComponent,
    EditUserComponent,
    SearchComponent,
    EnumToArrayPipe,
    NeoSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AutoCompleteModule,

    TableModule,
    // NeoSelectModule
  ],
  bootstrap: [AppComponent],
  providers: [
    // appRoutingProviders,
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule { }
