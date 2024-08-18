import { client, supabase } from "../index.js";
import { letterModel } from "../Models/letter.model.js";
import { getTodaysDate } from "../utils/getTodayDate.js";

export const addLetter = async (req, res, next) => {
  const { body, dateWritten, dateToRecieve, visibility, email, userID } =
    req.body;
  const letterData = {
    body: body,
    dateWritten: dateWritten,
    dateToRecieve: dateToRecieve,
    visibility: visibility,
    email: email,
    userID: userID === undefined ? null : userID,
    sent: false,
  };
  try {
    const { error: addLetterError } = await supabase
      .from("letter")
      .insert(letterData);

    if (addLetterError) throw addLetterError;
    res.send(letterData);
  } catch (err) {
    if (err.code == 23505) {
      res.send("ERROR-addLetter : email alreay exists");
    }
  }
};

export const viewPublicLetters = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("letter")
      .select()
      .eq("visibility", "false");

    if (error) throw error;
    res.send(data);
  } catch (err) {
    console.log("ERROR-viewPublicLetters", err);
  }
};


