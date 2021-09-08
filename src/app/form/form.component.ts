import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Empleado } from '../services/empleado';

import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public empleado: Empleado = new Empleado();
  public titulo: string = 'Crear Empleado';

  constructor(
    private empleadoService: EmpleadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarEmpleado();
  }

  cargarEmpleado(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.empleadoService
          .getEmpleado(id)
          .subscribe((empleado) => (this.empleado = empleado));
      }
    });
  }

  public create(): void {
    this.empleadoService.create(this.empleado).subscribe((empleado) => {
      this.router.navigate(['/empleados']);
      swal.fire(
        'Nuevo Empleado',
        `El empleado ${empleado.name} ha sido creado con éxito`,
        'success'
      );
    });
  }

  update(): void {
    this.empleadoService.update(this.empleado).subscribe((json) => {
      this.router.navigate(['/empleados']);
      swal.fire(
        'Empleado Actualizado',
        `${json.mensaje}: ${json.empleado.name}`,
        'success'
      );
    });
  }
}
