const express= require('express');
const bodyParser= require('body-parser');
const ejs=require('ejs');
const mongoose= require('mongoose');
const bcrypt=require('bcrypt');
const session = require('express-session');
const app= express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const saltRounds = 10;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({secret:'khushi_budhu_h'}));
const secret = 'prathamagarwal' 
const fetch = require("node-fetch");
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
mongoose.connect("mongodb://127.0.0.1:27017/recipeDB");
const recipeSchema= new mongoose.Schema({
    title:String,
    ingrediants:String,
    description:String

});
const loginSchema=new mongoose.Schema({
    email:String,
    name:String,
    password:String
});
const Recipe= mongoose.model('Recipe',recipeSchema);
const Login=mongoose.model('Login',loginSchema);
var log=false;
console.log(log);

const requireLogin = (req,res,next) =>{
    const token = req.cookies.token;
    jwt.verify(token,secret,{}, (err,info) =>{
        if(err)
        {
            res.send("Login First");
        }
        next();
        
    })
}

app.get('/',function(req,res){
    if(!req.session.user_id){
    res.render('home',{change:"Signin"})
    }
    else{
        res.render('home',{change:"Logout"})
    }
})


app.get('/posts',function(req,res){
    Recipe.find({},function(error,foundrecipe){
        if(error){
            console.log(error)
        }
        else{
            res.json(foundrecipe);
        //     if(!req.session.user_id){
        // res.render('posts',{recipePost:foundrecipe,change:"Signin"})
        //     }
        //     else{
        //         res.render('posts',{recipePost:foundrecipe,change:"Logout"})
        //     }
        }
    })
})

app.get('/yourrecipe',requireLogin,function(req,res){
    if(!req.session.user_id){
        res.redirect("/signin");
    }
    else{
    res.render('yourrecipe',{change:"Logout"});
    }
})

app.post('/yourrecipe',function(req,res){
    console.log(req.body);
    var head=req.body.dishname;
    var ind=req.body.ingredient;
    var desp=req.body.instruction;
    const newrecipe= new Recipe({
        title:head,
        ingrediants:ind,
        description:desp
    });
    newrecipe.save();
    res.redirect('/posts')
});

var dishname="";
var dishcategory = "";
var dishArea="";
var dishinst="";
var image="";
var youtube="";

app.get('/recipe', function(req, res) {
    res.json({dishname,dishcategory,dishArea,dishinst,image,youtube});
});

app.post('/recipe',function(req,res){
    const query=req.body.recipe;
    const url = "https://www.themealdb.com/api/json/v1/1/search.php?s="+query+"";
    fetch(url)
    .then((response) => response.json())
    .then((rec)=>{
        // console.log(rec);
         dishname = rec.meals[0].strMeal;
         dishcategory = rec.meals[0].strCategory;
         dishArea = rec.meals[0].strArea;
         dishinst = rec.meals[0].strInstructions;
         image=rec.meals[0].strMealThumb;
         youtube=rec.meals[0].strYoutube;
         res.redirect('/recipeview');
    });
})


app.get('/recipeview',function(req,res){
    res.render('recipeview',{name:dishname,cat:dishcategory,org:dishArea,instruct:dishinst,pic:image,link:youtube});
})

app.get('/signin',function(req,res){
    res.render('Signin');
})

app.post('/signin',function(req,res){
    // console.log(req.body);
    const uname=req.body.username;
    const upass=req.body.password;
    Login.findOne({name:uname},function(err,founduser){
        console.log(err);
        if(founduser==null){
            console.log("err");
            res.status(400).json('Wrong Credentials');
        }
        else if(founduser){
            bcrypt.compare(upass, founduser.password,function(err, result)
            {
                if(result){
                    jwt.sign({username:uname,id:founduser._id}, secret, {},(err,token) =>{
                        if(err) throw err;
                        res.cookie('token',token).json(
                            {id:founduser._id,
                            username:uname}
                        );
                    })
                    // req.session.user_id = founduser.id;
                    // res.redirect('/yourrecipe');
                }
                else{
                    res.status(400).json('Wrong Credentials');
                }
            });
        }
    })
})

app.get('/signup',function(req,res){
    res.render('signup');
})

app.post('/signup',function(req,res){
    console.log(req.body);
    const data= req.body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data, salt, function(err, hash) {
            const newuser= new Login({
                email:req.body.email,
                name:req.body.username,
                password:hash
            })
            newuser.save((err,room) =>{
                console.log("room");
            });
            res.json({username:req.body});
        });
    });
});

app.get('/Logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
})
app.get('/authorized', (req,res) => {
    const token = req.cookies.token;
    jwt.verify(token,secret,{}, (err,info) => {
        if(err) throw err;
        // if(err) res.status(400).json('ok');
        // console.log(info);
        res.cookie('token',token).json(info);
    })
})


app.listen(4000,function(req,res){
    console.log("Server running at 4000");
})


app.post('/logout', (req,res) => {
    res.cookie('token', null).json('ok');
})

