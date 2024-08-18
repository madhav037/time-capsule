import { supabase } from "../index.js";

export const insertInBulk = async (req, res) => {
    const { data } = req.body;
    
    try {
      const { error } = await supabase.from("letter").insert([
        ...data.map((letter) => {
          return {
            body: letter.body,
            dateWritten: letter.dateWritten,
            dateToRecieve: letter.dateToRecieve,
            visibility: letter.visibility,
            email: letter.email,
            userID: letter.userID === undefined ? null : letter.userID,
            sent: letter.sent,
          };
        }),
      ]);
  
      if (error) throw error;
      res.send("Inserted in bulk");
    } catch (err) {
      console.log("ERROR-insertInBulk", err);
    }
  };