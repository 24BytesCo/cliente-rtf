import { Component, OnInit } from '@angular/core';

import * as router from '@angular/router';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { ServiceLoginService } from './services/ServiceLogin.service';
import { environment } from '../../../../../environments/environment.prod';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: any;
  usuario: string = '';
  contrasena: string = '';
  constructor(
    private router: router.Router,
    private route: router.ActivatedRoute,
    private genericService: ServiceGenericService,
    private serviceLogin: ServiceLoginService
  ) {
    //verificando si tiene token
    var tokenLocal = localStorage.getItem(environment.token);
    if (tokenLocal) {
      this.genericService.redireccionarRutaToken(
        'tablero-principal',
        tokenLocal
      );
    } else {
      this.router.navigate(['auth/login']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
  }

  onLoggedin() {
    if (!this.usuario) {
      this.genericService.alertaSuperiorDerechaPequena(
        'El usuario es requerido',
        'error'
      );
      return;
    }

    if (!this.contrasena) {
      this.genericService.alertaSuperiorDerechaPequena(
        'La contraseña es requerida',
        'error'
      );
      return;
    }

    this.serviceLogin
      .login(this.usuario.trim(), this.contrasena.trim())
      .subscribe((r) => {
        //Seteando el token el local storage
        if (r.body.length > 20) {
          this.genericService.alertaSuperiorDerechaPequena(
            'Logueo exitoso',
            'success'
          );
          localStorage.setItem(environment.token, r.body);
          //redireccionando segun el tipo de usuario
          this.genericService.redireccionarRutaToken(
            'tablero-principal',
            r.body
          );
        }
      });

    // if (localStorage.getItem('isLoggedin')) {
    //   this.router.navigate([this.returnUrl]);
    // }
  }
}
