import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DetailRoutes } from './detail.routing';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutes,
  ],
  declarations: [DetailComponent]
})
export class DetailModule { }
