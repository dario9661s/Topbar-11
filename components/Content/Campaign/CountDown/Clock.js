import React from "react";
import Countdown from "react-countdown";
import FlipCountdown from '@rumess/react-flip-countdown';


const Clock = (props) => {
  const countDown = (
    <div className="CountDownText">
      <p
        className={
          props.animationProps.animation +
          props.animationProps.animationSecounds +
          props.animationProps.animationTiming
        }
        style={
          props.animationProps.animation === "Left-Right" ||
          props.animationProps.animation === "Right-Left"
            ? { flex: "1" }
            : null
        }
      >
        {props.countDown.countDownText}
      </p>
      {props.countDown.timeRemaining ? (
       // <CountDown
          // date={Date.now() + props.countDown.timeRemaining * 1000}
      //  />
        <FlipCountdown
          hideYear
          hideMonth
          endAt={props.countDown.timeRemaining}
        />
      ) : null}
    </div>
  );
  let classes = props.animationProps.animation + props.animationProps.animationSecounds + props.animationProps.animationTiming
  return (
    <div className =  {[classes, "TimerContainer"].join(' ')}  style={props.animationProps.animation === "Left-Right" || props.animationProps.animation === "Right-Left" ? { flex: "1" } : null}>
      {props.icons}
      {props.countDown.countDownFocus === "timer" ? (
        countDown
      ) : props.countDown.countDownFocus === "finished" ? (
        <p

        >
          {props.countDown.countDownFinished}
        </p>
      ) : (
        <p>Start Typing in the text field</p>
      )}
      {props.iconsRot}
    </div>
  );
};
export default Clock;
