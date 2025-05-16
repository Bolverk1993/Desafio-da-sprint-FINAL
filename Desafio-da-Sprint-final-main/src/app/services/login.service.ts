import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { InformacaoUser } from "../models/user"

@Injectable({
  providedIn: 'root'
})
export class LoginService {
http = inject(HttpClient)
 login(nome:string, senha:string):Observable<InformacaoUser> {
return this.http.post<InformacaoUser>(
  "http://localhost:3001/login",
  {nome,senha})
  .pipe(
    tap(
      (user)=> {sessionStorage.setItem("email", user.email)}
    ))
 }
}