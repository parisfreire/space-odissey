import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptsFormContainer } from './form.container';

describe('FormContainer', () => {
  let component: PromptsFormContainer;
  let fixture: ComponentFixture<PromptsFormContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptsFormContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(PromptsFormContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
