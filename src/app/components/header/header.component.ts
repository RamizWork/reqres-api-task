import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated$!: Observable<boolean>;

  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.dataService.getAuthenticated().asObservable();
  }

  logout() {
    this.dataService.logout();
  }
}
