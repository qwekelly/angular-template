import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private api: ApiService,
  ) { }

  getMarkDownFile(fileName: string) {
    return this.api.getText(`/assets/markdown/${fileName}.md`);
  }
}
