import { createClient } from "redis";

const client = createClient({
  url: "redis://" + process.env.REDIS_URL,
});

client.on("error", (error) => {
  console.error("Redis client error", error);
});

client.on("connect", () => {
  console.log("Redis client connected");
});

console.log(client, process.env.REDIS_URL);

(async () => {
  await client.connect();
})();

export default client;
