import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'template-driven',
  templateUrl: 'template-driven.component.html',
  styles: [`
      .ng-invalid {
          border: 1px solid red;
      }`]
})
export class TemplateDrivenComponent {
    user = {
        username: 'Nina',
        email: 'funina@gmail.com',
        password: '11111111',
        gender: 'male'
    };

    genders = ['male', 'female'];

    onSubmit(form: NgForm) {
        console.log(form.value);
    }
}
