import React, { useState, useEffect } from "react";
import Clock from "../components/Content/Campaign/CountDown/Clock";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import GradeIcon from "@material-ui/icons/Grade";
import DoneIcon from "@material-ui/icons/Done";

const Preview = (props) => {
  const [clas, setClas] = useState();

  useEffect(() => {
    setClas("");
    setTimeout(function () {
      setClas(
        props.animationProps.animation +
          props.animationProps.animationSecounds +
          props.animationProps.animationTiming
      );
    }, 200);
  }, [
    props.animationProps.animationTiming,
    props.animationProps.animationSecounds,
    props.animationProps.animation,
  ]);
  console.log(clas);

  let icons = props.design.iconLeftActive ? (
    props.design.icons === "arrow" ? (
      <DoubleArrowIcon
        style={{
          transform: props.design.rotateLeft ? "rotate(180deg)" : null,
        }}
      />
    ) : props.design.icons === "like" ? (
      <ThumbUpIcon
        style={{
          transform: props.design.rotateLeft ? "rotate(180deg)" : null,
        }}
      />
    ) : props.design.icons === "star" ? (
      <GradeIcon />
    ) : props.design.icons === "check" ? (
      <DoneIcon />
    ) : null
  ) : null;

  let iconsRot = props.design.iconRightActive ? (
    props.design.icons === "arrow" ? (
      <DoubleArrowIcon
        style={{
          transform: props.design.rotateRight ? "rotate(180deg)" : null,
        }}
      />
    ) : props.design.icons === "like" ? (
      <ThumbUpIcon
        style={{
          transform: props.design.rotateRight ? "rotate(180deg)" : null,
        }}
      />
    ) : props.design.icons === "star" ? (
      <GradeIcon />
    ) : props.design.icons === "check" ? (
      <DoneIcon />
    ) : null
  ) : null;

  let announcement = props.products.map((product) => {
    return (
      <div className={clas}>
        <p>
          {icons}
          {props.announcment + " " + product.name}
          {iconsRot}
        </p>
      </div>
    );
  });
  let shipping = (
    <div className={clas}>
      <p>
        {icons}
        {props.shipping.shippingFocused === "more"
          ? props.shipping.moreBefore +
            " user cart value " +
            props.shipping.moreAfter
          : props.shipping.shippingFocused === "free"
          ? props.shipping.free
          : props.shippingFocused === "empty"
          ? "Focus text fields for preview!"
          : props.shipping.emptyText}
        {iconsRot}
      </p>
    </div>
  );
  let link = (
    <p className={clas}>
      {icons}
      {props.linkText}
      {iconsRot}
    </p>
  );
  return (
    <div
      className="background"
      style={{
        fontStyle: props.design.italic === "italic" ? "italic" : "normal",
        width: "100%",
        fontFamily: props.design.fontStyle + ",sans-serif",
        color: props.color.hex,
        backgroundColor: props.colorBack.hex,
        height: props.design.value,
        fontSize: props.design.fontSize,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        position: "fixed",
        zIndex: "1000",
        letterSpacing: props.design.letterSpacing,
      }}
    >
      {props.campaign === "Announcment" ? (
        announcement
      ) : props.campaign === "Shipping" ? (
        shipping
      ) : props.campaign === "CountDown" ? (
        <Clock
          icons = {icons}
          iconsRot={iconsRot}
          design = {props.design}
          animationProps={props.animationProps}
          countDown={props.countDown}
        />
      ) : props.campaign === "Link" ? (
        link
      ) : null}
    </div>
  );
};
export default Preview;
