import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiveAvisComponent } from './give-avis.component';

describe('GiveAvisComponent', () => {
  let component: GiveAvisComponent;
  let fixture: ComponentFixture<GiveAvisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveAvisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiveAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
