import React from "react";
import Clock from "../components/Content/Campaign/CountDown/Clock"

const  Preview = (props) => {
  console.log(props)
  let announcment =  props.products.map((product) => {
                  return <p className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
                            style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}
                          >
                          {props.announcment ===  undefined? product && product.title : props.announcment + " " + product.title}
                          </p>
  })
  let shipping =  <p  className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
                      style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>
                      {/*{props.text.moreBefore === undefined || props.text.moreAfter === undefined ? null : props.text.moreBefore + " " + "$ Ammount" +  " " +props.text.moreAfter}*/}
                    Text Field Content!
                  </p>
  return (
    <div className="background" style={{ width:"100%", backgroundColor:props.color, height:props.value,display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"1000"}}>
        {props.campaign === "Announcment"? announcment  : props.campaign === "Shipping"? shipping : props.campaign === "CountDown"?  <Clock countDownText ={props.countDownText} timeRemaining={props.timeRemaining}/> : null }
    </div>
  );
}
export default Preview;

