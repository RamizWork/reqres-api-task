import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";

import {ListResourcesInterface} from "../interfaces/listResources.interface";
import {UsersResponseInterface} from "../interfaces/usersResponse.interface";
import {UserDetailsResponseInterface} from "../interfaces/userDetailsResponse.interface";


@Injectable()
export class DataService {
  usersData$: BehaviorSubject<UsersResponseInterface | null> = new BehaviorSubject<UsersResponseInterface | null>(null);

  constructor(private http: HttpClient) {
  }

  loadUsersDataFromApi(): Observable<UsersResponseInterface> {
    return this.http.get<UsersResponseInterface>(`https://reqres.in/api/users`)
      .pipe(
        tap((response: UsersResponseInterface) => {
          this.usersData$.next(response)
        })
    );
  }

  loadResourcesData(): Observable<ListResourcesInterface> {
    return this.http.get<ListResourcesInterface>(`https://reqres.in/api/unknown`);
  }

  loadUserDetailsById(id: number): Observable<UserDetailsResponseInterface> {
    return this.http.get<UserDetailsResponseInterface>(`https://reqres.in/api/users/${id}`);
  }
}
