import React, { useEffect } from "react";
import Shipping from "./Campaign/Shipping";
import { Layout, Card } from "@shopify/polaris";
import Announcment from "./Campaign/Announcment";
import CountDown from "./Campaign/CountDown/CountDown";
import CampaignPicker from "./CampaignPicker";
import Link from "./Campaign/Link";
import {useAxios} from "../../hooks/useAxios";

const TopText = (props) => {
  const [axios] = useAxios();

  useEffect(() => {
    axios.get(`https://blue-emu-26.loca.lt/campaign/metafields`).then((res) => {
      let campaign = JSON.parse(res.data.body.metafields[0].value)
      console.log(campaign)
          console.log(res.data);
          if (campaign.link) {
            props.setCampaign("Link");
          } else if (campaign.date) {
            props.setCampaign("CountDown");
          } else if (campaign.products) {
            props.setCampaign("Announcment");
          } else if (campaign.empty) {
            props.setCampaign("Shipping");
          }
      });
  }, []);
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Order details" sectioned>
          <CampaignPicker
            campaign={props.campaign}
            setCampaign={(camp) => props.setCampaign(camp)}
          />
        </Card>
      </Layout.Section>
      <Layout.Section>
        <Card
          title={
            props.campaign === "Shipping"
              ? "Top Bar Text"
              : props.campaign === "Announcment"
              ? "Announcement"
              : props.campaign === "CountDown"
              ? "Count Down"
              : props.campaign === "Link"
              ? "Link"
              : null
          }
          sectioned
        >
          {props.campaign === "Shipping" ? (
            <Shipping
              shop={props.shop}
              shippingFocused={props.shippingFocused}
              setShippingFocused={(focus) => props.setShippingFocused(focus)}
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
              shop={props.shop}
              products={props.products}
              setProducts={(prod) => props.setProducts(prod)}
              setAnnouncment={props.setAnnouncment}
              announcment={props.announcment}
            />
          ) : props.campaign === "CountDown" ? (
            <CountDown
              countDownFocus = {props.countDownFocus}
              setCountDownFocus = {(fcs)=>props.setCountDownFocus(fcs)}
              shop={props.shop}
              countDownFinished={props.countDownFinished}
              setCountDownFinished={(cdf) => props.setCountDownFinished(cdf)}
              countDownText={props.countDownText}
              setCountDownText={(text) => props.setCountDownText(text)}
              setTimeRemaining={(time) => {
                props.setTimeRemaining(time);
              }}
            />
          ) : props.campaign === "Link" ? (
            <Link
              shop={props.shop}
              link={props.link}
              setLink={(link) => props.setLink(link)}
              linkText={props.linkText}
              setLinkText={(linkText) => props.setLinkText(linkText)}
            />
          ) : null}
        </Card>
      </Layout.Section>
    </Layout>
  );
};
export default TopText;
