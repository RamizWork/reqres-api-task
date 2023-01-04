import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {ListResourcesInterface} from "../interfaces/listResources.interface";
import {UsersResponseInterface} from "../interfaces/usersResponse.interface";
import {UserDetailsResponseInterface} from "../interfaces/userDetailsResponse.interface";
import {ChangeUserDataInterface} from "../interfaces/changeUserData.interface";

@Injectable()
export class DataService {
  usersDataFromApi$: BehaviorSubject<UsersResponseInterface | null> = new BehaviorSubject<UsersResponseInterface | null>(null);

  constructor(private http: HttpClient) {
  }

  loadUsersDataFromApi(currentPage?: number): Observable<UsersResponseInterface> {
    let params: HttpParams = new HttpParams();

    if (currentPage) {
      params = params.append('page', currentPage);
    }
    return this.http.get<UsersResponseInterface>(`https://reqres.in/api/users`, {params})
      .pipe(
        tap((response: UsersResponseInterface) => {
            this.usersDataFromApi$.next(response);
          }
        )
      );
  }

  loadResourcesData(currentPage?: number): Observable<ListResourcesInterface> {
    let params: HttpParams = new HttpParams();

    if (currentPage) {
      params = params.append('page', currentPage);
    }
    return this.http.get<ListResourcesInterface>(`https://reqres.in/api/unknown`, {params});
  }

  loadUserDetailsById(id: number): Observable<UserDetailsResponseInterface> {
    return this.http.get<UserDetailsResponseInterface>(`https://reqres.in/api/users/${id}`);
  }

  changeUserData(id: number, name: string, job: string | undefined): Observable<ChangeUserDataInterface> {
    return this.http.post<ChangeUserDataInterface>(`https://reqres.in/api/users/${id}`, {name: name, job: job})
      .pipe(
        tap((value) => {

        })
      );
  }
}
