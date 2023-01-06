import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import {
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';

import {
  RespuestaLogin,
  RespuestaGeneral,
} from '../views/pages/auth/login/model/Login';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoaderService } from './loader.service';
import { EquipoInner } from './GenericaInterfaz';
import {
  UsuarioToken,
  TipoEquipo,
  CategoriaEquipo,
  Equipo,
} from './GenericaInterfaz';
@Injectable({
  providedIn: 'root',
})
export class ServiceGenericService {
  private horaServer: Date;
  public cerrarSesion: boolean = false;

  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loader: LoaderService
  ) {
    // Spinner for lazyload modules
  }

  alertaSuperiorDerechaPequena(mensaje: string, tipo: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (tipo != 'success') {
      Toast.fire({
        icon: 'error',
        title: mensaje,
      });
      return;
    }

    Toast.fire({
      icon: 'success',
      title: mensaje,
    });
  }

  redireccionarRutaToken(nombreRuta: string, token: string) {
    switch (nombreRuta) {
      case 'tablero-principal':
        this.redirrecionTableroPrincipal(token);

        break;

      case 'tablero-principal-ws':
        break;

      default:
        // this.redirrecionTableroPrincipal(token);

        break;
    }
  }

  redirrecionTableroPrincipal(token: string) {
    this.validandoTokenObteniendoValores(token).subscribe(
      (res: RespuestaGeneral<UsuarioToken>) => {
        const tUsuario = res.body.tUsuario;
        res.body.tUsuario = '';
        localStorage.setItem(
          environment.datosUsuario,
          JSON.stringify(res.body)
        );

        switch (tUsuario) {
          case 'ADMINRTF':
            console.log('ADMIN RTF');

            this.router.navigate(['/dashboard']);

            break;

          default:
            break;
        }
      }
    );
  }

  validandoTokenObteniendoValores(token: string) {
    this.consultandoHoraServidor().subscribe((res: RespuestaGeneral<Date>) => {
      this.horaServer = res.body;
    });

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http
      .get<RespuestaGeneral<UsuarioToken>>(
        `${environment.urlApi}autenticacion/verificar`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          this.loader.hide();

          setTimeout(() => {
            if (
              new Date(this.horaServer).getTime() >
              new Date(response.body.ex).getTime()
            ) {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer);
                  toast.addEventListener('mouseleave', Swal.resumeTimer);
                },
              });

              Toast.fire({
                icon: 'error',
                title: '¡El token ha expirado...!',
              });
              localStorage.clear();
              this.router.navigate(['auth/login']);
            }
          }, 500);

          if (this.cerrarSesion == true) {
            localStorage.clear();
            this.router.navigate(['auth/login']);
          }

          return response;
        })
      );
  }

  armandoNombreCompleto() {
    var objJsonString = localStorage.getItem(environment.datosUsuario) || '';

    const objJson: UsuarioToken = JSON.parse(objJsonString);

    console.log('objJson', objJson);

    var nombreCompleto =
      objJson.primerNombre +
      ' ' +
      objJson.segundoNombre +
      ' ' +
      objJson.primerApellido +
      ' ' +
      objJson.segundoApellido;

    return nombreCompleto.replace('  ', ' ');
  }

  listandoTiposEquipos() {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<TipoEquipo[]>>(
        `${environment.urlApi}tipo-equipo`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  listandoEquiposPrincipalesActivos() {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<TipoEquipo[]>>(
        `${environment.urlApi}equipo/principales`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  creandoNuevoEquipo(body: Equipo) {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .post<RespuestaGeneral<TipoEquipo[]>>(
        `${environment.urlApi}equipo`,
        body,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  alertaTimer(mensajeUno: string) {
    let timerInterval:any;
    Swal.fire({
      title: mensajeUno+"</br>",
      html: 'Procesando solicitud',
      timer: 8000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(null);
        const b = Swal.getHtmlContainer()?.querySelector('b')||''
        timerInterval = setInterval(() => {
          b ? b.textContent = Swal.getTimerLeft()?.toString() || null : null
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }

  alertaTimerClose(mensajeUno: string) {
    let timerInterval:any;
    Swal.fire({
      title: mensajeUno,
      html: 'Procesando <b></b> solicitud',
      timer: 1,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading(null);
        const b = Swal.getHtmlContainer()?.querySelector('b')||''
        timerInterval = setInterval(() => {
          b ? b.textContent = Swal.getTimerLeft()?.toString() || null : null
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
  }


  listandoCategoriaEquipo() {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<CategoriaEquipo[]>>(
        `${environment.urlApi}categoria-equipo`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  listandoEquiposInnerActivos(desde:number, nombre:any, cantidadPorPagina:number) {
    const token = localStorage.getItem(environment.token);

    if (nombre == '') {
      nombre = null
    }
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<EquipoInner[]>>(
        `${environment.urlApi}equipo?desdeRegistro=${desde}&cantidadPorPagina=${cantidadPorPagina}&nombre=${nombre}`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  contandoEquiposActivos() {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<EquipoInner[]>>(
        `${environment.urlApi}equipo/total-activos`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  consultandoHoraServidor() {
    const token = localStorage.getItem(environment.token);
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<Date>>(
        `${environment.urlApi}autenticacion/hora-servidor`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  consultandoTodosDatosUsuarioLocales() {
    var objJsonString = localStorage.getItem(environment.datosUsuario) || '';

    return JSON.parse(objJsonString);
  }

  private handleError(error: any) {
    console.error('error ', error);
    console.error('error.error ', error.error);

    console.log('error.error.body', error.error.body);

    const mensaje: string = error.error.body;

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (mensaje) {
      Toast.fire({
        icon: 'error',
        title: mensaje,
      });
    } else {
      localStorage.clear();
      location.reload();
      Toast.fire({
        icon: 'error',
        title: 'Error de conección, cerrando sesión...',
      });
    }

    if (mensaje == 'El token es inválido') {
      localStorage.clear();
      location.reload();
    }


    if (mensaje == 'jwt malformed') {
      localStorage.clear();
      location.reload();
    }

    // localStorage.clear();

    // location.reload();

    return throwError(error.error);
  }

  private handleErrorCerrandoSesion(error: any) {
    console.error('error ', error.error);
    this.router.navigate(['/auth/login']);

    console.log('error.error.body', error.error.body);

    const mensaje: string = error.error.body;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: mensaje,
    });

    return throwError(error.error);
  }
}
