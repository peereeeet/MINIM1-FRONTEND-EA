import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './models/usuario.model';
import { Asignatura } from './models/asignatura.model';
import { TiempoUso } from './models/tiempo-uso.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  // Métodos para obtener usuarios
  getUsuariosPaginados(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}usuarios/listar-paginados`, { params });
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}usuarios`);
  }

  getUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}usuarios/${id}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}usuarios`, usuario);
  }

  updateUsuario(id: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}usuarios/${id}`, usuario);
  }

  deleteUsuario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}usuarios/${id}`);
  }

  // Métodos para obtener asignaturas
  getAsignaturasPaginadas(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}asignaturas/paginacion`, { params });
  }

  getAsignaturas(): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}asignaturas`);
  }

  getAsignatura(id: string): Observable<Asignatura> {
    return this.http.get<Asignatura>(`${this.apiUrl}asignaturas/${id}`);
  }

  createAsignatura(asignatura: Asignatura): Observable<Asignatura> {
    return this.http.post<Asignatura>(`${this.apiUrl}asignaturas`, asignatura);
  }

  deleteAsignatura(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}asignaturas/${id}`);
  }

  // Métodos para gestionar asignaturas de un usuario
  getUsuarioAsignaturas(usuarioId: string): Observable<Asignatura[]> {
    return this.http.get<Asignatura[]>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas`);
  }

  getUsuarioAsignaturasPaginadas(usuarioId: string, page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get<any>(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/paginacion`, { params });
  }

  asignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`, {});
  }

  desasignarAsignatura(usuarioId: string, asignaturaId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}usuarios/${usuarioId}/asignaturas/${asignaturaId}`);
  }

  // Métodos para gestionar tiempos de uso
  createSessionTime(sessionTime: TiempoUso): Observable<TiempoUso> {
		return this.http.post<TiempoUso>(this.apiUrl, sessionTime);
	}

	getSessionTimes(userId: string): Observable<TiempoUso[]> {
		return this.http.get<TiempoUso[]>(`${this.apiUrl}/${userId}`);
	}

	updateSessionTime(id: string, sessionTime: TiempoUso): Observable<TiempoUso> {
		return this.http.put<TiempoUso>(`${this.apiUrl}/${id}`, sessionTime);
	}

	deleteSessionTime(id: string): Observable<void> {
		return this.http.delete<void>(`${this.apiUrl}/${id}`);
	}
}
