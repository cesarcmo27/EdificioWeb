import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion';
import { NewsComponent } from './components/news/news.component';
import { ContactComponent } from './components/contact/contact.component';
import { MantenimientoModule } from '../mantenimiento/mantenimiento.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    NewsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule, 
    MatButtonModule, 
    MatToolbarModule, MatSidenavModule,MatListModule,MatExpansionModule,MatBadgeModule,MatMenuModule,
    MantenimientoModule
  ]
})
export class AdminModule { }
