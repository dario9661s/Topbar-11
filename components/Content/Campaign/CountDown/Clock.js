import React, {useEffect, useState} from "react";
import Countdown from 'react-countdown';
import axioss from "axios";

const Clock = (props) => {

  return (
 <div className="TimerContainer">
   <p>{props.countDownText}</p>
   {props.timeRemaining ? <Countdown date={Date.now() + props.timeRemaining * 1000}/> : null}
 </div>
  );
};
export default Clock;
