import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(movieDetails: any, filterString: string) {

    if (filterString.length === 0 || filterString=="")
      return movieDetails;

    const selected = new Set();

      //if no option was selected 
      for (const employee of movieDetails) {
        const check = employee['movieName'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
      for (const employee of movieDetails) {
        const check = employee['theaterName'].substring(0, filterString.length);
        if (check.toLowerCase() === filterString.toLowerCase())
          selected.add(employee);
      }
    
      return selected;
    }
}
