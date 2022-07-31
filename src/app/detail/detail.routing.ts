import { Routes, RouterModule } from '@angular/router';
import { DetailComponent } from './detail.component';

const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
  },
];

export const DetailRoutes = RouterModule.forChild(routes);
