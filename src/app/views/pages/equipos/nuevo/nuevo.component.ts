import { Component, OnInit, ViewChild } from '@angular/core';
import {
  CategoriaEquipo,
  Equipo,
  TipoEquipo,
} from 'src/app/core/GenericaInterfaz';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { RespuestaGeneral } from '../../auth/login/model/Login';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };

  equipo: Equipo = {
    nombre: '',
    categoria: '',
    codigo: '',
    imagenPrincipal: '',
    equipoPrincipal: '',
    descripcion: '',
    fechaAdquisionEmpresa: new Date(),
    fechaRegistro: new Date(),
    id: '',
    imagenArrayUrl: [''],
    marca: '',
    modelo: '',
    noSerie: '',
    tipoEquipo: '',
  };
  tipoEquipo:any = null;
  listaTipoEquipo: TipoEquipo[];
  listaCategoriaEquipo: CategoriaEquipo[];
  listaEquiposPrincipalesActivos: Equipo[];

  verSeleccionarPadre: boolean = false;

  constructor(private genericoServicio: ServiceGenericService) {

    this.genericoServicio
    .listandoCategoriaEquipo()
    .subscribe((res: RespuestaGeneral<CategoriaEquipo[]>) => {
      this.listaCategoriaEquipo = res.body;

    });


    this.genericoServicio
    .listandoTiposEquipos()
    .subscribe((res: RespuestaGeneral<TipoEquipo[]>) => {
      this.listaTipoEquipo = res.body;

    });


    this.genericoServicio
     .listandoEquiposPrincipalesActivos().subscribe((res: RespuestaGeneral<Equipo[]>)=>
      {
        this.listaEquiposPrincipalesActivos = res.body;

      });

  }

  ngOnInit(): void {


    }

  prueba(e: any) {
    console.log('cambio en tipo', this.tipoEquipo);
    var tipoEquipoSeleccion =
      this.listaTipoEquipo.filter((e) => e.id === this.tipoEquipo)[0]
        ?.codigo || null;
    console.log('tipoEquipoSeleccion', tipoEquipoSeleccion);

    if (tipoEquipoSeleccion === 'COMP') {
      this.verSeleccionarPadre = true;
    } else {
      this.verSeleccionarPadre = false;
    }
  }

  guardar(){
    this.equipo.tipoEquipo = this.tipoEquipo;
    this.equipo.tipoEquipo = this.tipoEquipo;
    console.log("equipo", this.equipo);
    this.genericoServicio.alertaTimer("Creando Equipo");

    this.genericoServicio.creandoNuevoEquipo(this.equipo).subscribe(res=>{
      this.equipo= {
        nombre: '',
        categoria: '',
        codigo: '',
        imagenPrincipal: '',
        equipoPrincipal: '',
        descripcion: '',
        fechaAdquisionEmpresa: new Date(),
        fechaRegistro: new Date(),
        id: '',
        imagenArrayUrl: [''],
        marca: '',
        modelo: '',
        noSerie: '',
        tipoEquipo: '',
      };
      console.log("res guardar", res);
      if (!res.error) {
        this.genericoServicio.alertaSuperiorDerechaPequena("¡Se ha creado el equipo corréctavmente!", "success");
      }

    });

  }

  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  onUploadSuccess(event: any): void {
    console.log('onUploadSuccess:', event);
  }

  resetDropzoneUploads(): void {
    if (this.directiveRef) {
      this.directiveRef.reset();
    }
  }


}
