import React, { useCallback, useEffect, useState } from "react";
import Shipping from "./Campaign/Shipping";
import Announcment from "./Campaign/Announcment";
import CustomText from "./Campaign/CountDown";
import CampaignPicker from "./CampaignPicker";
import axioss from "axios";

const TopText = (props) => {
  useEffect(() => {
    axioss
      .get(
        "https://cleverchoicetopbar-default-rtdb.firebaseio.com/textAnnouncment.json"
      )
      .then((res) => {
        if (res.data) {
          props.setCampaign("Announcment");
        }
      })
      .then(() => {
        axioss
          .get(
            "https://cleverchoicetopbar-default-rtdb.firebaseio.com/text.json"
          )
          .then((res) => {
            if (res.data) {
              props.setCampaign("Shipping");
            }
          });
      });
  }, []);

  console.log(props.campaign);
  return (
    <div className="TopTextContainer">
      <CampaignPicker
        campaign={props.campaign}
        setCampaign={(camp) => props.setCampaign(camp)}
      />
      {props.campaign === "Shipping" ? (
        <Shipping
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
      ) : props.campaign === "Custom" ? (
        <CustomText />
      ) : null}
    </div>
  );
};
export default TopText;
