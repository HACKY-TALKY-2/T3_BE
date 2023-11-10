export interface PromptBody {
  receiver: string;
  type: string;
  tone: string;
  situation?: string;
}

export const getPrompt = (body: PromptBody) => {
  const { receiver, type, tone, situation } = body;
  const basePrompt = `ChatGPT, 아래의 정보를 바탕으로 변명의 문자를 작성해주세요.

  받는 사람: ${receiver}
  상황: ${type} ${situation ? `- ${situation}` : ""}
  문자의 어조: ${tone}
  
  문자는 2-4문장으로 구성되며, 상황과 어조에 맞게 작성해야 합니다.`;

  return basePrompt;
};
