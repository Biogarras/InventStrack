import { Component, OnInit, ViewChild} from '@angular/core';
import { IonModal,NumericValueAccessor } from '@ionic/angular';
import { Tienda } from 'src/app/models/tienda';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-lista-tiendas',
  templateUrl: './lista-tiendas.page.html',
  styleUrls: ['./lista-tiendas.page.scss'],
})
export class ListaTiendasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;


  mensaje = ""
  name = ""
  tiendas : Tienda[] = []

  nueva_tienda: Tienda = {

    id :null,
    nombre:"",
    ciudad:"",
    encargado:""
  }

  constructor( private _serviceTienda: TiendasService) { }

  ngOnInit() {
    this.tiendas = this._serviceTienda.obtener_tiendas();
    
  }

  cancelar(){
    this.modal.dismiss(null,'cancel');
   }

  agregarTienda( nuevatienda: Tienda){
    console.log(nuevatienda)
    this._serviceTienda.agregarNuevaTienda(nuevatienda);
    this.modal.dismiss(this.name, 'confirm')
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.mensaje = `Hello, ${ev.detail.data}!`;
    }
  }



}
