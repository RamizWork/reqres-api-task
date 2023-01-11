import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

import {DataService} from "../../services/data.service";
import {SingInResponseInterface} from "../../interfaces/singInResponse.Interface";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrls: ['./sing-in.component.scss']
})
export class SingInComponent implements OnInit {
  singInResponse$: Observable<SingInResponseInterface> | undefined;
  form: FormGroup | any;

  constructor(private route: Router, private dataService: DataService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  goHomePage() {
    this.route.navigate(['/']);
  }

  formSubmit() {
    this.singInResponse$ = this.dataService.singIn(this.form.value.email, this.form.value.password)
      .pipe(
        tap(() => {
            this.toastr.success('Sing in successful');
            this.route.navigate(['/']);
          }
        ),
        catchError((err) => {
            this.toastr.error(err.error.error);
            return of(err);
          }
        )
      )
  }
}
