import Router from "koa-router";
import {
  postAnimation
} from "../controllers/animation_controller";

const router = new Router({ prefix: "/animation" });

router.put("/anim", async (ctx) => {
  const animation = ctx.query.anim;
  // const animationTiming = ctx.query.animationTiming;
  const animationSecounds = ctx.query.animationSecounds;

  ctx.body = await postAnimation(ctx.myClient, animation, animationTiming, animationSecounds);
});

export default router;
