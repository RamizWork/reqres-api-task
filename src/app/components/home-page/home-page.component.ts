import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ListResourcesInterface} from "../../interfaces/listResources.interface";
import {DataService} from "../../services/data.service";
import {UserInterface} from "../../interfaces/user.interface";
import {UsersResponseInterface} from "../../interfaces/usersResponse.interface";


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  resourceData$: Observable<ListResourcesInterface> | undefined;
  usersData$: Observable<UsersResponseInterface> | undefined;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.resourceData$ = this.dataService.loadResourcesData();
    this.usersData$ = this.dataService.loadUsersDataFromApi();
  }
}
