import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autenticacion/autenticacion.service';
import { firstValueFrom } from 'rxjs';  

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nombreUsuario: string = ""; 
  password: string = ""; 

  constructor(private _authService: AutentificacionService, private router: Router) { }

  ngOnInit() {}

  async login() {
    // Validar que los campos no estén vacíos
    if (!this.nombreUsuario || !this.password) {
      console.error("Por favor, completa ambos campos.");
      return; // Salir de la función si hay campos vacíos
    }

    try {
      // Llamar al servicio de autenticación usando Supabase
      const isAuthenticated = await firstValueFrom(this._authService.autentificacion(this.nombreUsuario, this.password));
      
      if (isAuthenticated) {
        console.info("Usuario autenticado");
        // Redirigir al inicio si el login es exitoso
        this.router.navigate(['/inicio'], {
          state: {
            usuario: this.nombreUsuario // Pasar el nombre de usuario
          }
        });
        console.log("Nombre de usuario:", this.nombreUsuario);
      } else {
        console.error("Usuario no autenticado. Verifica tus credenciales.");
      }
    } catch (error) {
      console.error("Error durante el proceso de autenticación:", error);
    }
  }

  forgotPassword() {
    // Lógica para "Olvidé mi contraseña"
    console.log('Olvidé mi contraseña');
  }
}