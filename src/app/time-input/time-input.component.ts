import { Component,Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'time-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-input.component.html',
  styleUrl: './time-input.component.scss'
})
export class TimeInputComponent {
  @Input('time')time : string = 'time not set';
  @Input('type')type : string = 'type not set';

  @Output() increaseValueEvent = new EventEmitter<string>();

  increaseValue(value:string){
    this.increaseValueEvent.emit(value);
    this.activeElementEvent.emit(value);
  }
  @Output() activeElementEvent = new EventEmitter<string>();
  activeClicked(value:any){
    this.activeElementEvent.emit(value);
  }
  private desktopClass = {
    title : "desktop",
    container: "timeInputContainer uppercase color2 bgColor2",
    span : "title2",
    input : "bgColor2 color2 title2"
  }
  private mobileClass = {
    title : "mobile",
    container: "timeInputContainer uppercase color2 bgColor4",
    span : "title2 color1",
    input : "bgColor4 color2 title2"
  }
  classNames  = this.mobileClass;
  @HostListener('window:resize')
  handleResize(){
    this.dynamicClass();
  }

  dynamicClass(){
    if (window.innerWidth > 524 && this.classNames.title === "mobile"){
      this.classNames = this.desktopClass;
      console.log("change to desktop");
    } else 
    if (window.innerWidth <= 524 && this.classNames.title === "desktop"){
      this.classNames = this.mobileClass;
      console.log("change to mobile");
    }
  }
  constructor(){
    this.dynamicClass();
  }
}
