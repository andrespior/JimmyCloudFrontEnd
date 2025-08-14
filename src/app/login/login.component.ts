import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from '../messages/messages.component';
import { FtpService } from '../services/ftp.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, 
              private router: Router, 
              private dialog: MatDialog,
              private ftpService: FtpService) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      if (username != '' && password != '') {
        const user = {
          username: username,
          password: password
        };

        this.ftpService.login(user).subscribe({
          next: (response) => {
            this.router.navigate(['/home']);
          },
          error: (err) => {
            console.error(err);
            alert('Credenciales incorrectas');
      }
        });
      } else {
        alert('Credenciales incorrectas 2');
      }
    }
  }
}

