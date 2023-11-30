import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeDisplayComponent } from '../time-display/time-display.component';
import { TimeInputComponent } from '../time-input/time-input.component';
import { valueOver, numberToClock, getCurrentTime, addToCurrentTime, addToCurrentTimeArr, getCurrentTimeArr, valueUnder } from './timeParsing';
import { AudioSelectComponent } from '../audio-select/audio-select.component';
import { audioKey,alarm, setAudio } from './alarmHandling';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule,TimeDisplayComponent,TimeInputComponent,AudioSelectComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})

export class MainComponent {
  @Input('title') title = ''; 
  private date = new Date();
  private timeTypes = ['hr','min','sec'];
  timeLimits = [24,60,60];
  alarmSet : boolean = false;
  buttonClicked : boolean = false;
  selectedAudio : audioKey = 'scream1';
  counter :any = null;


  getSelectedAudio(){
    return this.selectedAudio;
  }
  changeAudio(audioIn:string){
    const audioParse = audioIn as audioKey;
    this.selectedAudio = audioParse;
    setAudio(audioParse);
  }
  setCounter(start:boolean){
    if (start){
      this.counter = setInterval(()=>{
        if (this.alarmSet){
          this.countdown[2].time--;
          if (this.countdown[2].time < 0){
            this.countdown[2].time = 59;
            this.countdown[1].time --;
          }
          if (this.countdown[2].time + this.countdown[1].time + this.countdown[0].time == 0){
            this.alarmSet = false;
            this.buttonClicked = false;
            clearInterval(this.counter);
            this.counter = null;
            alarm();
          }
        }
      },1000);
    } else {
      clearInterval(this.counter);
      this.counter = null;
    }
  }

  
  countdown : {type : string,time: number}[] = [
    {type:'hr',time : 0},
    {type:'min',time : 0},
    {type:'sec',time : 0},
  ];

    time :[number,number,number] = [
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
    ]

  changeTime(value:any,target:number){
      // Replace the time value
      this.time[target] = value;
      // Change the countdown values to match, ignore what they're already set to
      // Get the difference, this will be the countdown
      const currentTime = getCurrentTimeArr();
      let remainder = 0;
      const difference : [number,number,number] = [0,0,0];
      for (let i = this.time.length-1; i>= 0; i--){
        const value = valueUnder(this.time[i] - currentTime[i] - remainder)
        difference[i] =  value[0];
        remainder = value[1];
        this.increaseValue(this.timeTypes[i],difference[i].toString()); 
      }
    }

  increaseValue(target:string,valueNew:string){
    let updateTime = false;
    const value = parseInt(valueNew);
    const maxValue = target === "hr" ? 24 : 60; // Not sure this is needed as hr doesn't do this.
    let values = valueOver(value,maxValue);  

    switch(target){
      case 'hr' : 
        this.countdown[0].time = value; 
        updateTime = true;
        break;

      case 'min' : 

      this.countdown[1].time = values[0]; 
      if (values.length > 1) this.countdown[0].time += values[1];
      
      updateTime = true;
        break;

      case 'sec' : 

        this.countdown[2].time = values[0]; 
        if (values.length > 1) this.countdown[1].time += values[1];
        
        updateTime = true;
        break;

      default : console.log(target," not recognised"); break;
    }
    
  };
  valueActive(value:any){
    this.setTime();
    if (this.buttonClicked){
    let active = typeof(value) === "string" ? false : true;
      if (active){
        this.setCounter(false);
      } else {
        this.setCounter(true);
      }
    }
  }
  setAlarm(){
    this.buttonClicked = !this.buttonClicked;
  // Update time display
    this.setTime();
    this.alarmSet = true;
    if (this.counter === null){
      this.setCounter(true);
    } else {
      this.setCounter(false);
    }
  }
  setTime(){
    const numbers = [
      this.countdown[0].time,
      this.countdown[1].time,
      this.countdown[2].time,
    ]
    // this.time = numberToClock(numbers);
    this.time = addToCurrentTimeArr(numbers);
  }

}
