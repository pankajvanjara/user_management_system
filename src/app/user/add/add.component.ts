import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import { generateRandomInteger } from '../../shared/helper';

const MatModule: Array<any> = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule
]

const Modules: Array<any> = [
  FormsModule,
  ReactiveFormsModule,
  RouterLink,
  ToastrModule
]

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [...MatModule, ...Modules],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  form!: FormGroup;
  isEdit: boolean = false;

  route = inject(ActivatedRoute);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      userId: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone_number: ['', [
        Validators.required
      ]]
    })
  }

  ngOnInit(): void {
    this.route?.queryParams.subscribe({
      next: (params) => {

        if (Object.entries(params).length) { this.isEdit = true }

        this.form.patchValue({
          ...params
        })
      }
    })
  }

  addForm(): void {
    if (this.form.invalid) { return; }

    if (!this.isEdit) {
      let user = this.userService.users().find(user =>
        (user.firstName == this.form.value.firstName) ||
        (user.lastName == this.form.value.lastName) ||
        (user.email == this.form.value.email) ||
        (user.phone_number == this.form.value.phone_number)
      );
      if (user) {
        this.toastr.error('User is already exist!');
        return;
      }

      this.userService.users().push({
        ...this.form.value,
        userId: generateRandomInteger(1, 100000)
      });
    } else {
      let users = this.userService.users;

      users().forEach(user => {
        if (user.userId == this.form.value.userId) {
          user = this.form.value
        }
      })

      users.set([...users()]);
    }

    this.router.navigate(['/user']);
  }

  getFormControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

}
