import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'baWeekName'})
export class BaWeekNamePipe implements PipeTransform {

    transform(input: string, isFull): string {
        switch (input + "") {
            case "1":
                return isFull ? "Monday" : "Mon";
            case "2":
                return isFull ? "Tuesday" : "Tue";
            case "3":
                return isFull ? "Wednessday" : "Wed";
            case "4":
                return isFull ? "Thursday" : "Thu";
            case "5":
                return isFull ? "Friday" : "Fri";
            case "6":
                return isFull ? "Saturday" : "Sat";
            case "7":
                return isFull ? "Sunday" : "Sun";
        }
    }
}
