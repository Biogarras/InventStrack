import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombreUsuario: string = ""; // Cambiamos el campo a nombreUsuario
  password: string = ""; // Campo para la contraseña del usuario

  constructor(private _authService: AutentificacionService, private router: Router) { }

  ngOnInit() {}

  login() {
    // Validar que los campos no estén vacíos
    if (!this.nombreUsuario || !this.password) {
      console.error("Por favor, completa ambos campos.");
      return; // Salir de la función si hay campos vacíos
    }

    // Llamar al servicio de autenticación
    this._authService.autentificacion(this.nombreUsuario, this.password).subscribe({
      next: (isAuthenticated: boolean) => {
        if (isAuthenticated) { // Verificar que la autenticación fue exitosa
          console.info("Usuario autenticado");
          this.router.navigate(['dashboard'], {
            state: {
              usuario: this.nombreUsuario // Utilizar el nombre de usuario
            }
          });
        } else {
          console.error("Usuario no autenticado");
        }
      },
      error: (error) => {
        console.error("Error de autenticación", error);
      }
    });
  }

  forgotPassword() {
    // Aquí puedes manejar la lógica para "Olvidé mi contraseña"
    console.log('Olvidé mi contraseña');
  }
}