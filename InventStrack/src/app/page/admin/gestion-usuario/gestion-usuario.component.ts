import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-gestion-usuario',
  templateUrl: './gestion-usuario.component.html',
  styleUrls: ['./gestion-usuario.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    NgFor
  ]
})
export class GestionUsuarioComponent  implements OnInit {

  usuarios: any[] = [];
  nuevoUsuario = { email: '', password: '' };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cargarUsuarios();
  }

  async cargarUsuarios() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (!error) this.usuarios = data || [];
  }

  async crearUsuario() {
    const { error } = await supabase.auth.signUp({
      email: this.nuevoUsuario.email,
      password: this.nuevoUsuario.password
    });
    if (!error) {
      await this.cargarUsuarios();
      this.mostrarToast('Usuario creado exitosamente');
      this.nuevoUsuario = { email: '', password: '' };
    } else {
      this.mostrarToast('Error al crear usuario');
    }
  }

  async eliminarUsuario(usuarioId: string) {
    const { error } = await supabase.from('usuarios').delete().eq('id', usuarioId);
    if (!error) {
      await this.cargarUsuarios();
      this.mostrarToast('Usuario eliminado');
    } else {
      this.mostrarToast('Error al eliminar usuario');
    }
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }

  async actualizarUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Actualizar Usuario',
      inputs: [
        { name: 'email', type: 'email', value: usuario.email, placeholder: 'Correo' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: async (data) => {
            const { error } = await supabase
              .from('usuarios')
              .update({ email: data.email })
              .eq('id', usuario.id);
            if (!error) {
              this.mostrarToast('Usuario actualizado');
              await this.cargarUsuarios();
            } else {
              this.mostrarToast('Error al actualizar usuario');
            }
          }
        }
      ]
    });
    await alert.present();
  }
}
