import { client } from "../index.js";

export const addLettersToCache = async (data) => {
  try {
    const cachedData = await client.get("letters");
    const month = await client.get("currentCacheMonth");
    const lastDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    ).getDate();

    if (cachedData) return;
    else {
      await client.set("letters", JSON.stringify(data));
      await client.expire(
        "letters",
        lastDate === 30 ? 2592000 : lastDate === 31 ? 2678400 : 2419200
      );
      return;
    }
  } catch (err) {
    console.log("ERROR-addLettersToCache", err);
  }
};
