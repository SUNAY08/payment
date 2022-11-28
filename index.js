const express = require('express');
const app = express();

app.use(express.json())

const path = require('path');
app.use(express.static(__dirname + '/view')); //__dir and not _dir

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

app.use('/payment', require('./paymentRoute.js'));

const port = 5000;
app.listen(port, () => console.log("server is running on port : ", port))