import { Component, signal } from '@angular/core';
import {
  form,
  required,
  schema,
  Control,
  apply,
  email,
  applyEach,
  applyWhen,
} from '@angular/forms/signals';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButton } from '@angular/material/button';

interface User {
  firstName: string;
  lastName: string;
  email: string;
}

const userSchema = schema<User>((user) => {
  apply(user.firstName, requiredSchema);
  apply(user.lastName, requiredSchema);
  apply(user.email, requiredSchema);
  email(user.email, { message: 'Enter a valid email' });
});

const requiredSchema = schema<string>((path) => {
  required(path, { message: 'This field is required ' });
});

@Component({
  selector: 'user-demo',
  imports: [MatFormField, MatLabel, MatInput, MatError, Control, MatButton],
  template: `
    <button matButton type="button" (click)="updateName()">
      Update First name to Lol
    </button>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput placeholder="First name" [control]="form.firstName" />
      @let firstNameErrors = form.firstName().errors();
      @for (error of firstNameErrors; track $index) {
        <mat-error>{{ error?.message }}</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput placeholder="Last name" [control]="form.lastName" />
      @let lastNameErrors = form.lastName().errors();
      @for (error of lastNameErrors; track $index) {
        <mat-error>{{ error?.message }}</mat-error>
      }
    </mat-form-field>
    <mat-form-field>
      <mat-label>Title</mat-label>
      <input matInput placeholder="Email" [control]="form.email" />
      @let emailErrors = form.email().errors();
      @for (error of emailErrors; track $index) {
        <mat-error>{{ error?.message }}</mat-error>
      }
    </mat-form-field>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      max-width: 20vw;
      margin-left: auto;
      margin-right: auto;
      margin-top: 20vh;
    }
  `,
})
export default class UserDemo {
  readonly user = signal<User>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jonh@doe.com',
  });

  readonly form = form(this.user, (user) => {
    apply(user.firstName, requiredSchema);
    apply(user.lastName, requiredSchema);
    apply(user.email, requiredSchema);
    email(user.email, { message: 'Enter a valid email' });
  });

  updateName(): void {
    this.user.set({
      ...this.user(),
      firstName: 'Lol',
    });
  }
}
