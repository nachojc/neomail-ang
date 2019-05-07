import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponent } from './pages/main/main.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from './components/table/table.module';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddUserComponent,

    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule
  ],
  bootstrap: [AppComponent],
  providers: [
    // appRoutingProviders,
    { provide: APP_BASE_HREF, useValue: '/' },
  ]
})
export class AppModule { }
