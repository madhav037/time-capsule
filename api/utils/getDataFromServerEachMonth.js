import { client, supabase } from "../index.js";
import { addLettersToCache } from "./addLettersToCache.js";

export const getLetterThisMonth = async (currentMonth) => {
    const year = new Date().getFullYear()
    const lastDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).getDate()
    const formattedFirstDate = `${year}-${currentMonth}-01`
    const formattedLastDate = `${year}-${currentMonth}-${lastDate}`
  try {
    const { data, error } = await supabase
      .from("letter")
      .select()
      .filter('dateToRecieve', 'gte', `${formattedFirstDate}`)
      .filter('dateToRecieve', 'lt', `${formattedLastDate}`);

    if (data) {
      await addLettersToCache(data,"letters");
    } else {
      console.log("no letters this month");
      return;
    }
    if (error) throw error;
  } catch (error) {
    console.log("ERROR-getLetterThisMonth", error);
  }
};
