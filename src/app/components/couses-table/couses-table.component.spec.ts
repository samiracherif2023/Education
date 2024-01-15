import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CousesTableComponent } from './couses-table.component';

describe('CousesTableComponent', () => {
  let component: CousesTableComponent;
  let fixture: ComponentFixture<CousesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CousesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CousesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
