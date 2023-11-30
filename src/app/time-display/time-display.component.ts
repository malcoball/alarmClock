import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'time-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-display.component.html',
  styleUrl: './time-display.component.scss'
})
export class TimeDisplayComponent {
  @Input('time')time : number = 0;
  @Input('int')int : number = 0;
  @Input('timeLimit')timeLimit : number = 0;
  displayValue :string = "not set";
  ngOnInit(){
    this.displayValue = this.time.toString();
    if (this.displayValue.length === 1) this.displayValue = "0"+this.displayValue;
  }
  display : string = this.time > 9 ? this.time.toString() : "0"+this.time.toString(); 
  show : boolean = this.int < 2;
  @Output() increaseValueEvent = new EventEmitter<string>();

  changeValue(value:string){
    let num = parseInt(value);
    if (num > this.timeLimit) num = this.timeLimit;
    if (num < 0) num = 0;
    this.time = num;
    console.log("input : ",value)
    console.log("num : ",num);

    this.increaseValueEvent.emit(num.toString());
  }
}
