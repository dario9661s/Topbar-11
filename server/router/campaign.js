import Router from "koa-router";
import {
  postLink
} from "../controllers/campaign_controller";

const router = new Router({ prefix: "/campaign" });

router.put("/", async (ctx) => {
  console.log(ctx.myClient)
  const link = ctx.query.link;
  const linkText = ctx.query.linkText;
  ctx.body = await postLink(ctx.myClient, link, linkText);
});

export default router;
