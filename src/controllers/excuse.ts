import { Request, Response } from "express";
import { getReply } from "@/utils/chatgpt.js";

interface Body {
  text: string;
}

export const excuseHandler = async (req: Request, res: Response) => {
  try {
    const body: Body = req.body;
    const reply = await getReply(body.text);
    if (reply === null) {
      console.error("Failed to get reply from chatgpt");
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
    return res.status(200).json({
      text: reply,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
