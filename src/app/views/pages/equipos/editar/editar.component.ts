import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { CategoriaEquipo, Equipo, TipoEquipo } from 'src/app/core/GenericaInterfaz';
import { ServiceGenericService } from 'src/app/core/ServiceGeneric.service';
import { RespuestaGeneral } from '../../auth/login/model/Login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {
  @Input() idUsuario: string ='';
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
  tipoEquipoCode:any = null;
  listaTipoEquipo: TipoEquipo[];
  listaCategoriaEquipo: CategoriaEquipo[];
  listaEquiposPrincipalesActivos: Equipo[];
  verSeleccionarPadre: boolean = false;
  nombreEquipoPadreSeleccionado: string = '';

  constructor(
    private genericosService: ServiceGenericService,

  ) { }

  ngOnInit(): void {

    if (this.idUsuario != '') {
      this.buscarUnEquipoConId(this.idUsuario);

    }

    this.genericosService
    .listandoCategoriaEquipo()
    .subscribe((res: RespuestaGeneral<CategoriaEquipo[]>) => {
      this.listaCategoriaEquipo = res.body;

    });


    this.genericosService
    .listandoTiposEquipos()
    .subscribe((res: RespuestaGeneral<TipoEquipo[]>) => {
      this.listaTipoEquipo = res.body;




    });


    this.genericosService
     .listandoEquiposPrincipalesActivos().subscribe((res: RespuestaGeneral<Equipo[]>)=>
      {
        this.listaEquiposPrincipalesActivos = res.body;

      });


      setTimeout(() => {
      this.prueba("r");
      this.cambioPadre("r");

      }, 2000);


  }

  buscarUnEquipoConId(idEquipoEditar:string){
    this.genericosService.buscarUnEquipoConId(idEquipoEditar).subscribe(res=>{

      this.equipo = res.body[0];

      this.tipoEquipo = this.equipo.tipoEquipo;

    });
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

  cambioPadre(e:any){
    console.log("equipo.padre", this.equipo.equipoPrincipal);

    if(this.equipo.equipoPrincipal){
      this.nombreEquipoPadreSeleccionado = this.listaEquiposPrincipalesActivos.filter((e)=> e.id === this.equipo.equipoPrincipal)[0].nombre;

    }

  }

  guardar(){
    this.tipoEquipoCode = this.listaTipoEquipo.filter(r=> r.id == this.tipoEquipo)[0].codigo;
    this.equipo.tipoEquipo = this.tipoEquipo;
    console.log("equipo", this.equipo);
    this.genericosService.alertaTimer("Editando Equipo");

    //Validaciones datos obligatorios
    if(!this.validacionesGuardar()){
      return;
    }


    this.genericosService.creandoNuevoEquipo(this.equipo).subscribe(res=>{
      this.equipo= {
        nombre: '',
        categoria: '',
        codigo: '',
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
        this.genericosService.alertaSuperiorDerechaPequena("¡Se ha creado el equipo corréctavmente!", "success");
      }

    });

  }

  validacionesGuardar(){


    if (!this.equipo.nombre) {

      this.alertaPersonalizada("El nombre es obligatorio." ,"error");
      return false;

    }

    if (!this.equipo.codigo) {
      this.alertaPersonalizada("Debes proporcionar un código." ,"error");
      return false;
    }

    if (!this.equipo.categoria) {
      this.alertaPersonalizada("Debes seleccionar una categoría." ,"error");
      return false;
    }
    if (!this.equipo.noSerie) {
      this.alertaPersonalizada("Debes proporcionar un número de serie." ,"error");
      return false;
    }


    console.log("this.equipo.tipoEquipoCode", this.tipoEquipoCode);
    console.log("this.equipo.equipoPrincipal", this.equipo.equipoPrincipal);

    if (this.tipoEquipoCode == 'COMP' && (!this.equipo.equipoPrincipal || this.equipo.equipoPrincipal && this.equipo.equipoPrincipal == '')) {
      this.alertaPersonalizada("Debes seleccionar un equipo Principal o Padre." ,"error");
      return false;
    }

    return true;

  }

  alertaPersonalizada(mensaje: string, tipo: string) {

    if (tipo== "error") {
      Swal.fire({
        title: mensaje,
        text: '¡Error de validación!',
        icon: 'error',
        confirmButtonText: 'Cool'
      })

      return;
    }



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
