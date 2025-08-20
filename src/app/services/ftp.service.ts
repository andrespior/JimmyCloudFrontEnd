// ftp.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class FtpService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://179.50.21.74:7000'; // Cambia si usas otro puerto/backend
  private secretKey = '5ecf6fd301f27a5f91d2502d5342075aa4dfee0db9a3feabf24bcc485d710df3c8e7d301cee592cf59b1ba17b6a6ad96e7acfd284bf9bfcfff7f128e9fee04cc';

  login(user: { username: string; password: string }) {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();

    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { payload: encryptedUser }).pipe(
      tap((response) => {
        this.guardarToken(response.token, user.username, user.password);
      })
    );
  }

  listFiles(user: { username: string; password: string }): Observable<any[]> {
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(user), this.secretKey).toString();
    return this.http.post<any[]>(`${this.apiUrl}/ftp/list`,{ payload: encryptedUser });
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

  guardarToken(token: string, user: string, pas: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('dato1', user);
    localStorage.setItem('dato2', pas);
  }
}