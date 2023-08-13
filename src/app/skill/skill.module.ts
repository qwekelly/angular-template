import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { SkillRoutes } from './skill.routing';
import '../../assets/disk/web-ui.min.js';

import {
  SkillIndexdbComponent,
  SkillWebApiComponent,
  SkillWebComponentComponent,
  SkillIntersectionComponent,
  AngularSelectionModelComponent,
  ModalEditIndexdbDataComponent,
  TestBroadcastChannelComponent,
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
    SkillWebApiComponent,
    SkillWebComponentComponent,
    SkillIntersectionComponent,
    AngularSelectionModelComponent,
    ModalEditIndexdbDataComponent,
    TestBroadcastChannelComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SkillModule { }
