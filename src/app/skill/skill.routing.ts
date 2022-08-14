import { Routes, RouterModule } from '@angular/router';

import { 
  SkillIndexdbComponent,
  AngularSelectionModelComponent,
} from './index';

const routes: Routes = [
  {
    path: 'indexdb',
    component: SkillIndexdbComponent,
  },
  {
    path: 'angular',
    children: [
      {
        path: 'selection-model',
        component: AngularSelectionModelComponent,
      },
    ],
  },
];

export const SkillRoutes = RouterModule.forChild(routes);
