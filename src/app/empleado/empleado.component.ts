import { Component, OnInit } from '@angular/core';
import { Empleado } from '../services/empleado';
import { EmpleadoService } from '../services/empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[];

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe((empleados) => {
      this.empleados = empleados;
    });
  }

  delete(empleado: Empleado): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar el empleado ${empleado.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      })
      .then((result) => {
        if (result.value) {
          this.empleadoService.delete(empleado.id).subscribe((response) => {
            this.empleados = this.empleados.filter((loc) => loc !== empleado);
            swal.fire(
              'Empleado eliminado!',
              `Empleado ${empleado.name} eliminado con éxito`,
              'success'
            );
          });
        }
      });
  }
}
