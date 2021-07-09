import React, { useEffect, useState } from "react";
import { useAxios } from "../hooks/useAxios";
import { Layout, Page, SettingToggle, TextStyle } from "@shopify/polaris";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import Fab from "@material-ui/core/Fab";

function install() {
  const [axios] = useAxios();
  const [isInstalled, setIsInstalled] = useState(null);
  const [scriptTagId, setScriptTagId] = useState();
  const titleDescription = isInstalled ? "Uninstall" : "Install";
  const bodyDescription = isInstalled ? "installed" : "uninstalled";
  const [ship, setSHip] = useState(null);
  async function fetchScriptTags() {
    const { data } = await axios.get(
      `https://funny-goat-3.loca.lt/script_tag/all`
    );
    console.log("my initial script tag status: ", data);
    setIsInstalled(data.installed);
    if (data.details.length > 0) {
      setScriptTagId(data.details[0].id);
    }
  }

  // console.log(scriptTagId);
  async function fetch() {
    const { data } = await axios.get(
      `https://funny-goat-3.loca.lt/script_tag/ship`
    );
    setSHip(data.details);
  }
  useEffect(() => {
    fetchScriptTags();
    fetch();
  }, []);
  async function handleAction() {
    if (!isInstalled) {
      axios.post(`https://funny-goat-3.loca.lt/script_tag`);
    } else {
      axios.delete(
        `https://funny-goat-3.loca.lt/script_tag/?id=${scriptTagId}`
      );
    }
    setIsInstalled((oldValue) => !oldValue);
  }

  // console.log(isInstalled);
  return (
    // <div className="Floating">
    //   <Page>
    //     <Layout.AnnotatedSection
    //       title={`${titleDescription} banner`}
    //       description="Toggle banner installation on your shop"
    //     >
    //       <SettingToggle
    //         action={{
    //           content: titleDescription,
    //           onAction: handleAction,
    //         }}
    //         enabled={true}
    //       >
    //         The banner script is{" "}
    //         <TextStyle variation="strong">{bodyDescription}</TextStyle>
    //       </SettingToggle>
    //     </Layout.AnnotatedSection>
    //   </Page>
    // </div>

    <div className="Floating">
      <h3>App Installed:</h3>
      {isInstalled ? (
        <Fab color="secondary" onClick={() => handleAction()} aria-label="add">
          <ClearIcon />
        </Fab>
      ) : (
        <Fab color="primary" onClick={() => handleAction()} aria-label="add">
          <CheckIcon />
        </Fab>
      )}
    </div>
  );
}

export default install;
