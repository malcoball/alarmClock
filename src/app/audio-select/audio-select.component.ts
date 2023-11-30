import { Component,Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { audioKey, audioOptions } from '../main/alarmHandling';
import { AudioOptionComponent } from '../audio-option/audio-option.component';

@Component({
  selector: 'audio-select',
  standalone: true,
  imports: [CommonModule,AudioOptionComponent],
  templateUrl: './audio-select.component.html',
  styleUrl: './audio-select.component.scss'
})
export class AudioSelectComponent {
  @Output() changeValueEvent  = new EventEmitter<string>();
  audioOptions  :audioKey[]   = audioOptions;
  activeValue   : string      = 'not set';
  showMenu      : boolean     = false; 

  changeValue(value:string){
    this.activeValue = value;
    this.toggleMenu();
    const parseValue = value as audioKey;
    this.changeValueEvent.emit(parseValue);
  }
  toggleMenu(){
    this.showMenu = !this.showMenu;
  }
  closeMenu(){
    this.showMenu = false;
  }
}
