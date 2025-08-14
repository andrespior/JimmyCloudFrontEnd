import { Component, OnInit } from '@angular/core';
import { FtpService } from '../services/ftp.service';
import { Router } from '@angular/router';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-archivo-lista',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  files: any[] = [];
  userApp = {
          username: "string",
          password: "string"
  };

  constructor(private ftpService: FtpService,
              private router: Router  ) {}

  ngOnInit() {
    this.obternetArchivos();
  }

  obternetArchivos(){
    const userApp = localStorage.getItem('dato1');
    const passApp = localStorage.getItem('dato2');

    if (userApp !== null && passApp !== null){
      this.userApp = {
          username: userApp,
          password: passApp
      }
    }

    this.ftpService.listFiles(this.userApp).subscribe({ 
      next: data => {
        //console.log('Archivos recibidos del servidor:', data);  // 👈 Aquí
        this.files = data;
      },
      error: err => console.error('Error al obtener archivos:', err)
    });
  }

  onArchivoSeleccionado(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      alert('Selecciona un archivo primero');
      return;
    }

    const archivo = input.files[0];
    const userApp = localStorage.getItem('dato1');
    const passApp = localStorage.getItem('dato2');

    if (userApp && passApp) {
      const user = {
        username: userApp,
        password: passApp
      };

      this.ftpService.subirArchivo(archivo, user).subscribe({
        next: () => {
          alert('Archivo subido correctamente');
          this.obternetArchivos(); // refresca lista
        },
        error: err => {
          console.error('Error al subir archivo:', err);
          alert('Error al subir el archivo');
        }
      });
      input.value = ''; // limpia el input para que se pueda volver a subir el mismo
    }
    else{
      alert('Credenciales no encontradas');
    }
  }

  descargarArchivo(nombre: string) {
    const userApp = localStorage.getItem('dato1');
    const passApp = localStorage.getItem('dato2');

    if (userApp !== null && passApp !== null){
      this.userApp = {
          username: userApp,
          password: passApp
      }
    }

    this.ftpService.descargarArchivo(nombre, this.userApp).subscribe({
      next: (blob) => {
        saveAs(blob, nombre);
      },
      error: (err) => {
        console.error('Error al descargar archivo:', err);
        alert('No se pudo descargar el archivo');
      }
    });
  }

  eliminarArchivo(nombre: string) {
    if (confirm(`¿Seguro que quieres eliminar "${nombre}"?`)) {
      const userApp = localStorage.getItem('dato1');
      const passApp = localStorage.getItem('dato2');

      if (userApp !== null && passApp !== null){
        this.userApp = {
          username: userApp,
          password: passApp
        }
      }
      this.ftpService.eliminarArchivo(nombre, this.userApp).subscribe({
      next: () => {
          alert('Archivo eliminado Correctamente');
          this.obternetArchivos(); // refresca la lista
        },
        error: (err) => {
          console.error('Error al eliminar archivo:', err);
          alert('Error al eliminar el archivo');
        }
    });
    }
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    localStorage.removeItem('dato1');
    localStorage.removeItem('dato2');
    this.router.navigate(['/login']);
  }

}
