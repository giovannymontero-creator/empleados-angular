import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleado } from './empleado';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private urlEndPoint: string = 'http://localhost:8080/api/empleados';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.urlEndPoint);
  }

  create(empleado: Empleado): Observable<Empleado> {
    return this.http
      .post(this.urlEndPoint, empleado, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.empleado as Empleado),
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }

  getEmpleado(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((error) => {
        this.router.navigate(['/empleados']);
        console.error(error.error.mensaje);
        swal.fire(
          'Error al obtener el empleado ',
          error.error.mensaje,
          'error'
        );
        return throwError(error);
      })
    );
  }

  update(empleado: Empleado): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${empleado.id}`, empleado, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }

  delete(id: number): Observable<Empleado> {
    return this.http
      .delete<Empleado>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((error) => {
          console.error(error.error.mensaje);
          swal.fire(error.error.mensaje, error.error.error, 'error');
          return throwError(error);
        })
      );
  }
}
