import React, { useEffect, useState } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import Install from "../pages/install";
import Stepper from "../components/Steper";
import Preview from "../components/Preview";
import { useAxios } from "../hooks/useAxios";
import { ColorPicker, useColor } from "react-color-palette";
import { Loading, Frame } from "@shopify/polaris";

function index({ shopOrigin }) {
  const app = useAppBridge();
  const [axios] = useAxios();
  const [step, setStep] = useState(0);
  const [campaign, setCampaign] = useState("");
  const [activeCampaign, setActiveCampaign] = useState("");
  const [shipping, setShipping] = useState({
    emptyText: "",
    moreBefore: "",
    moreAfter: "",
    free: "",
    shippingFocused: ""
  });
  const [color, setColor] = useColor("hex", "#121212");
  const [colorBack, setColorBack] = useColor("hex", "#ffffff");
  const [shippingRate, setShippingRate] = useState(null);
  const [announcment, setAnnouncment] = useState("");
  const [products, setProducts] = useState([]);
  const [countDown, setCountDown] = useState({
    timeRemaining : null,
    countDownText: "",
    countDownFinished: "",
    countDownFocus: "",
    currentDate : ""
  });
  const [linkText, setLinkText] = useState("");
  const [link, setLink] = useState("");
  const [design, setDesign] = useState({
    fontStyle: "roboto",
    italic:"normal",
    color:"transparent",
    value: "50px",
    fontSize: "16px",
    fontColor: "black",
    icons: "none",
    iconLeftActive: true,
    iconRightActive: true,
    letterSpacing:""
  });
  const [animationProps, setAnimationProps] = useState({
    animation: "",
    animationSecounds: ""
  });
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let namespace = "cleverchoice";
    let key = "topbar";
    axios
      .get(`https://funny-goat-3.loca.lt/campaign/metafields`)
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
                  setCampaign("Link");
                  setActiveCampaign("Link")
                  setLink(campaign.campaign.link);
                  setLinkText(campaign.campaign.linkText);
                  setLoading(false)
                } else if (campaign.campaign.date) {
                  setCampaign("CountDown");
                  setActiveCampaign("CountDown")
                  setLoading(false)
                  let date = campaign.campaign.date;
                  let countDownDate = new Date(date).getTime();
                  let now = new Date().getTime();
                  let distance = countDownDate - now;
                  setCountDown({...countDown, currentDate : campaign.campaign.date, countDownText : campaign.campaign.text, countDownFinished: campaign.campaign.finishText , timeRemaining :distance / 1000});
                } else if (campaign.campaign.products) {
                  setCampaign("Announcment");
                  setActiveCampaign("Announcment")
                  setLoading(false)
                  setProducts(JSON.parse(campaign.campaign.products));
                } else if (campaign.campaign.empty) {
                  console.log(campaign)
                  setCampaign("Shipping");
                  setActiveCampaign("Shipping")
                  setLoading(false)
                  setShipping({...shipping, emptyText:campaign.campaign.empty, free: campaign.campaign.free, moreAfter:campaign.campaign.after, moreBefore: campaign.campaign.before});
                }
              }
            });
        }
      })
  }, []);

  useEffect(() => {
    let namespace = "cleverchoice";
    let key = "topbar";
      axios
      .get(`https://funny-goat-3.loca.lt/campaign/metafields`)
      .then((res) => {
        let rateMetafields = res.data;
        let data = null;
        console.log(res.data);
        if (res.data.body.metafields) {
          rateMetafields["body"]["metafields"] &&
            rateMetafields["body"]["metafields"].forEach((metafield) => {
              if (
                metafield["namespace"] === namespace &&
                metafield["key"] === key
              ) {
                data = JSON.parse(metafield.value);
                  setDesign({...design, fontSize: data.design.fontSize, fontColor: data.design.fontColor})

              }
            });
        }

        if (res.data.cart) {
          // const animation = res.data.cart.checked;
          // setAnimation(animation);
        }
      });

  }, []);
  useEffect(() => {
    fetchShippingRate();
  }, []);
  console.log(design);
  async function fetchShippingRate() {
    const { data } = await axios.get(
      `https://funny-goat-3.loca.lt/script_tag/ship`
    );
    setShippingRate(
      Number(
        data.details.body.shipping_zones[1].price_based_shipping_rates[0].price
      )
    );
  }
  return (
    <Frame>
      <Loading />
      <Preview
        colorBack = {colorBack}
        color = {color}
        countDown={countDown}
        animationProps = {animationProps}
        linkText={linkText}
        announcment={announcment}
        shipping = {shipping}
        products={products}
        campaign={campaign}
        design={design}
      />
      <div className="Progress">
        <Stepper
          setColorBack = {(color)=>setColorBack(color)}
          colorBack = {colorBack}
          setColor = {(color)=>setColor(color)}
          color = {color}
          loading = {loading}
          activeCampaign={activeCampaign}
          animationProps={animationProps}
          setAnimationProps={(time) => setAnimationProps(time)}
          countDown = {countDown}
          link={link}
          setLink={(link) => setLink(link)}
          linkText={linkText}
          setLinkText={(linkText) => setLinkText(linkText)}
          setCountDown={(time) => setCountDown(time)}
          products={products}
          setProducts={(prod) => setProducts(prod)}
          shipping={shipping}
          setShipping={(text) => setShipping(text)}
          setAnnouncment={(ann) => setAnnouncment(ann)}
          announcment={announcment}
          campaign={campaign}
          setCampaign={(camp) => setCampaign(camp)}
          design = {design}
          setDesign={(color) => setDesign(color)}
          activeStep={step}
          setActiveStep={(step) => setStep(step)}
        />
      </div>
      <Install />
    </Frame>
  );
}

export default index;
