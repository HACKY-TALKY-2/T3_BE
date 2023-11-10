import { Request, Response } from "express";
import { getPrompt, PromptBody } from "@/modules/prompt.js";
import { getReply } from "@/modules/openai.js";
import { ExcuseHistoryModel } from "@/db/model.js";

export const excuseHandler = async (req: Request, res: Response) => {
  try {
    // Body를 파싱해 Prompt를 생성합니다.
    const body: PromptBody = req.body;
    const prompt = getPrompt(body);

    // ChatGPT에 Prompt를 전달하고, Reply를 받아옵니다.
    const excuse = await getReply(prompt);
    if (excuse === null) {
      console.error("Failed to get reply from chatgpt");
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    // Prompt history를 저장합니다.
    const execuseHistory = new ExcuseHistoryModel({
      prompt,
      excuse,
    });
    await execuseHistory.save();

    // Reply를 반환합니다.
    return res.status(200).json({
      text: excuse,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

export type Language = "한국어" | "English";
export type Gender = "남성" | "여성";
export type Age = "청년" | "중년" | "노년";

interface VoiceBody {
  language?: string;
  gender: Gender;
  age: Age;
  text: string;
}

export const excuseVoiceHandler = async (req: Request, res: Response) => {
  try {
    const body: VoiceBody = req.body;
    // TODO: fill the function.
    return res.status(200).json({
      url: "https://t3-excuse-hackathon.s3.ap-northeast-2.amazonaws.com/audios/sample.mp3",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
