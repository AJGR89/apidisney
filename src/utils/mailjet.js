import {MAILJET_API_SECRET, MAILJET_API_KEY,MAILJET_API_SENDER} from "../config"

const mailjet = require("node-mailjet").apiConnect(MAILJET_API_KEY, MAILJET_API_SECRET);
const requestMailJet = (name,email) => {
    return mailjet
    .post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: MAILJET_API_SENDER,
            Name: "Node Challenge",
          },
          To: [
            {
              Email: email,
              Name: name,
            },
          ],
          Subject: "Welcome to NodeChallenge",
          TextPart:
            `Hi! ${name}, welcome to my node challenge for Alkemy`,
          HTMLPart:
          `<h3>Hi! ${name}, welcome to my node challenge for <a href="https://www.alkemy.org/">Alkemy</a>!</h3><br />Please visit my <a href="https://github.com/AJGR89/apidisney">repository</a> `,
        },
      ],
    });
}


module.exports = {requestMailJet}


