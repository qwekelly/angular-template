import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { SharedComponent } from './shared.component';

const MatComponents = [
  MatProgressBarModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ...MatComponents,
  ],
  declarations: [
    SharedComponent,
  ],
  providers: [],
})
export class SharedModule { }
