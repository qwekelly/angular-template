/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SkillIndexdbComponent } from './skill-indexdb.component';

describe('SkillIndexdbComponent', () => {
  let component: SkillIndexdbComponent;
  let fixture: ComponentFixture<SkillIndexdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillIndexdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillIndexdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
