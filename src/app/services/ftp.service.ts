// ftp.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FtpService {
  private apiUrl = 'http://localhost:3000'; // Cambia si usas otro puerto/backend

  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }){
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user);
  }

  listFiles(user: { username: string; password: string }): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/ftp/list`,user);
  }

  subirArchivo( file: File, user: { username: string; password: string }): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('username', user.username);
    formData.append('password', user.password);

    return this.http.post(`${this.apiUrl}/ftp/upload`, formData);
  }

  descargarArchivo(nombre: string, user: { username: string; password: string }): Observable<Blob>  {
    return this.http.post(`${this.apiUrl}/ftp/download/${nombre}`, user, {
      responseType: 'blob' // Esto es clave para manejar archivos binarios
    });
  }

  eliminarArchivo(nombre: string, user: { username: string; password: string }): Observable<any> {
    //return this.http.delete(`${this.apiUrl}/ftp/delete/${encodeURIComponent(nombre)}`);
    return this.http.delete(`${this.apiUrl}/ftp/delete/${nombre}`, {
      params: {
        username: user.username,
        password: user.password
      }
    });
  }

  guardarToken(token: string) {
    localStorage.setItem('token', token);
  }

  guardarLogin(user: string, pas: string){
    localStorage.setItem('dato1', user);
    localStorage.setItem('dato2', pas);
  }

}