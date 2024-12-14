import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CrearUsuario } from 'src/app/models/Usuario/crearUsuario';
import { RolService } from 'src/app/services/rol/rol.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {

  nuevoUsuario: CrearUsuario={
    nombre: '',
    nombreUsuario:'',
    email: '',
    password:'',
    role_id:0
  };

  roles: any[] = [];

  constructor(private usuarioService: UsuarioService,
              private router : Router,
              private navCtrl:NavController , 
              private rolService:RolService) { }

  ngOnInit() {
    this.cargarRoles();
  }

  cargarRoles() {
  this.rolService.buscarRol().subscribe({
    next: (response) => {
      this.roles = response.body; // Asigna los roles obtenidos
      console.log('Roles cargados:', this.roles);
    },
    error: (error) => {
      console.error('Error al cargar roles:', error);
    }
  });
}

crearUsuario() {
  this.usuarioService.crearNuevoUsuario(this.nuevoUsuario).subscribe({
    next: (response) => {
      console.log('Usuario creado con éxito', response);
      alert('Usuario creado con éxito');
      
      // Limpiar el formulario
      this.nuevoUsuario = {
        nombre: '',
        nombreUsuario: '',
        email: '',
        password: '',
        role_id: 0
      };

      // Si quieres redirigir a la página de gestión de usuarios
      this.router.navigate(['/gestion-usuario']);
    },
    error: (error) => {
      console.error('Error al crear usuario', error);
      alert('Error al crear el usuario');
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  });
}
  goBack() {
    this.navCtrl.navigateRoot(['gestion-usuario']);  // Ajusta la ruta según la página que quieras
  }

}

