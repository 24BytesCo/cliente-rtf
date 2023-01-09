import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventosManualesService } from 'src/app/core/EventosManuales.service';
import { EquipoInner } from 'src/app/core/GenericaInterfaz';
import { ServiceGenericService } from 'src/app/core/ServiceGeneric.service';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { Casos, CasosMap } from '../../../../core/GenericaInterfaz';
import { RespuestaGeneral } from '../../auth/login/model/Login';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.scss'],
})
export class GestionarComponent implements OnInit {
  listaEquiposInner: EquipoInner[];
  listaCasos: CasosMap[];

  mostrarLoader: boolean = false;
  cantidadPorPagina: number = 5;
  totalCasos: number = 0;
  desde: number = 0;
  pagina: number = 0;
  nombreBusqueda: string = '';
  idCaso: string = '';
  tituloModal: string = '';
  idUsuarioLogado: string = '';

  verDetalles: boolean = false;

  constructor(
    private genericosService: ServiceGenericService,
    private router: Router,
    private modalService: NgbModal,
    private eventosManualesService: EventosManualesService
  ) {}

  ngOnInit(): void {
    this.verificandoPermisos();

    this.idUsuarioLogado = JSON.parse(localStorage.getItem(environment.datosUsuario) || '').id || '';


    //Observable para estar escuchando los cambios en la edición
    this.eventosManualesService.edicionEquipoSatrisfactoria$.subscribe(
      (res) => {
        console.log('CAmbios de valor en edicion = ', res);
        if (res) {
          this.mostrarLoader = true;

          this.cargarEquipos();

          this.modalService.dismissAll();
        }
      }
    );

    //Buscando todos los casos
    this.genericosService
      .listandoCasosInnerActivos(0, null, 5)
      .subscribe((res: RespuestaGeneral<CasosMap[]>) => {
        console.log('Casos', res);
        this.listaCasos = res.body;


      });

    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  verificandoPermisos() {
    //verificando si tiene token
    var tokenLocal = localStorage.getItem(environment.token);
    console.log('tokenLocal', tokenLocal);
    if (!tokenLocal) {
      this.router.navigate(['auth/login']);
    }
  }

  cargarEquipos() {
    this.genericosService.contandoCasosActivos().subscribe((res) => {
      this.totalCasos = Number(Object.values(res.body)[0]);
    });
    this.genericosService
      .listandoEquiposInnerActivos(
        this.desde,
        this.nombreBusqueda,
        this.cantidadPorPagina
      )
      .subscribe((res) => {
        this.listaEquiposInner = res.body;
        this.mostrarLoader = false;
      });
  }

  buscarPaginado(pagina: number) {
    console.log('pagina click', pagina);

    this.pagina += pagina;
    console.log('pagina sima', this.pagina);

    if (pagina < 0) {
      pagina = 0;
    }

    if (this.pagina > this.totalCasos) {
      this.pagina = this.totalCasos - 1;
    }

    this.desde = this.pagina * 5;

    if (this.desde > this.totalCasos) {
      this.pagina = this.pagina - 1;
      this.desde = this.pagina * 5;
    }
    this.mostrarLoader = true;
    console.log('pagina,', this.pagina);

    this.cantidadPorPagina = 5;
    this.cargarEquipos();
  }

  busquedaNombre(nombre: any) {
    this.nombreBusqueda = nombre;
    this.cantidadPorPagina = 5;

    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  openXlModalEditar(content: TemplateRef<any>, idCaso: string) {
    this.verDetalles = false;

    this.idCaso = idCaso;
    this.tituloModal = 'Editar Equipo';

    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {});
  }

  openXlModalVer(content: TemplateRef<any>, idCaso: string) {
    this.idCaso = idCaso;
    this.tituloModal = 'Detalle Equipo';

    this.verDetalles = true;

    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {});
  }

  eliminar(idCaso: string) {
    Swal.fire({
      title: 'Inactivarás el equipo </b> ¿deseas continuar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si, contunuar',
      denyButtonText: `No, cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.genericosService.eliminarEquipo(idCaso).subscribe((res) => {
          this.mostrarLoader = true;
          this.cargarEquipos();
          Swal.fire('Producto Inactivado', '', 'success');
        });
      } else if (result.isDenied) {
        Swal.fire('El producto no se ha inactivado', '', 'info');
      }
    });
  }
}
