import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datef'
})
export class DatefPipe implements PipeTransform {

  // 日期格式化 将20170811转化为2017-08-11
  transform(value: string) {
    var dat1 = value.toString();
    return dat1.substring(0, 4) + "-" + parseInt(dat1.substring(4, 6)) + "-" + dat1.substring(6, 8);
  }

}
