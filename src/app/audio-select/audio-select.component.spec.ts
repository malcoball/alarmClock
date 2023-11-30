import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioSelectComponent } from './audio-select.component';

describe('AudioSelectComponent', () => {
  let component: AudioSelectComponent;
  let fixture: ComponentFixture<AudioSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
