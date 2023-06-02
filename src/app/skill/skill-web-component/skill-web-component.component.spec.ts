import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillWebComponentComponent } from './skill-web-component.component';

describe('SkillWebComponentComponent', () => {
  let component: SkillWebComponentComponent;
  let fixture: ComponentFixture<SkillWebComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillWebComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillWebComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
