import React from "react";
import Shipping from "./Campaign/Shipping";
import { Layout, Card, Spinner, Stack } from "@shopify/polaris";
import Announcment from "./Campaign/Announcment";
import CountDown from "./Campaign/CountDown/CountDown";
import CampaignPicker from "./CampaignPicker";
import Link from "./Campaign/Link";
const TopText = (props) => {
  return (
    <Layout>
      <Layout.Section oneThird>
        <Card title="Order details" sectioned>
          <CampaignPicker
            animationProps={props.animationProps}
            setAnimationProps={(time) => props.setAnimationProps(time)}
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
           {props.loading?    <Stack alignment="center" distribution="center">
           <Spinner accessibilityLabel="Spinner example" size="large" /></Stack> :
          props.campaign === "Shipping" ? (
            <Shipping
              activeCampaign={props.activeCampaign}
              shipping = {props.shipping}
              setShipping={(text) => props.setShipping(text)}
            />
          ) : props.campaign === "Announcment" ? (
            <Announcment
              activeCampaign={props.activeCampaign}
              products={props.products}
              setProducts={(prod) => props.setProducts(prod)}
              setAnnouncment={props.setAnnouncment}
              announcment={props.announcment}
            />
          ) : props.campaign === "CountDown" ? (
            <CountDown
              activeCampaign={props.activeCampaign}
              countDown = {props.countDown}
              setCountDown={(text) => props.setCountDown(text)}
            />
          ) : props.campaign === "Link" ? (
            <Link
              activeCampaign={props.activeCampaign}
              link={props.link}
              setLink={(link) => props.setLink(link)}
              linkText={props.linkText}
              setLinkText={(linkText) => props.setLinkText(linkText)}
            />
          ) : null
          }
        </Card> 
      
      </Layout.Section>
    </Layout>
  );
};
export default TopText;
