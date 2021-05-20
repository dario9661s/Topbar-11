import React, {useCallback, useEffect, useState} from "react";
import Shipping from "./Campaign/Shipping";
import Announcment from "./Campaign/Announcment";
import {Form, TextField, FormLayout, Button, Heading} from "@shopify/polaris";

import CampaignPicker from "./CampaignPicker";

const  TopText = (props) => {
  const [campaign, setCampaign] = useState();
  console.log(campaign)
  return (
    <div className="ColorContainer">
      <Form >
        <CampaignPicker setCampaign = {(camp)=>setCampaign(camp)}/>

        {campaign === "Shipping" ? <Shipping/> : null}
        {campaign === "Announcment" ? <Announcment/> : null}
      </Form>
    </div>

  );
}
export default TopText;
