import redis from "./redis";

export const ttl = {
  MINUTE: 60,
  // 60 * 60
  HOUR: 3600,
  // 60 * 60 * 24
  DAY: 86400,
  // 60 * 60 * 24 * 6
  SIX_DAYS: 518400,
  // 60 * 60 * 24 * 7
  WEEK: 604800,
} as const;

export async function getValue(key: string) {
  let value;
  try {
    value = await redis.get(key);
    if (value) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.error("Error getting value from redis", error);
  }
  return null;
}

export async function setValue(key: string, value: any, expiration: number) {
  try {
    await redis.set(key, JSON.stringify(value), {
      EX: expiration,
    });
  } catch (error) {
    console.error("Error setting value in redis", error);
  }
}
