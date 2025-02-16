import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: "4889b898f854d8aef03eb1b32eca4109",
    secretAccessKey:
      "f5f49bce65bcb0b97207019553469b7f049ec6fb5f60fd6475bec7ac109647cf",
  },
  endpoint: "https://cnthruujnkkutwrqmslk.supabase.co/storage/v1/s3",
  region: "ap-southeast-1",
  forcePathStyle: true,
});
