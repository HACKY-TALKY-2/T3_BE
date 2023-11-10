// /excuse 라우터의 swagger 문서

const tag = "excuse";
const apiPrefix = `/${tag}`;

const excuseDocs = {};

// ignore type
// @ts-ignore
excuseDocs[`${apiPrefix}/`] = {
  post: {
    tags: [tag],
    summary: "변명 생성",
    description: "사용자로부터 받은 상황 정보를 바탕으로 변명을 생성합니다.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              receiver: {
                type: "string",
                description: "변명을 보낼 대상의 이름입니다.",
              },
              type: {
                type: "string",
                description:
                  "변명할 상황의 종류로, '지각', '결석', '공부', '과제', 등이 가능합니다.",
              },
              tone: {
                type: "string",
                description:
                  "변명할 문장의 톤으로, '친절한', '무심한', '화난', '진지한', '장난스러운' 등이 가능합니다.",
              },
              situation: {
                type: "string",
                description: "변명을 생성할 상황 정보로, 10자 내외입니다.",
              },
            },
            required: ["receiver", "type", "tone"],
            example: {
              receiver: "이 팀장",
              type: "회의 늦참",
              tone: "장난스러움",
              situation: "아침에 알람이 울리지 않아서 회의에 늦은 상황",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "성공 메세지. 운이 좋다면 그럴싸한 변명이 반환됩니다.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["text"],
              properties: {
                text: {
                  type: "string",
                  description: "변명의 내용입니다. 항상 비어있지 않습니다.",
                  example: `안녕하세요, 팀장님!
                  오늘 아침에 조금 장난스러운 상황이 생겨서 죄송합니다. 저의 알람이 아침에 잠들어버려서 회의에 늦어버렸어요. 참으로 깊은 잠에 빠져 있던 것 같아요. 다음번에는 알람을 적당히 격하게 설정해야 할 것 같아요. 이번 일로 알람 소리에 더욱 주의를 기울일게요! 죄송합니다!`,
                },
              },
            },
          },
        },
      },
      500: {
        description:
          "실패 메세지. 서버 내부에서 오류가 발생했거나, ChatGPT API 호출에 실패했을 경우에 반환되는 결과입니다.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["error"],
              properties: {
                error: {
                  type: "string",
                  description: "오류 메시지입니다.",
                  example: "Internal Server Error",
                },
              },
            },
          },
        },
      },
    },
  },
};

export default excuseDocs;
