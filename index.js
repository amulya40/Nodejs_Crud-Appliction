var express = require ('express');
var app=express();
var mongoose = require('mongoose');
var User=require('./models/index');
var bodyParser = require('body-parser'); // work like middle were.

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/Crud",{useUnifiedTopology: true, useNewUrlParser: true});
var connection = mongoose.connection;
connection.once('open', function(){
    console.log("connection successfully")
})

app.set('view engine', 'ejs'); //Because we used ejs templet engine.

app.get('/',function(req,res){

    res.render('insert');
});
app.post('/insert', function(req,res){   //Taking POST value in UI
    
    var user=new User({     //Inserting data to mongo
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    user.save(() =>{
        res.redirect('/show')
        // res.send("<h1>data send...</h1>");
    })
});

app.get('/show', function(req,res){ ///Route
    User.find({},function(err,result){ //READ


        res.render('show',{users:result});
    })    
});

app.get('/delete/:id',async function(req,res){ ///Route   and it is returning promise so async await
    await User.findByIdAndDelete(req.params.id);  /* DELETE BY TAKING Reference as ID */
        res.redirect('/show');
    });

app.get('/edit/:id', function(req,res){ ///Route   and it is returning promise so async await
    User.findById(req.params.id,function(err,result){  /* Update BY TAKING Reference as ID */
    res.render('edit',{users:result});
    })
    }); 

app.post('/update/:id',async function(req,res){ //id is getting form Edit.ejs
    await User.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/show')
});



        
        




var server=app.listen(4000,function(){
    console.log("Go to port no. 4000")
});

//MIDDLEWARE and STATIC FILES
app.use(express.static('./style'));