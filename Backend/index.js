require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const supabaseConnect = require("./supabase/Supabase_Connect");
const userRouter = require("./routes/routerUser")
const contactRouter = require("./routes/contact")
const conversationsRouter = require("./routes/conversations")
const feedsRouter = require("./routes/routerfeeds")
const cartRouter = require("./routes/routerCart")
const depotRouter = require("./routes/depotRouter")
const codeRouter = require("./routes/codeRouter")

app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json({limit: "10mb"}))
app.use(cors())

app.use((req, res, next) => {
  req.supabase = supabaseConnect;
  next();
});

app.use("/users", userRouter)
app.use("/contacts", contactRouter)
app.use("/conversations", conversationsRouter)
app.use("/", feedsRouter)
app.use("/", depotRouter)
app.use('/', cartRouter)
app.use('/codes',codeRouter)




app.listen(3000, () => {
  console.log('> Ready on http://localhost:3000');
});