import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { IonicModule } from '@ionic/angular'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[
    CommonModule,
    IonicModule,
    FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  async login() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    if (error) {
      this.errorMessage = 'Error al iniciar sesión: ' + error.message;
    } else {
      console.log('Inicio de sesión exitoso:', data);
      this.router.navigate(['/inventario']); // Redirigir a inventario
    }
  }
}