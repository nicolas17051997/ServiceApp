import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoductsComponent } from './view-poducts.component';

describe('ViewPoductsComponent', () => {
  let component: ViewPoductsComponent;
  let fixture: ComponentFixture<ViewPoductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
