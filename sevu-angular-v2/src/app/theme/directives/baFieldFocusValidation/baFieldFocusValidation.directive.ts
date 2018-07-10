import {Directive, HostBinding, Input} from "@angular/core";
import {NgModel} from "@angular/forms";

@Directive({
    selector: '[baFieldFocusValidation]',
})
export class BaFieldFocusValidation {

    @Input('input') set input(i: NgModel) {
        if (i) {
            i.statusChanges.subscribe(s => {
                if (i.control.touched) {
                    if (s == 'VALID') {
                        this.isError = false;
                    }
                    else if (s == 'INVALID') {
                        this.isError = true;
                    }
                }
            });

        }
    };

    @HostBinding('class.has-danger') isError: boolean = false;

    classAdd(name) {

        // this.classesString = "new class"

    }

    //
    // classRemove(name) {
    //   if (this.classes) {
    //     this.classes.replace(name, "");
    //   }
    // }
    //
    // private addTouchedClass() {
    //   if (this.classes) {
    //     var classesArray = this.classes.split(" ");
    //     classesArray.push("css-touched-calls");
    //     this.classes = classesArray.join(" ")
    //   }
    // }
}
