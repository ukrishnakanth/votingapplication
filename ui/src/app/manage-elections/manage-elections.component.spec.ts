import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageElectionsComponent } from './manage-elections.component';

describe('ManageElectionsComponent', () => {
  let component: ManageElectionsComponent;
  let fixture: ComponentFixture<ManageElectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageElectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
