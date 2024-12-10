import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.page.html',
  styleUrls: ['./gestion-usuario.page.scss'],
})
export class GestionUsuarioPage implements OnInit {

  constructor( private router: Router,private navCtrl:NavController) { }

  ngOnInit() {
  }

  crearUsuario() {
    this.navCtrl.navigateRoot(['gestion-usuario/crear-usuario']);
  }

  goBack() {
    this.navCtrl.navigateRoot(['inicio']);  // Ajusta la ruta según la página que quieras
  }


}
