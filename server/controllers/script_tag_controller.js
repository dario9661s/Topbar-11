import { DataType } from "@shopify/shopify-api";

export async function createScriptTag(client) {
  if (client) {
    const data = {
      script_tag: {
        event: "onload",
        src: "https://google.com",
      },
    };
    const result = await client.post({
      path: "script_tags",
      data,
      type: DataType.JSON,
    });
    console.log(`Result for the rest request using shopify is`, result);
    return result;
  }
  console.error("Could not make the rest request as the client does not exist");
}

export async function getAllScriptTags(client, src) {
  if (!client) {
    console.error(
      "Could not make the rest request as the client does not exist"
    );
    return;
  }
  const result = await client.get({
    path: "script_tags",
  });
  const matchSrc = result.body.script_tags.filter((tag) => tag.src === src);
  return matchSrc;
}
export async function fetchShipping(client, src) {
    if (!client) {
      console.error("cant fech");
      return;
    }
    let namespace = 'cleverchoice';
    let key = 'topbar';

    const rates = await client.get({
      path: "shipping_zones",
    })

    const data = {
      rates:  rates.body.shipping_zones[1].price_based_shipping_rates[0].price
    }

    const rateMetafields = await client.get({
      path: "metafields",
    })

    let appMetafield = {};
    rateMetafields['metafields'] && rateMetafields['metafields'].forEach(metafield => {
      if(metafield['namespace'] === namespace && metafield['key'] === key){
        appMetafield = metafield;
      }
    })
    if(appMetafield.id){
      await client.put({
        path: `metafields/${rateMetafields.id}`,
        data : {
          "metafield": {
            "id": appMetafield.id,
            "value": JSON.stringify(data),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    } else {
      await client.post({
        path: "metafields",
        data: {
          "metafield": {
            "namespace": namespace,
            "key": key,
            "value": JSON.stringify(data),
            "value_type": "json_string"
          }
        },
        type: DataType.JSON,
      })
    }
    return rates;
}
export async function fetchShopUrl(client, src) {
  if (!client) {
    console.error("cant fech");
    return;
  }
  return client;
}
export async function deleteScriptTagById(client, id) {
  if (!client) {
    console.error(
      "Could not make the rest request as the client does not exist"
    );
    return;
  }
  const result = await client.delete({
    path: `script_tags/${id}`,
  });
  console.log(result);
  return result;
}
//recive parced query and send it
// export async function postColor(client, data) {
//   const dataa = {
//     color:data
//   }
//   if (!client) {
//     console.error(
//       "Could not make the rest request as the client does not exist"
//     );
//     return;
//   }
//   console.log(dataa)
  // const result = await client.post({
  //   path: "metafields.json",
  //   dataa,
  //   type: DataType.JSON,
  // });
  // console.log(result);
  // return result;
// }
function getBaseUrl(shop) {
  return `https://${shop}`;
}
function getAllScriptTagsUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}
function getScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}
function getCreateScriptTagUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}
function getDeleteScriptTagUrl(shop, id) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags/${id}.json`;
}
