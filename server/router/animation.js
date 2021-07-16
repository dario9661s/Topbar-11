import Router from "koa-router";
import { postAnimation } from "../controllers/animation_controller";

const router = new Router({ prefix: "/animation" });

router.put("/anim", async (ctx) => {
  let animation = ctx.query.animation;
  let animationTiming = ctx.query.animationTiming;
  let animationSecounds = ctx.query.animationSecounds;
  ctx.body = await postAnimation(
    ctx.myClient,
    animation,
    animationTiming,
    animationSecounds
  );
});

export default router;
