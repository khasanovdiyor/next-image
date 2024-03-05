"use server";

import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { S3Client } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/db";
import type { Image } from "@prisma/client";
import { auth } from "@/auth";
import { XMLParser } from "fast-xml-parser";

export async function getPresignedUrl(contentType: string) {
  if (!contentType) return { error: "No content type" };

  try {
    const client = new S3Client({ region: process.env.AWS_REGION });
    const { url, fields } = await createPresignedPost(client, {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: uuidv4(),
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
        ["starts-with", "$Content-Type", contentType],
      ],
      Fields: {
        acl: "public-read",
        "Content-Type": contentType,
      },
      Expires: 600, // Seconds before the presigned post expires. 3600 by default.
    });

    console.log({ url, fields });

    return { url, fields };
  } catch (error) {
    throw error;
  }
}

type ImageData = Omit<Image, "id">;

export async function createImageData(data: ImageData) {
  const { title, description, imageKey, userId } = data;

  try {
    await db.image.create({
      data: {
        title,
        description,
        userId,
        imageKey,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    } else {
      return { error: "Failed to create an image" };
    }
  }
}

interface AddImageFormState {
  error: string;
  success?: boolean;
}

export async function addImage(
  formState: AddImageFormState,
  data: FormData
): Promise<AddImageFormState> {
  const title = data.get("title") as string;
  const description = data.get("description") as string;
  const file = data.get("image") as File;

  if (!title || !description || !file) {
    return { error: "Please provide a title, description, and image file" };
  }

  const session = await auth();

  if (!session) {
    return { error: "You must be logged in to upload an image" };
  }

  const { url, fields } = await getPresignedUrl(file.type);

  const formData = new FormData();
  Object.entries(fields!).forEach(([key, value]) => {
    formData.append(key, value as string);
  });
  formData.append("file", file);

  const uploadResponse = await fetch(url!, {
    method: "POST",
    body: formData,
  });
  console.log("image upload response: ", uploadResponse);

  if (!uploadResponse.ok) {
    const parser = new XMLParser();
    const parsed = parser.parse(await uploadResponse.text());
    return { error: parsed.Error.Message };
  }

  const imageKey = fields!.key;
  await createImageData({
    title,
    description,
    imageKey,
    userId: session!.user!.id,
  });

  return {
    error: "",
    success: true,
  };
}
