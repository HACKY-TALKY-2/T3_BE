export type VoiceActor =
  | "alloy" // 남성
  | "echo" // 남성
  | "fable" // 남성
  | "onyx" // 남성
  | "nova" // 여성
  | "shimmer"; // 여성

export type Language = "한국어" | "영어" | "일본어";
export type Gender = "남성" | "여성";
export type Age = "청소년" | "청년" | "중년" | "장년";

// 성별과 연령대에 따라 음성 배우를 반환합니다.
export const getVoiceActor = (gender: Gender, age: Age): VoiceActor => {
  if (gender === "남성") {
    if (age === "청소년") return "alloy";
    else if (age === "청년") return "echo";
    else if (age === "중년") return "fable";
    else return "onyx";
  } else {
    if (age === "청소년" || age === "청년") return "nova";
    else return "shimmer";
  }
};
