import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Contact } from 'src/models/contact.model';
import { ContactResolverService } from 'src/services/contact-resolver.service';
import { AuthGuard } from './guards/auth.guard';
import { ContactDetailsComponent } from './pages/Contact-details/Contact-details.component';
import { ContactEditComponent } from './pages/Contact-edit/Contact-edit.component';
import { ContactComponent } from './pages/Contact/Contact.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';

const routes: Routes = [
  { path: 'contact/edit/:id', component: ContactEditComponent, canActivate:[AuthGuard] , resolve:{contact:ContactResolverService} },
  { path: 'contact/edit', component: ContactEditComponent, canActivate:[AuthGuard] , resolve:{contact:ContactResolverService} },
  { path: 'contact/:id', component: ContactDetailsComponent, canActivate:[AuthGuard], resolve:{contact:ContactResolverService} },
  { path: 'contact', component: ContactComponent, canActivate:[AuthGuard] },
  { path: 'statistic', component: StatisticsComponent, canActivate:[AuthGuard] },
  { path: '', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
