// generates random hex string.
import { randomBytes } from "crypto";

/**
 * 길이 16(기본값)의 랜덤 Hex 문자열을 생성합니다.
 */
const getRandomHex = (length: number = 8) => {
  return randomBytes(length).toString("hex");
};

export default getRandomHex;
