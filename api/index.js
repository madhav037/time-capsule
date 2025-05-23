import express from "express";
import letterHandler from "./routes/letter.routes.js";
import AdminHandler from "./routes/admin.routes.js";
import AuthHandler from "./routes/auth.routes.js";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { getTodaysDate } from "./utils/getTodayDate.js";
import { addLetter } from "./controllers/letter.controller.js";
import bodyParser from "body-parser";
import { createClient } from "redis";
import Redis from "ioredis";
import cron from "node-cron";
import { getLetterThisMonth } from "./utils/getDataFromServerEachMonth.js";
import { sendLetter } from "./utils/sendLetter.js";
import cors from "cors";
import path from "path";
dotenv.config();

export const supabase = createSupabaseClient(
  process.env.SUPABASEURL,
  process.env.PUBLICANONKEY
);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// export const client = createClient({
//   password: process.env.REDISPASSWORD,
//   socket: {
//     host: "redis-19731.c52.us-east-1-4.ec2.redns.redis-cloud.com",
//     port: 19731,
//   },
// });
// import { createClient } from 'redis';

export const client = createClient({
  password: process.env.REDISPASSWORD,
  socket: {
    host: process.env.REDISURL,
    port: process.env.REDISPORT,
  },
});

const __dirname = path.resolve()

client.on("error", (err) => {
  console.log("Redis Client Error", err)
  if (err.errno == -3008) {
    console.log("check internet connection")

    let timeout = 10, count = 1
    const interval = setInterval(() => {
      if (count == 10) {
        console.log(`retrying in ${timeout} secs`)
        if (timeout == 0) {
          clearInterval(interval)
        }
        timeout--
        count = 1
      }
      count++
    }, 100);
  }

});

app.get("/ping", (req,res) => {
      console.log("timecapsule pinged", new Date());
      res.send("timecapsule pinged at ")
}) 
(async () => {
  try {
    await client.connect();
    console.log("Redis client connected successfully.");

    // Check if the client is ready before running any commands
    const pingResult = await client.ping();
    console.log("Redis Client Ping:", pingResult);

    app.use("/api/letters", letterHandler);
    app.use("/api/admin", AdminHandler);
    app.use('/api/auth',AuthHandler);

    app.listen(5000, () => {
      console.log("Server listening on port : 5000");
    });
  } catch (err) {
    console.error("Failed to connect to Redis:", err);
  }

  // getLetterThisMonth(8);
  // await sendLetter();

})();

cron.schedule("0 0 1 * *", async () => {
  
  const currentMonth = new Date().getMonth() + 1;
  const month = client.get("currentCacheMonth");
  if (!month || month != currentMonth) {
    client.set("currentCacheMonth", currentMonth);
  }
  try {
    await getLetterThisMonth(currentMonth);
    console.log("After month");
  } catch (error) {
    console.error("Error-index-cron :", error);
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("running cron");
  
  await sendLetter();
});


app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
})