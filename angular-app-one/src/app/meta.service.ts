import { Injectable } from '@angular/core';

@Injectable()
export class MetaService {

  constructor() { }
  getNames(): any[] {
    return [
      {id: 1, name: 'AAA'},
      {id: 2, name: 'BBB'},
      {id: 3, name: 'CCC'},
      {id: 4, name: 'DDD'},
      
    ]
  }
}
