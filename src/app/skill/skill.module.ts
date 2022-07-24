import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'app/shared/shared.module';
import { SkillRoutes } from './skill.routing';

import {
  SkillIndexdbComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SkillRoutes,
  ],
  declarations: [
    SkillIndexdbComponent,
  ]
})
export class SkillModule { }
