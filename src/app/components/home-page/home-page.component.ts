import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {DataService} from "../../services/data.service";
import {ListResourcesInterface} from "../../interfaces/listResources.interface";
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

  nextPage() {
    const usersResponse: UsersResponseInterface | null = this.dataService.usersDataFromApi$.getValue();

    if (usersResponse) {
      const currentPage = usersResponse.page + 1;

      this.usersData$ = this.dataService.loadUsersDataFromApi(currentPage);
      this.resourceData$ = this.dataService.loadResourcesData(currentPage);
    }
  }

  previewPage(): void {
    const userResponse: UsersResponseInterface | null = this.dataService.usersDataFromApi$.getValue();

    if (userResponse) {
      const currentPage = userResponse.page - 1;

      this.usersData$ = this.dataService.loadUsersDataFromApi(currentPage);
      this.resourceData$ = this.dataService.loadResourcesData(currentPage);
    }
  }
}
