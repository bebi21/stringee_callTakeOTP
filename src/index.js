const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/call", (req, res) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer  Mã này được  mã hóa bởi postman khi  export ra bao  gồm (sid, scrept)",
  );
  myHeaders.append("Cookie", "SRVNAME=SF");

  const raw = JSON.stringify({
    from: {
      type: "external",
      number: "Số điện thoại được cấp bởi stringee",
      alias: "STRINGEE_NUMBER",
    },
    to: [
      {
        type: "external",
        number: "Số điện thoại  bản thân đâu  84",
        alias: "TO_NUMBER",
      },
    ],
    answer_url: "https://example.com/answerurl",
    actions: [
      {
        action: "talk",
        text: "Chào mừng bạn đến với bình nguyên vô tận",
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://api.stringee.com/v1/call2/callout", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
