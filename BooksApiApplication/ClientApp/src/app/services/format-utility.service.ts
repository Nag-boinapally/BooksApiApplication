import { Injectable, Inject } from '@angular/core';
import * as angular from 'angular';


@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    @Inject('$window') private $window: any,
    @Inject('$uibModal') private $uibModal: any
    
  ) {
  }

  public CaseInsensitiveBooleanCheck(val: any) {
    if (typeof val === "string") {
      if (val.toLowerCase() === "true" || val === "1") {
        return true;
      }
    } else if (typeof val === "number") {
      if (val === 1) {
        return true;
      }
    }
    return false;
  }

  public GetQueryString(field: any, url: any) {
    let href = url ? url : this.$window.location.href;
    let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    let string = reg.exec(href);
    return string ? string[1] : null;
  }



  public ParseBoolean(inputValue: any) {
    if (typeof inputValue === "boolean") {
      return inputValue;
    }
    else if (typeof inputValue === "number") {
      return inputValue === 1;
    }
    else {
      return ((inputValue.toLowerCase() === "true" || inputValue.toLowerCase() === "1")) ? true : false;
    }
  }

  public ReplaceSpecialCharacters(xmlString:any) {
      xmlString = xmlString.replace(/\&/g, '&amp;');
      return xmlString;
  }

  public GetAge(birthDate: any, admitDate: any) {
    let age : any = 0;
    admitDate = new Date(admitDate);
    birthDate = new Date(birthDate);
    if (!admitDate.getDate() || !birthDate.getDate()) {
      age = '';
    } else {
      let admissionYear = admitDate.getUTCFullYear();
      let birthYear = birthDate.getUTCFullYear();
      if (admissionYear != birthYear && admissionYear > birthYear) {
        age = admissionYear - birthYear;
      }        
      let m = admitDate.getUTCMonth() - birthDate.getUTCMonth();
      if ((m < 0 || (m === 0 && admitDate.getUTCDate() < birthDate.getUTCDate())) && admissionYear != birthYear) {
        age--;
      }
    }
    return age;
  }

  public GetAgeInDays(birthDate: any, admitDate: any) {
    admitDate = new Date(admitDate);
    birthDate = new Date(birthDate);
    const diff = Math.floor(admitDate.getTime() - birthDate.getTime()); //miliseconds
    const calc: any = diff / (1000 * 60 * 60 * 24);
    return parseInt(calc);
  }

  public StringFormat(formatedText: any, formatValues: any) {
    for (let i = 0; i < formatValues.length; i++) {
      let regexp = new RegExp('\\{' + i + '\\}', 'gi');
      formatedText = formatedText.replace(regexp, formatValues[i]);
    }
    return formatedText; 
  }


 
  // Needed to compare rgb to hex colors
  public RgbToHex(color: any) {
    color = color.replace(/\s/g, "");
    let aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    if (aRGB) {
      color = '';
      for (let i = 1; i <= 3; i++) {
        color += Math.round((aRGB[i][aRGB[i].length - 1] == "%" ? 2.55 : 1) * parseInt(aRGB[i])).toString(16).replace(/^(.)$/, '0$1');
      }
    }
    else {
      color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
    }
    return '#' + color;
  }

  public RemoveBadChars(InStr: string) {
    InStr = InStr.replace(/\</g, "");
    InStr = InStr.replace(/\>/g, "");
    InStr = InStr.replace(/\"/g, "");
    InStr = InStr.replace(/\'/g, "");
    InStr = InStr.replace(/\%/g, "");
    InStr = InStr.replace(/\;/g, "");
    InStr = InStr.replace(/\(/g, "");
    InStr = InStr.replace(/\)/g, "");
    InStr = InStr.replace(/\&/g, "");
    InStr = InStr.replace(/\+/g, "");
    return InStr;
  }

}
