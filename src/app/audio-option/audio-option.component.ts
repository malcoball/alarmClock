import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { audioKey, playAudioTemp } from '../main/alarmHandling';

@Component({
  selector: 'audio-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './audio-option.component.html',
  styleUrl: './audio-option.component.scss'
})
export class AudioOptionComponent {
  @Input('valueIn')valueIn : string = '';
  @Output() changeValueEvent = new EventEmitter<string>();



  clickedOnText(){
    this.changeValueEvent.emit(this.valueIn);
  }
  clickedOnAudio(){
    console.log("clicked lil");
    playAudioTemp(this.valueIn as audioKey);
    
  }


}
