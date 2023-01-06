import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Observable, Subscription} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {DataService} from "../../services/data.service";
import {ModalWindowComponent} from "./modal-window/modal-window.component";
import {UserDetailsResponseInterface} from "../../interfaces/userDetailsResponse.interface";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPageComponent implements OnInit, OnDestroy {
  userDetails$: Observable<UserDetailsResponseInterface> | undefined;
  getUserDetails$: Observable<UserDetailsResponseInterface | null> | undefined;
  deleteUser$: Subscription | undefined;
  userDetails: UserDetailsResponseInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router,
    private toaster: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getUserDetails$ = this.dataService.getUserDetails();
    this.userDetails$ = this.route.params
      .pipe(
        switchMap((params: Params): Observable<UserDetailsResponseInterface> => {
            return this.dataService.loadUserDetailsById(params['id'])
          }
        ),
        tap(value => {
            this.userDetails = value;
          }
        )
      )
  }

  openDialog() {
    this.dialog.open(ModalWindowComponent, {
      width: '500px',
      data: this.userDetails
    });
  }

  deleteUser(userId: number) {
    this.deleteUser$ = this.dataService.deleteUser(userId).subscribe(() => {
      this.toaster.success('User card deleted');
      this.router.navigate(['']);
    });

  }

  ngOnDestroy() {
    this.deleteUser$?.unsubscribe();
  }
}
