import React from "react";
import Clock from "../components/Content/Campaign/CountDown/Clock"

const  Preview = (props) => {
  let announcement = props.products.map((product) => {

    return <p
      className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}
      style={ props.animation === "left" || props.animation === "right" ? {flex: "1"} : null}
    >
      {props.announcment + " " + product.name}
    </p>
  })
  let shipping = <p
    className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}
    style={props.animation === "left" || props.animation === "right" ? {flex: "1"} : null}>
    {props.shippingFocused === "more"?  props.text.moreBefore + " user cart value " + props.text.moreAfter : props.shippingFocused === "free"? props.text.free : props.shippingFocused === "empty"? props.text.empty : "Focus text fields for preview!" }
  </p>
  let link = <p
    className={props.animation === "left" ? "animation" : props.animation === "right" ? "animationRight" : props.animation === "pulse" ? "animationPulse" : props.animation === "vibrate" ? "vibrate-1" : null}
    style={ props.animation === "left" || props.animation === "right" ? {flex: "1"} : null}>
    {props.linkText}
  </p>
  console.log(props.fontColor)
  return (
    <div className="background" style={{
      width: "100%",
      color: props.fontColor,
      backgroundColor: props.color,
      height: props.value,
      fontSize: props.fontSize,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      position: "fixed",
      zIndex: "1000"
    }}>
      {props.campaign === "Announcment" ? announcement : props.campaign === "Shipping" ? shipping : props.campaign === "CountDown" ?
        <Clock animation = {props.animation} countDownFinished = {props.countDownFinished} countDownFocus = {props.countDownFocus} countDownText={props.countDownText} timeRemaining={props.timeRemaining}/> : props.campaign === "Link"? link : null}
    </div>
  );
}
export default Preview;

