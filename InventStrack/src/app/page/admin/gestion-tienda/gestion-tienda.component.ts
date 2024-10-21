import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-store-management',
  templateUrl: './gestion-tienda.component.html',
  styleUrls: ['./gestion-tienda.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class GestionTiendaComponent implements OnInit {
  tiendas: any[] = [];
  nuevaTienda = { nombre: '', direccion: '' };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cargarTiendas();
  }

  async cargarTiendas() {
    const { data } = await supabase.from('tiendas').select('*');
    this.tiendas = data || [];
  }

  async crearTienda() {
    const { error } = await supabase.from('tiendas').insert([this.nuevaTienda]);
    if (!error) {
      this.mostrarToast('Tienda creada');
      this.nuevaTienda = { nombre: '', direccion: '' };
      await this.cargarTiendas();
    }
  }

  async eliminarTienda(id: string) {
    const { error } = await supabase.from('tiendas').delete().eq('id', id);
    if (!error) {
      this.mostrarToast('Tienda eliminada');
      await this.cargarTiendas();
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
}

