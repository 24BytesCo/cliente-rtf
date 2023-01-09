export interface UsuarioToken {
  usuario: string;
  id: string;
  correoElectronico: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tUsuario: string;
  ex: Date;
  iat: Date;
}

export class Equipo {
  id: string;
  categoria: string;
  equipoPrincipal: string;
  nombre: string;
  marca: string;
  noSerie: string;
  descripcion: string;
  fechaRegistro: Date;
  fechaAdquisionEmpresa: Date;
  imagenArrayUrl: Array<string>;
  modelo: string;
  codigo: string;
  imagenPrincipal: string;
  tipoEquipo: string;

  constructor() {
    this.id = '';
    this.categoria = '';
    this.nombre = '';
    this.marca = '';
    this.noSerie = '';
    this.equipoPrincipal = '';
    this.descripcion = '';
    this.imagenPrincipal = '';
    this.fechaRegistro = new Date();
    this.fechaAdquisionEmpresa = new Date();
    this.imagenArrayUrl = [''];
    this.modelo = '';
    this.codigo = '';
    this.tipoEquipo = '';
  }
}

export class Casos{
  numeroCaso: string;
  estadoCaso: string;
  tecnicoAsignado: string;
  equipoRelacionado: string;
  usuarioReporta: string;
  fechaCreacion: Date;
  fechaCreacionString: string;
  fechaSolucion?: Date;
  observacionInicial: string;

      constructor(){
        this.numeroCaso = '';
        this.estadoCaso = '';
        this.tecnicoAsignado = '';
        this.equipoRelacionado = '';
        this.usuarioReporta = '';
        this.fechaCreacionString = '';
        this.fechaCreacion = new Date();
        this.fechaSolucion = new Date();
        this.observacionInicial = '';
      }

}


export class CasosMap{

  numeroCaso: string;
  estadoCasoCode: string;
  estadoCasoDescripcion: string;
  tecnicoAsignadoNombreCompleto: string;
  tecnicoAsignadoId: string;
  usuarioReportaNombreCompleto: string;
  usuarioReportaId: string;
  equipoRelacionado: string;
  fechaCreacionString: string;
  observacionInicial: string;



      constructor(){
        this.numeroCaso = '';
        this.estadoCasoCode = '';
        this.estadoCasoDescripcion = '';
        this.tecnicoAsignadoNombreCompleto = '';
        this.tecnicoAsignadoId = '';
        this.usuarioReportaNombreCompleto = '';
        this.usuarioReportaId = '';
        this.equipoRelacionado = '';
        this.fechaCreacionString = '';
        this.observacionInicial = '';
      }

}

class Categoria{
codigo: string;
descripcion: string;
}

class TipoEquipoInt{
  codigo: string;
  descripcion: string;
  }

  class EquipoPrincipal{
    id: string;
    codigo: string;
    nombre: string;
    }
export class EquipoInner {
  id: string;
  categoria: Categoria;
  equipoPrincipal:EquipoPrincipal ;
  nombre: string;
  imagenPrincipal: string;
  marca: string;
  noSerie: string;
  descripcion: string;
  fechaRegistro: Date;
  fechaAdquisionEmpresa: Date;
  imagenArrayUrl: Array<string>;
  modelo: string;
  codigo: string;
  tipoEquipo: TipoEquipoInt;


}

export class TipoEquipo {
  id: string;
  descripcion: string;
  codigo: string;
}

export class CategoriaEquipo {
  id: string;
  descripcion: string;
  codigo: string;
  estado: BigInteger;
}
