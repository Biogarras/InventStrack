import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { ToastController, LoadingController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  async login() {
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();

    const { error } = await supabase.auth.signInWithPassword({
      email: this.email,
      password: this.password,
    });

    loading.dismiss();

    if (error) {
      this.mostrarToast('Error: Credenciales incorrectas');
    } else {
      this.mostrarToast('Inicio de sesión exitoso');
      this.router.navigate(['/admin']);
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }
}