import React from "react";
import Countdown from "react-countdown";

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
        <Countdown
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
          date={Date.now() + props.countDown.timeRemaining * 1000}
        />
      ) : null}
    </div>
  );

  return (
    <div className="TimerContainer">
      {props.countDown.countDownFocus === "timer" ? (
        countDown
      ) : props.countDown.countDownFocus === "finished" ? (
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
          {props.countDown.countDownFinished}
        </p>
      ) : (
        <p>Start Typing in the text field</p>
      )}
    </div>
  );
};
export default Clock;
