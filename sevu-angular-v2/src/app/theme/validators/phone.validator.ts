/**
 * Created by Mian on 3/29/2017.
 */
import {AbstractControl} from '@angular/forms';


export class PhoneValidator {





  public static validate(c:AbstractControl) {
    let phone_REGEXP =/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/

    return phone_REGEXP.test(c.value) ? null : {
        validatePhone: {

          valid: false

        }
      };


  }
}
