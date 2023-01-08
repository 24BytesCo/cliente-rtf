import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventosManualesService {

  public edicionEquipoSatrisfactoria$ = new EventEmitter<boolean>();

constructor() { }

}
