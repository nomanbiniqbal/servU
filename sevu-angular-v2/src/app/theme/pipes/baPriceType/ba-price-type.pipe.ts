import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'baPriceType'
})
export class BaPriceTypePipe implements PipeTransform {

    transform(value: any, args?: any): any {
        switch (value + "") {
            case "1":
                return 'Week';
            case "2":
                return 'Month';
            case "3":
                return 'Year';
        }
    }

}
