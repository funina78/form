import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'data-driven',
    templateUrl: 'data-driven.component.html'
})
export class DataDrivenComponent {
    myForm: FormGroup;

    genders = ['male', 'female'];

 constructor(private formBuilder: FormBuilder) {
     // way 1, do not use formBuilder
    // this.myForm = new FormGroup({
    //     'userData': new FormGroup({
    //         'username': new FormControl('Nina', Validators.required),
    //         'email': new FormControl('', [
    //             Validators.required,
    //             Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
    //
    //     }),
    //     'password': new FormControl('', Validators.required),
    //     'gender': new FormControl('male'),
    //     'hobbies': new FormArray([
    //         new FormControl('Cooking', Validators.required)
    //     ])
    // });


//way 2 : user formBuilder
    this.myForm = formBuilder.group({
        'userData': formBuilder.group({
            'username': ['Nina', Validators.required],
            'email': ['',
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"), ]

        }),
        'password': ['', Validators.required],
        'gender': ['male'],
        'hobbies': formBuilder.array([
            ['Cooking', Validators.required],
        ])
    });
 }

    onAddHobbie() {
        //cast the type to FormArray
        (<FormArray>this.myForm.get('hobbies')).push(new FormControl('', Validators.required));
    }
     onSubmit() {
         console.log(this.myForm);
     }
}
