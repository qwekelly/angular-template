import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site.component';

const routes: Routes = [
  {  
    path: '',
    component: SiteComponent,
  },
];

export const SiteRoutes = RouterModule.forChild(routes);
