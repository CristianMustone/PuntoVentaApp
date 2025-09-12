import { Component } from '@angular/core';
import { Router } from '@angular/router'; // ajusta la ruta según tu estructura
import { AuthService } from '../../services/authUser/auth-user'; // ajusta la ruta según tu estructura
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  // providers: [AuthService],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error de login:', err);
        alert('Usuario o contraseña incorrectos');
      },
    });
  }
}
