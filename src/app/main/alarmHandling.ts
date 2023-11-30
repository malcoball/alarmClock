export type audioKey = 'helix' | 'rabbit' |'scumbag';
export const audioOptions :audioKey[] =[
    'helix',
    'rabbit',
    'scumbag'
] 
export function alarm(){
    audioTrigger();
}
let audio = new Audio();
audio.src = `../../assets/Audio/${audioOptions[0]}.mp3`;
audio.load();
export function setAudio(audioInp:audioKey){
    audio.src = `../../assets/Audio/${audioInp}.mp3`;
    audio.load();
}
function audioTrigger(triggeAlert:boolean = true){
    try {
        // let audio = new Audio();
        // audio.src =`../../assets/Audio/${audioInp}.wav`;
        // audio.load();
        audio.play().then(
            ()=>{
                if (triggeAlert) alert("alarm");
            }
        )
    } catch (error) {
        console.error(error);        
    }
}
export function playAudioTemp(audioInp:audioKey){
    const audioTemp = audio.src;
    audio.src = `../../assets/Audio/${audioInp}.mp3`;
    audio.load();
    audio.play().then(
        ()=>{
            let audioStop = setInterval(()=>{
                if (audio.paused){
                    clearInterval(audioStop);
                    audio.src = audioTemp;
                    audio.load();
                } else {
                }
            },100)
        }
    )
    
}