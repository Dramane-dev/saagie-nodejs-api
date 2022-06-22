import { RedisClientType } from "@redis/client";
import { createClient } from "redis";

export const redisClient: RedisClientType = createClient();
