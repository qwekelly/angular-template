/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SkillWebApiComponent } from './skill-web-api.component';

describe('SkillWebApiComponent', () => {
  let component: SkillWebApiComponent;
  let fixture: ComponentFixture<SkillWebApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillWebApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillWebApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
