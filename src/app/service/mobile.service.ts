import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private _url = "http://localhost:3000/users";

  constructor(private _http: HttpClient) { }

  fetchUsers() {
    return this._http.get(this._url);
  }
  removeUser(id: any) {
    return this._http.delete(this._url + "/" + id);
  }
  postUser(body: any) {
    return this._http.post(this._url, body);
  }
  putUser(body: any) {
    return this._http.put(this._url+ "/" + body['id'], body);
  }
}
