import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { GoogleChartsModule } from 'angular-google-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactDetailsComponent } from './pages/Contact-details/Contact-details.component';
import { ContactEditComponent } from './pages/Contact-edit/Contact-edit.component';
import { ContactComponent } from './pages/Contact/Contact.component';
import { ContactFilterComponent } from './cmps/Contact-filter/Contact-filter.component';
import { ContactListComponent } from './cmps/Contact-list/Contact-list.component';
import { ContactPreviewComponent } from './cmps/Contact-preview/Contact-preview.component';
import { InputComponent } from './cmps/Input/Input.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HeaderComponent } from './cmps/header/header.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { ChartComponent } from './cmps/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactComponent,
    ContactFilterComponent,
    ContactListComponent,
    ContactPreviewComponent,
    InputComponent,
    HomepageComponent,
    HeaderComponent,
    StatisticsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GoogleChartsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
