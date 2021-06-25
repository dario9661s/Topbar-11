import React from "react";
import Countdown from 'react-countdown';

const Clock = (props) => {

  const countDown =
    <div className="CountDownText">
      <p className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}
         style={props.animation === "left" || props.animation === "right" ? {flex: "1"} : null}>{props.countDownText}</p>
      {props.timeRemaining ? <Countdown  className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}
                                        style={props.animation === "left" || props.animation === "right" ? {flex: "1"} : null} date={Date.now() + props.timeRemaining * 1000}/> : null}
    </div>

  return (
 <div className="TimerContainer">
   {props.countDownFocus === "timer"? countDown : props.countDownFocus === "finished"? <p className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}  style={props.animation === "left" || props.animation === "right" ? {flex: "1"} : null}>{props.countDownFinished}</p> : <p>Start Typing in the text field</p>}
 </div>
  );
};
export default Clock;
