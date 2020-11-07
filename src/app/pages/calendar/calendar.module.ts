import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CalendarPageRoutingModule } from '../calendar/calendar-routing.module';
import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { CalendarPage } from './calendar.page';
registerLocaleData(localeEn, "en");
 
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    CalendarPageRoutingModule
  ],
  declarations: [CalendarPage],
  providers: [
    { provide: LOCALE_ID, useValue: 'En' }
  ]
})
export class CalendarPageModule {} 
