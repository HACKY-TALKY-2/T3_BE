import OpenAI from "openai";
import "@/config.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
});

export const getReply = async (prompt: string = "Please say hello to me.") => {
  try {
    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion: OpenAI.Chat.ChatCompletion =
      await openai.chat.completions.create(params);
    return chatCompletion.choices[0]?.message?.content || null;
  } catch (err) {
    console.log(err);
    return null;
  }
};
