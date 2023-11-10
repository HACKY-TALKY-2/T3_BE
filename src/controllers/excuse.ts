import { Request, Response } from "express";
import { getPrompt, PromptBody } from "@/modules/prompt.js";
import { getReply, getVoiceBuffer } from "@/modules/openai.js";
import { ExcuseHistoryModel } from "@/db/model.js";
import { uploadS3 } from "@/modules/aws.js";
import getRandomHex from "@/utils/randomHex.js";

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

export type Language = "한국어" | "영어" | "일본어";
export type Gender = "남성" | "여성";
export type Age = "청소년" | "청년" | "중년" | "장년";

interface VoiceBody {
  language?: string;
  gender: Gender;
  age: Age;
  text: string;
}

export const excuseVoiceHandler = async (req: Request, res: Response) => {
  try {
    const { language, gender, age, text } = req.body as VoiceBody;

    // Whisper API를 사용해 텍스트를 음성으로 변환합니다.
    const buffer = await getVoiceBuffer(text);
    if (buffer === null) {
      console.error("Failed to get voice buffer from openai");
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    // 버퍼를 S3에 업로드합니다.
    const filename = `${Date.now()}_${getRandomHex()}.mp3`;
    const path = `audios/${filename}`;
    const uploaded = await uploadS3(path, buffer);
    if (!uploaded) {
      console.error("Failed to upload buffer to s3");
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }

    return res.status(200).json({
      url: `https://${process.env.AWS_S3_BUCKET}.s3.ap-northeast-2.amazonaws.com/${path}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};
