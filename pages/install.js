import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";

function install() {
  const [axios] = useAxios();
  const [isInstalled, setIsInstalled] = useState(null);
  const [scriptTagId, setScriptTagId] = useState();
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";
  const [ship, setSHip] = useState(null);

  console.log(scriptTagId)
  async function fetchScriptTags() {
    const { data } = await axios.get(
      `https://tasty-skunk-91.loca.lt/script_tag/all`
    );
    console.log("my initial script tag status: ", data);
    setIsInstalled(data.installed);
    if (data.details.length > 0) {
      setScriptTagId(data.details[0].id);
    }
  }

  async function fetch() {
    const { data } = await axios.get(
      `https://tasty-skunk-91.loca.lt/script_tag/ship`
    );
    setSHip(data.details);
  }
  useEffect(() => {
    fetchScriptTags();
    fetch()
  }, []);
  console.log(ship)
  async function handleAction() {
    if (!isInstalled) {
      axios.post(`https://tasty-skunk-91.loca.lt/script_tag`);
    } else {
      axios.delete(`https://tasty-skunk-91.loca.lt/script_tag/?id=${scriptTagId}`);
    }
    setIsInstalled((oldValue) => !oldValue);
  }

  return (
    <Page>
      <Layout.AnnotatedSection
        title={`${titleDescription} banner`}
        description="Toggle banner installation on your shop"
      >
        <SettingToggle
          action={{
            content: titleDescription,
            onAction: handleAction,
          }}
          enabled={true}
        >
          The banner script is{" "}
          <TextStyle variation="strong">{bodyDescription}</TextStyle>
        </SettingToggle>
      </Layout.AnnotatedSection>
    </Page>
  );
}

export default install;
