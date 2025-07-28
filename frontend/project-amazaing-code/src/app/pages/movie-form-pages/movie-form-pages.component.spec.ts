import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieFormPagesComponent } from './movie-form-pages.component';

describe('MovieFormPagesComponent', () => {
  let component: MovieFormPagesComponent;
  let fixture: ComponentFixture<MovieFormPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieFormPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieFormPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
