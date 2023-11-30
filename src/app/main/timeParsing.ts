export function valueOver(valueIn:number|string,maxValue:number){
    // Parse valueIn
    let valueParse = typeof(valueIn) === "string" ? parseInt(valueIn) : valueIn;
    let output = [0,0];
    while(valueParse >= maxValue){
        valueParse -= maxValue;
        output[1] ++;
    } 
    output[0] = valueParse;

    return output;
}
export function valueUnder(valueIn:number|string) :[number,number]{
    let valueParse = typeof(valueIn) === "string" ? parseInt(valueIn) : valueIn;
    const output:[number,number] = [0,0];
    while(valueParse < 0){
        valueParse += 60;
        output[1] ++;
    }
    output[0] = valueParse;

    return output;
}

export function numberToClockSingle(numberIn:number){
    let output = numberIn.toString();
    if (output.length < 2) output = `0${output}`;
    return output;
}
export function numberToClock(numbersIn:number[]){
    let output = "";
    numbersIn.forEach(number=>{
        output += numberToClockSingle(number) + ":";
    })
    output = output.slice(0,output.length-1);
    return output;
}

export function addToCurrentTime(values:number[]){
    const Time = new Date();
    const secs = valueOver(Time.getSeconds() + values[2],60);
    const mins = valueOver(Time.getMinutes() + values[1]+secs[1],60);
    const hour = valueOver(Time.getHours() + values[0]+mins[1],24);
    return numberToClock([hour[0],mins[0],secs[0]]);
}
export function addToCurrentTimeArr(values:number[]):[number,number,number]{
    const Time = new Date();
    const secs = valueOver(Time.getSeconds() + values[2],60);
    const mins = valueOver(Time.getMinutes() + values[1]+secs[1],60);
    const hour = valueOver(Time.getHours() + values[0]+mins[1],24);
    return [hour[0],mins[0],secs[0]];
}

export function getCurrentTime(){
    const Time = new Date();
    return numberToClock([Time.getHours(),Time.getMinutes(),Time.getSeconds()]);
}
export function getCurrentTimeArr():[number,number,number]{
    const Time = new Date();
    return ([Time.getHours(),Time.getMinutes(),Time.getSeconds()]);
}