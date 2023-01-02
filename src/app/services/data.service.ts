import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UsersResponseInterface} from "./../interfaces/usersResponse.interface";
import {ListResourcesInterface} from "../interfaces/listResources.interface";

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {
  }

  loadUsersData(): Observable<UsersResponseInterface> {
    return this.http.get<UsersResponseInterface>(`https://reqres.in/api/users`);
  }

  loadResourcesData(): Observable<ListResourcesInterface> {
    return this.http.get<ListResourcesInterface>(`https://reqres.in/api/unknown`);
  }
}
