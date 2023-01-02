import {Component, Input, OnInit} from '@angular/core';
import {ResourceInterface} from "../../../interfaces/resource.interface";

@Component({
  selector: 'app-preview-resource',
  templateUrl: './preview-resource.component.html',
  styleUrls: ['./preview-resource.component.scss']
})
export class PreviewResourceComponent implements OnInit {

  @Input() resource: ResourceInterface | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
