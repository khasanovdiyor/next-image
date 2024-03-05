import { db } from "..";
import { Image } from "@prisma/client";
import * as cache from "@/lib/cache";

export type ImageWithUser = Image & { user: { name: string | null } };

export async function getAllImages(): Promise<ImageWithUser[]> {
  const cacheKey = `allImages`;

  const cachedImages = await cache.getValue(cacheKey);

  if (cachedImages) {
    console.log("cache hit for getAllImages");
    return cachedImages;
  }
  const images = await db.image.findMany({
    include: { user: { select: { name: true } } },
  });

  await cache.setValue(cacheKey, images, cache.ttl.MINUTE);

  return images;
}

export async function getUserImages(userId: string): Promise<ImageWithUser[]> {
  const cacheKey = `${userId}:images`;

  const cachedImages = await cache.getValue(cacheKey);

  if (cachedImages) {
    console.log("cache hit for user images");
    return cachedImages;
  }

  const images = await db.image.findMany({
    where: { userId },
    include: { user: { select: { name: true } } },
  });

  await cache.setValue(cacheKey, images, cache.ttl.MINUTE);

  return images;
}

export async function getImagesByTerm(term: string): Promise<ImageWithUser[]> {
  const cacheKey = `search:${term}`;

  const cachedImages = await cache.getValue(cacheKey);

  if (cachedImages) {
    console.log("cache hit for search:", term);
    return cachedImages;
  }

  console.log("query made to db");
  const images = await db.image.findMany({
    where: {
      OR: [{ title: { contains: term } }, { description: { contains: term } }],
    },
    include: { user: { select: { name: true } } },
  });

  await cache.setValue(cacheKey, images, cache.ttl.MINUTE);

  return images;
}
