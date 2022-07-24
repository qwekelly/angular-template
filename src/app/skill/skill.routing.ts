import { Routes, RouterModule } from '@angular/router';

import { SkillIndexdbComponent } from './skill-indexdb/skill-indexdb.component';

const routes: Routes = [
  {
    path: 'indexdb',
    component: SkillIndexdbComponent,
  },
];

export const SkillRoutes = RouterModule.forChild(routes);
