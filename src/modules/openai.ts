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
