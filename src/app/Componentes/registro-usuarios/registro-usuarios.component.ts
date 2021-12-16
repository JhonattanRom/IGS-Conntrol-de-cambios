import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.css']
})
export class RegistroUsuariosComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Registrar Usuario', cols: 1, rows: 1 },
          { title: 'Actualizar Usuario', cols: 1, rows: 1 },
          { title: 'Usuarios Registrados', cols: 2, rows: 1 },
          
        ];
      }

      return [
        { title: 'Registrar Usuario', cols: 1, rows: 1 },
        { title: 'Actualizar Usuario', cols: 1, rows: 1 },
        { title: 'Usuarios Registrados', cols: 2, rows: 2 },
        
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
