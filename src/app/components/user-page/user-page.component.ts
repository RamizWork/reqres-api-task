import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

import {DataService} from "../../services/data.service";
import {UserDetailsResponseInterface} from "../../interfaces/userDetailsResponse.interface";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserPageComponent implements OnInit {
  userDetails$: Observable<UserDetailsResponseInterface> | undefined;

  constructor(private route: ActivatedRoute, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.userDetails$ = this.route.params
      .pipe(
        switchMap((params: Params): Observable<UserDetailsResponseInterface> => {
          return this.dataService.loadUserDetailsById(params['id'])
        })
      )
  }

}
