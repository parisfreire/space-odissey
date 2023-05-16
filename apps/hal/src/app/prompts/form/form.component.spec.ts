import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptsFormComponent } from './form.component';

describe('PromptsFormComponent', () => {
  let component: PromptsFormComponent;
  let fixture: ComponentFixture<PromptsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
