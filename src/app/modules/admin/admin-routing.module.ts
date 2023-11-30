import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      { path: 'news', component: NewsComponent },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/admin/news', pathMatch: 'full' },
      {
        path: 'mantenimiento',
        loadChildren: () => import('../mantenimiento/mantenimiento.module').then((m) => m.MantenimientoModule)
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
