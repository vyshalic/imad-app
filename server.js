var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config={
    user: 'vyshalichandramohan',
    database:'vyshalichandramohan',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles= {
    'article-one':{
    title:'Article One|Vyshali C',
    heading:'Article One',
    date:' 15 Aug 2017',
    content:`<p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>`
    },
    'article-two':{
         title:'Article Two|Vyshali C',
    heading:'Article Two',
    date:' 15 Aug 2017',
    content:`<p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>`
    },
    'article-three':{
    title:'Article Three|Vyshali C',
    heading:'Article Three',
    date:' 15 Aug 2017',
    content:`<p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>
             <p>This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.This is where the actual content of the page is put.
            </p>`
    }
};
function createTemplate(data){
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
    var htmlTemplate=`
        <html>
        <head>
            <title>
            ${title}
            </title>
            <meta name="viewport" content="width-device-width ,inital-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
          <div class="container">
            <div>
                <a href="/">Home</a>
            </div>
            <div>
                <h3> ${heading}</h3>
                <div>
                ${date.toDateString()}
                </div>
            </div>
            <div>
            ${content};
            </div>
          </div>
        </body>
    </html>
    `;
    return htmlTemplate;
    }
    
var pool=new Pool(config);
app.get('/test-db', function (req, res) {
  //make a select request
  //return the request with a response
  pool.query('SELECT *FROM test',function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          res.send(JSON.stringify(result.rows));
      }
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/articles/:articleName',function(req, res){
    //By putting a colon infront , the server tries to match the name
    //passing parameter as articles[articleName] to match the url name and get file
    var articleName=req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title =$1" , [req.params.articleName],function(err,result){
      if(err){
          res.status(500).send(err.toString());
      }else{
          if(result.rows.length===0){
              res.status(404).send('Article not found!');
          }else{
        
         var articleData= result.rows[0];
         res.send(createTemplate(articleData));
              
          }
      }
  });
    
});
var counter = 0;
app.get('/counter', function(req,res) {
   counter = counter + 1;
   res.send(counter.toString());
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
