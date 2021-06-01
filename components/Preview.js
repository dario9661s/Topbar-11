import React from "react";
import Clock from "../components/Content/Campaign/CountDown/Clock"

const  Preview = (props) => {
  let announcement = props.products.map((product) => {
    return <p
      className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
      style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}
    >
      { props.announcment + " " + product.title}
    </p>
  })
  let shipping = <p
    className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
    style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>
    {props.shippingFocused === "more"?  props.text.moreBefore + " user cart value " + props.text.moreAfter : props.shippingFocused === "free"? props.text.free : props.shippingFocused === "empty"? props.text.empty : "Focus text fields for preview!" }
  </p>
  let link = <p
    className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
    style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>
    {props.linkText}
  </p>
  return (
    <div className="background" style={{
      width: "100%",
      backgroundColor: props.color,
      height: props.value,
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      position: "fixed",
      zIndex: "1000"
    }}>
      {props.campaign === "Announcment" ? announcement : props.campaign === "Shipping" ? shipping : props.campaign === "CountDown" ?
        <Clock countDownText={props.countDownText} timeRemaining={props.timeRemaining}/> : props.campaign === "Link"? link : null}
    </div>
  );
}
export default Preview;

