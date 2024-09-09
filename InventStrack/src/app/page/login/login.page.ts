import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion/autenticacion.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor(private _authService: AutenticacionService, private router : Router) { }

  ngOnInit() {
  }

  login(username: string, password: string){
    if(this._authService.autentificacion(username,password)){
      console.info("Usuario Existe")
      this.router.navigate(['dashboard'], {
        state:{
          usuario: username
        }
      })
    }else{
      console.error("Usuario no existe")
    }
  }

}
