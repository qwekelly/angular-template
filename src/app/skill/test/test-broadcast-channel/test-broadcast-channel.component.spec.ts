/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestBroadcastChannelComponent } from './test-broadcast-channel.component';

describe('TestBroadcastChannelComponent', () => {
  let component: TestBroadcastChannelComponent;
  let fixture: ComponentFixture<TestBroadcastChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBroadcastChannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBroadcastChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
