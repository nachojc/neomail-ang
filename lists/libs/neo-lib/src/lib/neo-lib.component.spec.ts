import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeoLibComponent } from './neo-lib.component';

describe('NeoLibComponent', () => {
  let component: NeoLibComponent;
  let fixture: ComponentFixture<NeoLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeoLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeoLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
