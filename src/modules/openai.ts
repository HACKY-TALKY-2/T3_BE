import OpenAI from "openai";
import "@/config.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export const getReply = async (prompt: string = "Please say hello to me.") => {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-1106-preview", // GPT-4 Turbo!
      temperature: parseFloat(process.env.CHAT_GPT_TEMPERATURE || "0.5"),
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    return chatCompletion.choices[0]?.message?.content || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export type VoiceActor =
  | "alloy"
  | "echo"
  | "fable"
  | "onyx"
  | "nova"
  | "shimmer";

/**
 * OpenAI API를 사용해 텍스트를 음성으로 변환합니다.
 * @param text - 텍스트
 * @return API 호출 성공 시 Buffer를, 실패 시 null을 반환.
 */
export const getVoiceBuffer = async (
  text: string = "사랑해요 연예가중계",
  actor: VoiceActor = "alloy",
) => {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: actor,
      input: text,
    });
    return Buffer.from(await mp3.arrayBuffer());
  } catch (err) {
    console.error(err);
    return null;
  }
};
