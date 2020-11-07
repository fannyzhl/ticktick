import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  componentes: Componente [] =[
    {
      name: "New Task",
      redirectTo: '/new-task'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

interface Componente {
  name: string;
  redirectTo: string;
}