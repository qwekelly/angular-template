import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillIntersectionComponent } from './skill-intersection.component';

describe('SkillIntersectionComponent', () => {
  let component: SkillIntersectionComponent;
  let fixture: ComponentFixture<SkillIntersectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillIntersectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillIntersectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
