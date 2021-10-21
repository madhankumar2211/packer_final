import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateprofieComponent } from './updateprofie.component';

describe('UpdateprofieComponent', () => {
  let component: UpdateprofieComponent;
  let fixture: ComponentFixture<UpdateprofieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateprofieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateprofieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
