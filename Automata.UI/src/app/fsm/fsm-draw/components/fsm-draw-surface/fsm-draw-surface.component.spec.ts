import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FsmDrawSurfaceComponent } from './fsm-draw-surface.component';

describe('FsmDrawSurfaceComponent', () => {
  let component: FsmDrawSurfaceComponent;
  let fixture: ComponentFixture<FsmDrawSurfaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FsmDrawSurfaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FsmDrawSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
