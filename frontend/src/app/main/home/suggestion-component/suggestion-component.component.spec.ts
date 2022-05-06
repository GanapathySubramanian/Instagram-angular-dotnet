import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionComponentComponent } from './suggestion-component.component';

describe('SuggestionComponentComponent', () => {
  let component: SuggestionComponentComponent;
  let fixture: ComponentFixture<SuggestionComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestionComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
