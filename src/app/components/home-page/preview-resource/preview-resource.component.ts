import {Component, Input, OnInit} from '@angular/core';
import {ResourceInterface} from "../../../interfaces/resource.interface";

@Component({
  selector: 'app-preview-resource',
  templateUrl: './preview-resource.component.html',
  styleUrls: ['./preview-resource.component.scss']
})
export class PreviewResourceComponent implements OnInit {
  color: string | undefined;

  @Input() resource: ResourceInterface | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  changeColor(): void {
    this.color = this.resource?.color;
  }

  resetColor(): void {
    this.color = undefined;
  }
}
