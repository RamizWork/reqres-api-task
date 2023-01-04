import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DataService} from "../../../services/data.service";
import {Observable} from "rxjs";
import {UserDetailsResponseInterface} from "../../../interfaces/userDetailsResponse.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {
  form: FormGroup | any;
  changeUserData$: Observable<any> | undefined;

  constructor(public dialogRef: MatDialogRef<ModalWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: UserDetailsResponseInterface, private dataService: DataService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.data.first_name, Validators.required),
      job: new FormControl(this.data.job, Validators.required)
    });
  }

  modalClose(): void {
    this.dialogRef.close();
  }

  formSubmit() {
    this.changeUserData$ = this.dataService.changeUserData(this.data.data.id, this.form.value.name, this.form.value.job)
      .pipe(
        tap(() => {
            this.modalClose();
          }
        )
      );
  }
}
