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
    userID: userID === "null" ? null : userID,
    sent: false,
  };

  try {
    // Insert the letter and get the letter ID
    const { data: insertedLetter, error: addLetterError } = await supabase
      .from("letter")
      .insert(letterData)
      .select("id")
      .single();

    if (addLetterError) {
      throw addLetterError;
    }

    // Check if userID is provided
    if (userID) {
      console.log(insertedLetter);
      
      // Fetch the current letter IDs for the user
      const { data: userData, error: fetchError } = await supabase
        .from("user")
        .select("letterID")
        .eq("auth_userid", userID)
        // .single(); // Ensure it returns a single row

      if (fetchError) {
        throw fetchError;
      }
      console.log(userData);

      // Check if letterID array exists or is empty
      const currentLetterIDs = userData?.letterID || [];

      // Update the user with the new letter ID
      const { error: updateError } = await supabase
        .from("user")
        .update({ letterID: [...currentLetterIDs, insertedLetter.id] })
        .eq("auth_userid", userID);

      if (updateError) {
        throw updateError;
      }
    }

    // Send a response back to the client
    res.status(200).json(letterData);
  } catch (err) {
    console.error("ERROR-addLetter", err);
    if (err.code === "23505") {
      res.status(400).send("ERROR-addLetter: Email already exists");
    } else {
      res.status(500).send("An error occurred");
    }
  }
};

export const viewPublicLetters = async (req, res) => {
  try {
    let publicCacheLetters = await client.get("publicLetters");
    if (publicCacheLetters) {
      res.send(JSON.parse(publicCacheLetters));
      return;
    }

    const { data, error } = await supabase
      .from("letter")
      .select()
      .eq("visibility", "false");

    if (data) {
      await client.set("publicLetters", JSON.stringify(data));
      await client.expire("publicLetters", 2592000);
    }
    if (error) throw error;
    res.send(data);
  } catch (err) {
    console.log("ERROR-viewPublicLetters", err);
  }
};
