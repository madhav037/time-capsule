import { client, supabase } from "../index.js";
import Mailjet from "node-mailjet";
import dotenv from "dotenv";
dotenv.config();

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_APIKEY_PUBLIC,
  process.env.MAILJET_APIKEY_PRIVATE
);

export const sendLetter = async () => {
  let datas = await client.get("letters");
  datas = JSON.parse(datas);
  console.log("data", datas);
  if (!datas) {
    console.log("No letters to send");
    return;
  }
  datas.forEach(async (data) => {
    const request = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SENDERMAIL,
            Name: "TimeCapsule",
          },
          To: [
            {
              Email: data.email,
              Name: "You",
            },
          ],
          //!integrate BCC and CC
          Subject: "TO THE PAST!",
          // TextPart: `${data.body} heeeelllooo`,
          HTMLPart: `<h3>Letter from : ${data.dateWritten}</h3>\n<p>${data.body}</p>`,
        },
      ],
    });
    request
      .then((result) => {
        console.log(result.body);
      })
      .catch((err) => {
        console.log(err.statusCode);
      });

    const { error: updateLetterError } = await supabase
      .from("letter")
      .update({ sent: true })
      .eq("id", data.id);

    if (updateLetterError) {
      console.log("ERROR-updateLetter", updateLetterError);
    }
  });
};
