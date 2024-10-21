import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-gestion-inventario',
  templateUrl: './gestion-inventario.component.html',
  styleUrls: ['./gestion-inventario.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    IonicModule,
    FormsModule,
    CommonModule
  ]
})
export class GestionInventarioComponent implements OnInit {
  inventarios: any[] = [];
  tiendas: any[] = [];
  nuevoInventario = { tienda_id: '', fecha_creacion: '', estado: 'pendiente' };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    const { data } = await supabase.from('inventarios').select('*');
    this.inventarios = data || [];
  }

  async cargarInventarios() {
    const { data } = await supabase.from('inventarios').select('*');
    this.inventarios = data || [];
  }

  async cargarTiendas() {
    const { data } = await supabase.from('tiendas').select('id, nombre');
    this.tiendas = data || [];
  }

  async crearInventario() {
    const { error } = await supabase.from('inventarios').insert([this.nuevoInventario]);
    if (!error) {
      this.mostrarToast('Inventario creado');
      await this.cargarInventarios();
      this.nuevoInventario = { tienda_id: '', fecha_creacion: '', estado: 'pendiente' };
    }
  }

  async eliminarInventario(id: string) {
    const { error } = await supabase.from('inventarios').delete().eq('id', id);
    if (!error) {
      this.mostrarToast('Inventario eliminado');
      await this.cargarInventarios();
    }
  }

  async actualizarEstado(inventario: any) {
    const alert = await this.alertController.create({
      header: 'Actualizar Estado',
      inputs: [
        { type: 'radio', label: 'Pendiente', value: 'pendiente', checked: inventario.estado === 'pendiente' },
        { type: 'radio', label: 'Creado', value: 'creado', checked: inventario.estado === 'creado' },
        { type: 'radio', label: 'Finalizado', value: 'finalizado', checked: inventario.estado === 'finalizado' },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Actualizar',
          handler: async (estado) => {
            const { error } = await supabase.from('inventarios').update({ estado }).eq('id', inventario.id);
            if (!error) {
              this.mostrarToast('Estado actualizado');
              await this.cargarInventarios();
            }
          }
        }
      ]
    });
    await alert.present();
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