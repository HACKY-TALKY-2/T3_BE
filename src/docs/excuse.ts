// /excuse 라우터의 swagger 문서

const tag = "excuse";
const apiPrefix = `/${tag}`;

const excuseDocs = {};

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
                description: "변명을 보낼 대상의 이름입니다. 최대 100자입니다.",
              },
              type: {
                type: "string",
                description:
                  "변명할 상황의 종류로, '지각', '결석', '공부', '과제', 등이 가능합니다. 최대 100자입니다.",
              },
              tone: {
                type: "string",
                description:
                  "변명할 문장의 톤으로, '친절한', '무심한', '화난', '진지한', '장난스러운' 등이 가능합니다. 최대 100자입니다.",
              },
              situation: {
                type: "string",
                description:
                  "변명을 생성할 상황 정보로, 보통 20자 내외입니다. 최대 100자입니다.",
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
                  description:
                    "변명의 내용입니다. 항상 비어있지 않습니다. 개행 문자열은 '\\n'입니다(수정 예정..).",
                  example: `이 팀장님,\n\n아침에 제 알람이 놀랍게도 '나도 휴가 가고 싶다'며 작동을 거부해버렸어요. 😅 회의에 늦어서 정말 죄송한데, 알람이랑 제가 지금 엄청난 싸움 중이랍니다. 곧 도착해서 빠르게 상황 파악하고 동참할게요! 🏃💨\n\n늦어서 정말 죄송합니다!`,
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

// @ts-ignore
excuseDocs[`${apiPrefix}/voice`] = {
  post: {
    tags: [tag],
    summary: "변명 성대모사 생성",
    description:
      "사용자로부터 받은 텍스트를 바탕으로 변명을 하는 목소리를 생성합니다.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              language: {
                type: "string",
                description:
                  "음성을 생성할 언어입니다. '한국어', '영어', '일본어' 셋 중 하나의 값이 가능합니다.",
              },
              gender: {
                type: "string",
                description:
                  "성우의 성별로, '남성', '여성' 둘 중 하나의 값이 가능합니다.",
              },
              age: {
                type: "string",
                description:
                  "성우의 연령대로, '청소년', '청년', '중년', '장년' 넷 중 하나의 값이 가능합니다.",
              },
              text: {
                type: "string",
                description: "변명할 내용으로, 최소 1자, 최대 200자입니다.",
              },
            },
            required: ["gender", "age", "text"],
            example: {
              language: "한국어",
              gender: "여성",
              age: "중년",
              text: "저 채널톡이 어머닌데 오늘 채널톡이가 아파서 학원 못갈 것 같아요",
            },
          },
        },
      },
    },
    responses: {
      200: {
        description:
          "생성된 음성의 S3 URL. 운이 좋다면 그럴싸한 목소리가 만들어집니다.",
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["text"],
              properties: {
                url: {
                  type: "string",
                  description:
                    "S3 URL입니다. 생성된 음성은 하루 뒤에 삭제됩니다. 샘플 음성 파일은 Never Gonna Give You Up입니다. 가장 구하기 쉬웠거든요",
                  example:
                    "https://t3-excuse-hackathon.s3.ap-northeast-2.amazonaws.com/audios/sample.mp3",
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
