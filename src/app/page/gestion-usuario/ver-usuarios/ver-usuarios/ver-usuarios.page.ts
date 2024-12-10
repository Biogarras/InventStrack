import { Component, OnInit } from '@angular/core';
import { RouterEvent } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
})
export class VerUsuariosPage implements OnInit {

  usuarios:Usuario [] = [];

  constructor(private usuariosService: UsuarioService,
              private router : Router,
              private navCtrl : NavController) { }
 

  ngOnInit() {

    this.cargarUsuarios()
  }

  cargarUsuarios(){
    this.usuariosService.obtenerUsuarios().subscribe(response => {
      if(response.body){
        this.usuarios = response.body;//Le asignamos la lista de usuarios al array usuarios..
      }
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-usuario']);  // Ajusta la ruta según la página que quieras
  }

}
