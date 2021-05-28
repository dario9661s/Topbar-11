import React, { useCallback } from "react";
import { Select } from "@shopify/polaris";


export default function SimpleListMenu(props) {
  const handleSelectChange = useCallback(
    (value) => props.setCampaign(value),
    []
  );

  const options = [
    { label: "Shipping", value: "Shipping" },
    { label: "Announcment", value: "Announcment" },
    { label: "Count Down Timer", value: "CountDown" },
    { label: "Custom text", value: "Custom" },
    { label: "Link", value: "Link" },
  ];

  return (
    <div className="SelectCampaignContainer">
      <Select
        label="Select Campaign"
        options={options}
        onChange={handleSelectChange}
        value={props.campaign}
      />
    </div>
  );
}
