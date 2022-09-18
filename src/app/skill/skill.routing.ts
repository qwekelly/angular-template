import { Routes, RouterModule } from '@angular/router';

import { 
  SkillIndexdbComponent,
  SkillWebApiComponent,
  AngularSelectionModelComponent,
  TestBroadcastChannelComponent,
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
  {
    path: 'test',
    children: [
      {
        path: 'broadcast-channel',
        component: TestBroadcastChannelComponent,
      },
    ],
  },
];

export const SkillRoutes = RouterModule.forChild(routes);
