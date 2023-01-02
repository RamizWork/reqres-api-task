import {Component, Input, OnInit} from '@angular/core';
import {UserInterface} from "../../../interfaces/user.interface";

@Component({
  selector: 'app-preview-user',
  templateUrl: './preview-user.component.html',
  styleUrls: ['./preview-user.component.scss']
})
export class PreviewUserComponent implements OnInit {
  @Input() user: UserInterface | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
