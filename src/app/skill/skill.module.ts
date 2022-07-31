import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SkillRoutes } from './skill.routing';

import {
  SkillIndexdbComponent,
  ModalEditIndexdbDataComponent,
} from './index';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SkillRoutes,
  ],
  declarations: [
    SkillIndexdbComponent,
    ModalEditIndexdbDataComponent,
  ]
})
export class SkillModule { }
