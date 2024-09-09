import { Component, OnInit, ViewChild} from '@angular/core';
import { IonModal,NumericValueAccessor } from '@ionic/angular';
import { Tienda } from 'src/app/models/tienda';
import { TiendasService } from 'src/app/services/tiendas/tiendas.service';

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

    id :1,
    nombre:"",
    ciudad:"",
    encargado:""
  }

  constructor( private _serviceTienda: TiendasService) { }

  ngOnInit() {
    
  }

}
