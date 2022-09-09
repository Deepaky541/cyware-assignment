
import './App.css';
import { useEffect,useState } from 'react';

function App({flag}) {




function calcAngle(h, m) {
  if(h>12)
  {
    h=h%12;
  }
  console.log(h);
  if(h<0||m<0||h>12||m>60) {
    return;
  }

  if(h==12)
  {h=0}
  if(m==60) {
    m=0;
    h+=1;
    if (h>12)
    {
      h=h-12
    }
  }
  let hour_angle = 0.5 * (h * 60 + m);
  let minute_angle = 6 * m;
  let angle = Math.abs(hour_angle - minute_angle);
  console.log(angle)
  angle = Math.min(360 - angle, angle);
  return angle;
}


  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
     let ang = calcAngle(hours,minutes);
     setangle(ang)
    return hours + ":" + minutes + ":" + seconds
  }

    let time = new Date().toLocaleTimeString();
    const [fl, setfl] = useState(flag)
    const [upTime, setUpTime] = useState(time);
    const [inpTime, setinpTime] = useState(0);
    const [hrs, sethrs] = useState(0);
    const [mins, setmins] = useState(0);
    const [duration, setduration] = useState();
    const [angle, setangle] = useState(0);
    const [initangle, setinitangle] = useState(0)
    

  useEffect(() => {
     let id=setInterval(()=>{
      setduration((duration)=>
        duration+1000);
        msToTime(duration);
     },1000)
     setinpTime(() => msToTime(duration));
     return()=>{
       clearInterval(id);
     }
  },[duration])
 
  
useEffect(()=>{
  let min=0;
  let hr=0;
    var id = setInterval(() => {
    time = new Date().toLocaleTimeString();
    let dt=new Date();
    min=dt?.getMinutes();
    hr=dt?.getHours();
     let ang = calcAngle(hr,min);
     setinitangle(ang);
    setUpTime(time);
  },1000);
      return()=>{
        clearInterval(id);
      }
},[])

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    setfl(false);
     let dur = hrs * 3600000 + mins * 60000;
     setduration(dur);
  }


  return (
    <div className="App">
      <h1 style={{paddingBottom:"50px"}}>Please put time in 24hrs format</h1>
      <div className="inpt">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='hrs'>
            <label>Hours</label>
            <input
              type="number"
              min="0"
              max="23"
              onChange={(e) => {
                sethrs(e.target.value);
              }}
            />
          </div>
          <div className='mins'>
            <label htmlFor="">Mins</label>
            <input
              type="number"
              min="0"
              max="59"
              onChange={(e) => {
                setmins(e.target.value);
              }}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      <div className="show">
        <h1>{fl? upTime : inpTime}</h1>
      </div>
      <h1>angle between hour and minute:{fl?initangle.toFixed(2):angle.toFixed(2)}</h1>
      <h1>It will change angle in every minute</h1>
    </div>
  );
}

export default App;
