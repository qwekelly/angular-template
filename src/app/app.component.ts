import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-template';

  isLoading = false;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
  ) {
    this.loadingService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      console.log(event);
      if (event instanceof NavigationStart) {
        this.loadingService.start();
        return;
      }
      if (event instanceof NavigationEnd) {
        this.loadingService.stop();
        return;
      }
    })
  }
}
