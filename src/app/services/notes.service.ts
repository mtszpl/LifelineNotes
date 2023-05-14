import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  permissionsApi: string = "http://localhost:8080/permissions"

  constructor(
    private http: HttpClient
  ) { }


  getPermissionsAndNotes(): Observable<any>{
    return this.http.get(this.permissionsApi)
  }

}
