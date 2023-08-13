import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularNestedFormsComponent } from './angular-nested-forms.component';

describe('AngularNestedFormsComponent', () => {
  let component: AngularNestedFormsComponent;
  let fixture: ComponentFixture<AngularNestedFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularNestedFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularNestedFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
