/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CscsComponent } from './cscs.component';

describe('CscsComponent', () => {
  let component: CscsComponent;
  let fixture: ComponentFixture<CscsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CscsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
