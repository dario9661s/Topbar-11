import React, { useEffect } from "react";
import Shipping from "./Campaign/Shipping";
import { Layout, Card } from "@shopify/polaris";
import Announcment from "./Campaign/Announcment";
import CountDown from "./Campaign/CountDown/CountDown";
import CampaignPicker from "./CampaignPicker";
import Link from "./Campaign/Link";
import { useAxios } from "../../hooks/useAxios";

const TopText = (props) => {
  const [axios] = useAxios();
  console.log(props.campaign);

  useEffect(() => {
    let namespace = "cleverchoice";
    let key = "topbar";
    axios
      .get(`https://tidy-shrimp-31.loca.lt/campaign/metafields`)
      .then((res) => {
        let rateMetafields = res.data;
        let campaign = null;
        if (res.data.body.metafields) {
          rateMetafields["body"]["metafields"] &&
            rateMetafields["body"]["metafields"].forEach((metafield) => {
              if (
                metafield["namespace"] === namespace &&
                metafield["key"] === key
              ) {
                campaign = JSON.parse(metafield.value);
                console.log(campaign);
                if (campaign.campaign.link) {
                  props.setCampaign("Link");
                  props.setLink(campaign.campaign.link);
                  props.setLinkText(campaign.campaign.linkText);
                } else if (campaign.campaign.date) {
                  props.setCampaign("CountDown");
                  let date = campaign.campaign.date;
                  let countDownDate = new Date(date).getTime();
                  let now = new Date().getTime();
                  let distance = countDownDate - now;
                  props.setCountDownText(campaign.campaign.text);
                  props.setCountDownFinished(campaign.campaign.finishText);
                  props.setTimeRemaining(distance / 1000);
                } else if (campaign.campaign.products) {
                  props.setCampaign("Announcment");
                  props.setProducts(JSON.parse(campaign.campaign.products));
                } else if (campaign.campaign.empty) {
                  props.setCampaign("Shipping");
                  props.setEmptyText(campaign.campaign.empty);
                  props.setFree(campaign.campaign.free);
                  props.setMoreAfter(campaign.campaign.after);
                  props.setMoreBefore(campaign.campaign.before);
                }
              }
            });
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
              countDownFocus={props.countDownFocus}
              setCountDownFocus={(fcs) => props.setCountDownFocus(fcs)}
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
