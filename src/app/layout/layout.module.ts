import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent,
  ],
  providers: [],
})
export class LayoutModule { }
