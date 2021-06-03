import React from "react";
import Countdown from 'react-countdown';

const Clock = (props) => {

  const countDown =
    <div className="CountDownText">
      <p className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
         style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>{props.countDownText}</p>
      {props.timeRemaining ? <Countdown  className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
                                        style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null} date={Date.now() + props.timeRemaining * 1000}/> : null}
    </div>

  return (
 <div className="TimerContainer">
   {props.countDownFocus === "timer"? countDown : props.countDownFocus === "finished"? <p className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}  style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>{props.countDownFinished}</p> : <p>Start Typing in the text field</p>}
 </div>
  );
};
export default Clock;
