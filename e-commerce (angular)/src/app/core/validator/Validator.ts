import { AbstractControl, ValidatorFn } from "@angular/forms";

export function validName(nameRegex?: RegExp): ValidatorFn {
    let Reg = nameRegex == undefined ? /[0-9]/g : nameRegex;
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value.match(Reg)) {
            return { errorName: true };
        }
        return null;
    };
}

export function validEmail(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail|emailbbox|example|hotmail|outlook)\.(pro|com|net|org)$/;
    if (control.value && !emailPattern.test(control.value)) {
        return { errorEmail: true };
    } else {
        return null;
    }
}


export function validNoSpecialChar(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value && /[!@#$%^&*()+\=\[\]{};':"\\|<>\/?]+/.test(control.value)) {
        return { errorSpecialChar: true };
    } else {
        return null;
    }
}
    export function validNumber(control: AbstractControl): { [key: string]: boolean } | null {
        if (control.value.match(/[a-zA-Z]/)) {
            return { errorNumber: true };
        }
        return null;
    }
    export function validUrlImage(control: AbstractControl): { [key: string]: boolean } | null {
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (control.value && !urlPattern.test(control.value)) {
            return { invalidUrl: true };
        } else {
            return null;
        }
    } 
    export function passwordValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const value: string = control.value;

            const hasLowercase = /[a-z]/.test(value);
            const hasUppercase = /[A-Z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
            const isLengthValid = value.length >= 6;

            if (!hasLowercase || !hasUppercase || !hasNumber || !hasSpecialChar || !isLengthValid) {
                return {
                    invalidPassword: true
                };
            }

            return null;
        }
    }
