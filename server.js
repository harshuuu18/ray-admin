const app = require("express")();

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(9000, () => {
  console.log("server is running on port");
});
