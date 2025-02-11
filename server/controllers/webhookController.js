import User from "../models/userModel.js";
import { Webhook } from "svix";
import dotenv from "dotenv";

dotenv.config();

export const clerkWebhook = async (req, res) => {
  // const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  const WEBHOOK_SECRET = "whsec_RLYHUGxb/xLruDqcb61+/OgvVSDNKSN6";
  if (!WEBHOOK_SECRET) {
    throw new Error("No webhook secret found.");
  }

  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verificstion failed",
    });
  }

  console.log("evt", evt.data);

  if (evt.type === "user.created") {
    const newUser = new User({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.profile_img_url,
    });

    await newUser.save();
  }

  return res.status(200).json({
    message: "Webhook received",
  });
};
