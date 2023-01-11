import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {ListResourcesInterface} from "../interfaces/listResources.interface";
import {UsersResponseInterface} from "../interfaces/usersResponse.interface";
import {UserDetailsResponseInterface} from "../interfaces/userDetailsResponse.interface";
import {ChangeUserDataInterface} from "../interfaces/changeUserData.interface";
import {SingUpResponseInterface} from "../interfaces/singUpResponse.interface";
import {SingInResponseInterface} from "../interfaces/singInResponse.Interface";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class DataService {
  usersDataFromApi$: BehaviorSubject<UsersResponseInterface | null> = new BehaviorSubject<UsersResponseInterface | null>(null);
  usersData$: BehaviorSubject<UserDetailsResponseInterface | null> = new BehaviorSubject<UserDetailsResponseInterface | null>(null);
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) {
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
    return this.http.get<UserDetailsResponseInterface>(`https://reqres.in/api/users/${id}`)
      .pipe(
        tap((value) => {
          this.usersData$.next(value);
        }),
        catchError(error => {
          this.toastr.error('User not found');
          this.router.navigate(['/']);
          return of(error);
        })
      );
  }

  changeUserData(id: number, name: string, job: string | undefined): Observable<ChangeUserDataInterface> {
    return this.http.post<ChangeUserDataInterface>(`https://reqres.in/api/users/${id}`, {name: name, job: job})
      .pipe(
        tap((value) => {
            const currentUserDetails: UserDetailsResponseInterface | null = this.usersData$.getValue();
            const newUserDetails: UserDetailsResponseInterface = {
              ...currentUserDetails,
              support: {
                ...currentUserDetails!.support
              },
              data: {
                ...currentUserDetails!.data,
                first_name: name
              },
              job
            };

            this.usersData$.next(newUserDetails);
          }
        )
      );
  }

  deleteUser(userId: number): Observable<Response> {
    return this.http.delete<Response>(`https://reqres.in/api/users/${userId}`);
  }

  getUserDetails(): Observable<UserDetailsResponseInterface | null> {
    return this.usersData$.asObservable();
  }

  singUp(email: string, password: string): Observable<SingUpResponseInterface> {
    const userData = {
      email: email,
      password: password
    }
    return this.http.post<SingUpResponseInterface>(`https://reqres.in/api/register`, userData)
      .pipe(
        tap((response) => {
            DataService.setToken(response.token);
            this.isAuthenticated$.next(true);
          }
        )
      );
  }

  singIn(email: string, password: string): Observable<SingInResponseInterface> {
    const userData = {
      email: email,
      password: password
    }
    return this.http.post<SingInResponseInterface>(`https://reqres.in/api/login`, userData)
      .pipe(
        tap(response => {
            DataService.setToken(response.token);
            this.isAuthenticated$.next(true);
          }
        )
      );
  }

  getAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated$;
  }

  logout(): void {
    localStorage.clear();
    this.isAuthenticated$.next(false);
  }

  private static setToken(tokenResponse: string | undefined) {
    const token = tokenResponse;

    if (token) {
      localStorage.setItem('token', token);

    } else {
      localStorage.clear();
    }
  }
}
