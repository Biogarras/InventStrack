import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ModificarUsuario } from 'src/app/models/Usuario/modificarUsuario';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {

  usuario: ModificarUsuario = {
    usuario_id:null,
    nombre: '' ,
    nombreUsuario: '',
    email: '',
    password: null,
    role_id: null
  };
  usuarioId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params ['usuario']){
        this.usuario = JSON.parse(params['usuario']);
      }
    });
    }
    actualizarUsuario(){
      this.usuarioService.actualizarUsuario(this.usuario).subscribe(response => {
        console.log('Usuario actualizado:', response.body);
        this.presentToast('Usuario modificado exitosamente');
        this.navCtrl.navigateBack(['gestion-usuario/ver-usuarios']);
      }, error => {
        console.error('Error al actualizar el usuario:', error);
        this.presentToast('Error al modificar el usuario', 'danger');
      });
    }

    async presentToast(message: string, color: string = 'success') {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000, // Tiempo que se mostrará (en milisegundos)
        color: color,  // Color del Toast (success, danger, etc.)
        position: 'top',
        cssClass: 'custom-toast', // Posición del Toast (top, middle, bottom)
      });
      await toast.present();
    }



  }
