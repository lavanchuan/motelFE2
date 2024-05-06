import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoLoadComponent } from './auto-load.component';

describe('AutoLoadComponent', () => {
  let component: AutoLoadComponent;
  let fixture: ComponentFixture<AutoLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLoadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutoLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
