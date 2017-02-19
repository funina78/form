import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Rx';


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
            'username': ['Nina', [Validators.required, this.exampleValidator]],
            'email': [
                '',
                Validators.required,
                Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
            ],

        }),
        'password': ['', Validators.required],
        'gender': ['male'],
        'hobbies': formBuilder.array([
            ['Cooking', Validators.required, this.asyncExampleValidator],
        ])
    });

    this.myForm.valueChanges.subscribe(
        (data: any) => console.log(data)
    );

    this.myForm.statusChanges.subscribe(
        (data: any) => console.log(data)
    );
 }

    onAddHobbie() {
        //cast the type to FormArray
        (<FormArray>this.myForm.get('hobbies')).push(new FormControl('', Validators.required, this.asyncExampleValidator));
    }
    onSubmit() {
        console.log(this.myForm);
    }
    // return value is a key value pair, key is a string, value is boolean type
    exampleValidator(control: FormControl): {[s: string]: boolean} {
        //return anything means validation fail. In case of validation fail, has to return value (true), can't return value (false)
        if (control.value === 'Example') {
            return {example: true};
        }
        //return null if validation pass
        return null;
    }

    asyncExampleValidator(control: FormControl): Promise<any> | Observable<any> {
        const promise = new Promise<any>(
            (resolve, reject) => {
                setTimeout(() => {
                    if (control.value === 'Example') {
                        resolve({'invalid': true}); //resolve and return value true, means validation failed
                    } else {
                        resolve(null);
                    }
                }, 1500);
            }
        );
        return promise;
    }
}
