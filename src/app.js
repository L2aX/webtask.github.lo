const express=require("express");
const path =require("path");
const hbs=require("hbs");
require("./db/cnn");
const User=require("./models/usermessage")
const app = express();
const port=process.env.PORT ||3000;

const staticpath=path.join(__dirname,"../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialspath=path.join(__dirname,"../templates/partials");


app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.use(express.urlencoded({extended:false}));
app.set('view engine','hbs');
app.set('views',templatepath);
hbs.registerPartials(partialspath);


app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/contact",(req,res)=>{
  res.render("contact");
})
app.post("/contact",async(req,res)=>{
        const userdata=new User(req.body);
        await userdata.save();
     
        res.render("index") 
    })

app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})