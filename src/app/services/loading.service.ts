import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  timer: any

  isLoading$: BehaviorSubject<boolean>

  constructor() {
    this.isLoading$ = new BehaviorSubject<boolean>(false)
  }

  start(): void {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.isLoading$.next(true)
    }, 0)
  }

  stop(): void {
    clearTimeout(this.timer)
    this.isLoading$.next(false)
  }
}
