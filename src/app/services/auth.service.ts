import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { BuildingService } from './building.service';
import { Edificio } from '../modules/mantenimiento/interfaces/edificio';

interface Usuario {
  nombre: string
  rol: string
  correo: string
  idEdificio?: string
  edificio?: string
  direccion?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private edificioService: BuildingService) { }

  setToken(token: string): void {
    localStorage.setItem('myToken', token)
  }
  getToken(): string | null {
    return localStorage.getItem('myToken')
  }

  setUser(user: Usuario) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(): Usuario | null {
    const userString = localStorage.getItem('user');
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }

  isLoggedIn() {
    return this.getToken !== null
  }

  Logout() {
    localStorage.removeItem('myToken')
    this.router.navigate(['login'])
  }

  login({ email, password }: any): Observable<any> {
    if (email == 'admin@gmail.com' && password == '123') {
      let usuario: Usuario = {
        nombre: 'Cesar Ceron',
        rol: 'Admin',
        correo: 'admin@gmail.com'

      }



      this.edificioService.getList().subscribe({
        next: (lista) => {
          console.log('data edifioc')
          console.log(lista)
          if (lista && lista.length > 0) {
            // Obtener el primer elemento
            const primerEdificio: Edificio = lista[0];
            console.log(primerEdificio)
            usuario.idEdificio = primerEdificio.id
            usuario.edificio = primerEdificio.name
            this.setUser(usuario)

            console.log(primerEdificio);
          } else {
            console.log('La lista está vacía.');
          }
        },
        error: (e) => {
          console.log(e);
        }

      })
      this.setToken('6546472443hfdgfg')
      return of({ name: 'Cesar Ceron', email: 'admin@gmail.com' })
    }
    return throwError(new Error('Fallo al logearse'))

  }
}
