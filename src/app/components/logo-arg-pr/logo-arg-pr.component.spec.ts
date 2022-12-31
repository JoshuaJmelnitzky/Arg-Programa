import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoArgPrComponent } from './logo-arg-pr.component';

describe('LogoArgPrComponent', () => {
  let component: LogoArgPrComponent;
  let fixture: ComponentFixture<LogoArgPrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoArgPrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoArgPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
