import { s3Client } from "../awsConfig";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadFile(
  bucket: string,
  filePath: string,
  file: Express.Multer.File
): Promise<string> {
  const params = {
    Bucket: bucket,
    Key: filePath,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("File uploaded successfully", data);
    const publicUrl = `https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/object/public/images/${filePath}`;
    console.log("File uploaded successfully", publicUrl);
    return publicUrl;
  } catch (error) {
    console.log("Error uploading file", error);
    throw error;
  }
}
