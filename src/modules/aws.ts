import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import "@/config.js";

const s3 = new S3({
  apiVersion: "2006-03-01",
  region: "ap-northeast-2",
});

/**
 * @returns 업로드 성공 시 true, 실패 시 false를 반환합니다.
 */
export const uploadS3 = async (
  path: string,
  buffer: Buffer,
): Promise<boolean> => {
  // s3 업로드
  const params = {
    Bucket: process.env.AWS_S3_BUCKET as string,
    Key: path,
    Body: buffer,
  };

  try {
    await s3.send(new PutObjectCommand(params));
  } catch (err) {
    console.error(err);
    return false;
  }

  return true;
};
