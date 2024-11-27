import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Inventario } from 'src/app/models/Inventario/inventario';
import { InventariosService } from 'src/app/services/inventarios/inventarios.service';

@Component({
  selector: 'app-ver-inventario',
  templateUrl: './ver-inventario.page.html',
  styleUrls: ['./ver-inventario.page.scss'],
})
export class VerInventarioPage implements OnInit {

  inventarios: Inventario [] = [];

  constructor( private inventariosServices: InventariosService, private router : Router, private navCtrl: NavController) { }

  ngOnInit(){
   this.cargarInventarios();
  }

  cargarInventarios(){
    this.inventariosServices.obtenerInventarios().subscribe(response =>{
      if (response.body){
        this.inventarios=response.body;
      }
    });
  }

  goBack() {
    this.navCtrl.navigateRoot(['gestion-inventario']);  // Ajusta la ruta según la página que quieras
  }

  
}


