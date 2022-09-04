import { Routes, RouterModule } from '@angular/router';

import { 
  SkillIndexdbComponent,
  SkillWebApiComponent,
  AngularSelectionModelComponent,
} from './index';

const routes: Routes = [
  {
    path: 'indexdb',
    component: SkillIndexdbComponent,
  },
  {
    path: 'web-api',
    component: SkillWebApiComponent,
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
