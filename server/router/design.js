import Router from "koa-router";
import {
  postColor,
  postFontColor,
  postFontSize,
} from "../controllers/design_controller";

const router = new Router({ prefix: "/design" });

router.put("/color", async (ctx) => {
  const color = ctx.query.color;
  ctx.body = await postColor(ctx.myClient, color);
});

router.put("/fontcolor", async (ctx) => {
  const fontcolor = ctx.query.fontcolor;
  ctx.body = await postFontColor(ctx.myClient, fontcolor);
});

router.put("/fontsize", async (ctx) => {
  const fontsize = ctx.query.fontsize;
  ctx.body = await postFontSize(ctx.myClient, fontsize);
});
export default router;
