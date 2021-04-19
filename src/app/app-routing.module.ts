import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './pages/Contact-details/Contact-details.component';
import { ContactEditComponent } from './pages/Contact-edit/Contact-edit.component';
import { ContactComponent } from './pages/Contact/Contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'contact/edit/:id', component: ContactEditComponent },
  { path: 'contact/edit', component: ContactEditComponent },
  { path: 'contact/:id', component: ContactDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'statistic', component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
