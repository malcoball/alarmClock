import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioOptionComponent } from './audio-option.component';

describe('AudioOptionComponent', () => {
  let component: AudioOptionComponent;
  let fixture: ComponentFixture<AudioOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioOptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AudioOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
