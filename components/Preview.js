import React from "react";
const  Preview = (props) => {
  console.log(props)
  return (
    <div className="background" style={{ width:"100%", backgroundColor:props.color, height:props.value,display: "flex", justifyContent: "space-around", alignItems: "center", position: "fixed", zIndex:"1000"}}>
        {props.campaign === "Announcment"?
          props.products.map((product) => {
          return <p
                    className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
                    style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}
                  >
                    {props.announcment ===  undefined? product.title : props.announcment + " " + product.title}
                </p>
        }) : <p  className={props.checked === "left" ? "animation" : props.checked === "right" ? "animationRight" : props.checked === "pulse" ? "animationPulse" : props.checked === "vibrate" ? "vibrate-1" : props.checked === "jello" ? "jello-horizontal" : null}
                 style={props.checked === "left" || props.checked === "right" ? {flex: "1"} : null}>
          {props.text.moreBefore + " " + "$ Ammount" +  " " +props.text.moreAfter}
        </p>}
    </div>
  );
}
export default Preview;

