import { Component, OnInit } from '@angular/core';
import { Equipo } from 'src/app/core/GenericaInterfaz';
import {
  Casos,
  EquipoInner,
  UsuarioToken,
} from '../../../../core/GenericaInterfaz';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { RespuestaGeneral } from '../../auth/login/model/Login';
import { environment } from '../../../../../environments/environment.prod';
import { timeStamp } from 'console';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {
  caso: Casos = {
    equipoRelacionado: '',
    estadoCaso: '',
    fechaCreacion: new Date(),
    fechaSolucion: new Date(),
    numeroCaso: '',
    observacionInicial: '',
    tecnicoAsignado: '',
    usuarioReporta: '',
  };

  mostrarLoader: boolean = false;

  listaEquipos: EquipoInner[] = [
    {
      nombre: '',
      imagenPrincipal: '',
      codigo: '',
      descripcion: '',
      fechaAdquisionEmpresa: new Date(),
      fechaRegistro: new Date(),
      id: '',
      imagenArrayUrl: [''],
      marca: '',
      modelo: '',
      noSerie: '',
      categoria: {
        codigo: '',
        descripcion: '',
      },
      equipoPrincipal: {
        codigo: '',
        id: '',
        nombre: '',
      },
      tipoEquipo: {
        codigo: '',
        descripcion: '',
      },
    },
  ];

  equipoSeleccionado: EquipoInner = {
    nombre: '',
    imagenPrincipal: '',
    codigo: '',
    descripcion: '',
    fechaAdquisionEmpresa: new Date(),
    fechaRegistro: new Date(),
    id: '',
    imagenArrayUrl: [''],
    marca: '',
    modelo: '',
    noSerie: '',
    categoria: {
      codigo: '',
      descripcion: '',
    },
    equipoPrincipal: {
      codigo: '',
      id: '',
      nombre: '',
    },
    tipoEquipo: {
      codigo: '',
      descripcion: '',
    },
  };

  nombreUsuarioLogado: string = '';

  constructor(private genericService: ServiceGenericService) {
    //Listando todos los equipos
    this.mostrarLoader = true;
  }

  ngOnInit(): void {
    this.listandoEquipos();
    this.nombreUsuarioLogado = this.genericService.armandoNombreCompleto();

    this.caso.usuarioReporta = JSON.parse(
      localStorage.getItem(environment.datosUsuario) || ''
    ).id;
  }

  listandoEquipos() {
    this.genericService
      .listandoEquiposInnerActivos(0, null, 1000)
      .subscribe((res: RespuestaGeneral<EquipoInner[]>) => {
        console.log('res=> ', res);

        this.listaEquipos = res.body;
        this.mostrarLoader = false;
      });
  }

  cambioEquipoRelacionado() {
    if (this.caso.equipoRelacionado && this.caso.equipoRelacionado != '') {
      this.mostrarLoader = true;

      this.genericService
        .buscarUnEquipoConId(this.caso.equipoRelacionado)
        .subscribe((res) => {
          console.log('res=> ', res.body[0]);

          this.equipoSeleccionado = res.body[0];

          this.mostrarLoader = false;
        });
    }
  }

  guardar() {
    this.mostrarLoader = true;

    this.genericService.creandoNuevoCaso(this.caso).subscribe((res) => {
      this.mostrarLoader = false;

      this.reiniciandoFormualrio();

      this.genericService.alertaSuperiorDerechaPequena(
        '¡Se ha creado el caso corréctamente!',
        'success'
      );
    });

    setTimeout(() => {
      this.mostrarLoader = false;
    }, 2000);
  }
  reiniciandoFormualrio() {
    this.caso = {
      equipoRelacionado: '',
      estadoCaso: '',
      fechaCreacion: new Date(),
      fechaSolucion: new Date(),
      numeroCaso: '',
      observacionInicial: '',
      tecnicoAsignado: '',
      usuarioReporta: '',
    };

    this.equipoSeleccionado = {
      nombre: '',
      imagenPrincipal: '',
      codigo: '',
      descripcion: '',
      fechaAdquisionEmpresa: new Date(),
      fechaRegistro: new Date(),
      id: '',
      imagenArrayUrl: [''],
      marca: '',
      modelo: '',
      noSerie: '',
      categoria: {
        codigo: '',
        descripcion: '',
      },
      equipoPrincipal: {
        codigo: '',
        id: '',
        nombre: '',
      },
      tipoEquipo: {
        codigo: '',
        descripcion: '',
      },
    };
  }
}
