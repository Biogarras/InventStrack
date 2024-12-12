import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Usuario } from 'src/app/models/Usuario/usuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { RolService } from 'src/app/services/rol/rol.service';
import { Router } from '@angular/router';
import { ModificarUsuario } from 'src/app/models/Usuario/modificarUsuario';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
})
export class VerUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  roles: any[] = [];// Mapeo de role_id a nombre del rol

  constructor(
    private usuariosService: UsuarioService,
    private rolService: RolService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cargarRoles(() => {
      this.cargarUsuarios();
    });
  }

  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe((response) => {
      if (response.body) {
        this.usuarios = response.body; // Cargamos usuarios directamente
        console.log('Usuarios cargados:', this.usuarios);
      }
    });
  }

  cargarRoles(callback: () => void) {
    this.rolService.buscarRol().subscribe((response) => {
      if (response.body) {
        response.body.forEach((rol: any) => {
          this.roles[rol.id] = rol.nombre;
        });
        console.log('Roles cargados:', this.roles);
      }
      callback(); // Llamar al callback una vez que los roles estén cargados
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-usuario']);
  }

  irAModificarUsuario(usuario: Usuario) {
    this.navCtrl.navigateRoot(['gestion-usuario/modificar-usuario'], {
      queryParams: { usuario: JSON.stringify(usuario) }
    });
  }
}