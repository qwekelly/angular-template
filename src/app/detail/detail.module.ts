import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'app/shared/shared.module';
import { DetailComponent } from './detail.component';
import { DetailRoutes } from './detail.routing';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutes,
    SharedModule,
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
