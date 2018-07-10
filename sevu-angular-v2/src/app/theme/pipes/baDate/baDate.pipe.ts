import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment";
@Pipe({name: 'baDate'})
export class BaDate implements PipeTransform {

    transform(input: string, from: string, to: string): string {
        return moment(input, from).format(to);
    }
}
