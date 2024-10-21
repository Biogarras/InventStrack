import { Component, OnInit } from '@angular/core';
import { supabase } from 'src/app/services/supabase/supabase.client';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    IonicModule,
    FormsModule
  ]
})
export class GestionProductoComponent implements OnInit {
  productos: any[] = [];
  nuevoProducto = { nombre: '', tipo: '', precio: 0 };

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    await this.cargarProductos();
  }

  async cargarProductos() {
    const { data } = await supabase.from('productos').select('*');
    this.productos = data || [];
  }

  async crearProducto() {
    const { error } = await supabase.from('productos').insert([this.nuevoProducto]);
    if (!error) {
      this.mostrarToast('Producto creado');
      this.nuevoProducto = { nombre: '', tipo: '', precio: 0 };
      await this.cargarProductos();
    }
  }

  async eliminarProducto(id: string) {
    const { error } = await supabase.from('productos').delete().eq('id', id);
    if (!error) {
      this.mostrarToast('Producto eliminado');
      await this.cargarProductos();
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