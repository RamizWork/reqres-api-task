import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

import {DataService} from "../../../services/data.service";
import {SingUpResponseInterface} from "../../../interfaces/singUpResponse.interface";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {
  form: FormGroup | any;
  singUpResponse$: Observable<SingUpResponseInterface> | undefined;

  constructor(private route: Router, private dataService: DataService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    })
  }

  goHomePage() {
    this.route.navigate(['']);
  }

  get matchPassword(): boolean {
    return this.form.value.password !== this.form.value.repeatPassword;
  }

  formSubmit() {
    this.singUpResponse$ = this.dataService.singUp(this.form.value.email, this.form.value.password)
      .pipe(
        tap(() => {
            this.toastr.success('Sing up successful');
            this.route.navigate(['/']);
          }
        ),
        catchError((err) => {
            this.toastr.error(err.error.error);
            return of(err);
          }
        )
      );
  }
}
