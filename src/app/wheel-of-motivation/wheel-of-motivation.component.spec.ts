import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WheelOfMotivationComponent } from './wheel-of-motivation.component';

describe('WheelOfMotivationComponent', () => {
  let component: WheelOfMotivationComponent;
  let fixture: ComponentFixture<WheelOfMotivationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WheelOfMotivationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WheelOfMotivationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
