import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AdminComponent   {

  constructor(private router: Router) { }

  goTo(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }
}
