import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../backendDataClasses/permission';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  permissionsApi: string = "http://localhost:8080/permissions"

  constructor(
    private http: HttpClient
  ) { }


  getPermissions(): Observable<Permission[]>{
    return this.http.get<Permission[]>(this.permissionsApi)
  }

}
