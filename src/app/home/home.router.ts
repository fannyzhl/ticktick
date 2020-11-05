import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
        {
            path:'dashboard',
            loadChildren: () => 
                import('../pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
        },
        {
            path:'calendar',
            loadChildren: () => 
                import('../pages/calendar/calendar.module').then(m => m.CalendarPageModule)
        },
        {
            path:'notifications',
            loadChildren: () => import('../pages/notifications/notification.module').then(m => m.NotificationPageModule)
        },
        {
            path:'settings',
            loadChildren: () => 
                import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
        },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class HomeRouter {}