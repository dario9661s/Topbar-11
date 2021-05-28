import React, { useCallback, useEffect, useState } from "react";
import Shipping from "./Campaign/Shipping";
import Announcment from "./Campaign/Announcment";
import CountDown from "./Campaign/CountDown/CountDown";
import CampaignPicker from "./CampaignPicker";
import Link from "./Campaign/Link";
import axioss from "axios";

const TopText = (props) => {
  useEffect(() => {
    axioss.get("https://cleverchoicetopbar-default-rtdb.firebaseio.com/campaign.json").then((res) => {
      if (res.data.link) {
        props.setCampaign("Link")
      } else if (res.data.countDown){
        props.setCampaign("CountDown")
      } else if (res.data.announcement){
        props.setCampaign("Announcment")
      } else if (res.data.text){
        props.setCampaign("Shipping")
      }
    });
  }, []);
  return (
    <div className="TopTextContainer">
      <CampaignPicker
        campaign={props.campaign}
        setCampaign={(camp) => props.setCampaign(camp)}
      />
      {props.campaign === "Shipping" ? (
        <Shipping
          shippingFocused = {props.shippingFocused}
          setShippingFocused = {(focus)=>props.setShippingFocused(focus)}
          emptyText={props.emptyText}
          free={props.free}
          setFree={(text) => props.setFree(text)}
          moreAfter={props.moreAfter}
          setMoreAfter={(text) => props.setMoreAfter(text)}
          setEmptyText={(text) => props.setEmptyText(text)}
          moreBefore={props.moreBefore}
          setMoreBefore={(text) => props.setMoreBefore(text)}
        />
      ) : props.campaign === "Announcment" ? (
        <Announcment
          products={props.products}
          setProducts={(prod) => props.setProducts(prod)}
          setAnnouncment={props.setAnnouncment}
          announcment={props.announcment}
        />
      ) : props.campaign === "CountDown" ? (
        <CountDown
          countDownFinished = {props.countDownFinished}
          setCountDownFinished = {(cdf)=>props.setCountDownFinished(cdf)}
          countDownText = {props.countDownText}
          setCountDownText = {(text)=> props.setCountDownText(text)}
          setTimeRemaining={(time)=> {props.setTimeRemaining(time)}} />
      ) : props.campaign === "Link" ? (
        <Link
          link = {props.link}
          setLink = {(link)=> props.setLink(link)}
          linkText = {props.linkText}
          setLinkText = {(linkText)=> props.setLinkText(linkText)} />
        ) : null}
    </div>
  );
};
export default TopText;
