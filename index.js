const express= require('express');
const app=express();
const path=require('path')
const http=require('http').Server(app)
const io=require('socket.io')(http)

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'))
})


io.on('connection',(socket)=>{
    ;
    socket.on('newuser',name=>{
        console.log(   name," join the chat")
        socket.id=name
        socket.broadcast.emit('userjoin',name);
    }) 

 socket.on('send',(message)=>{
  socket.broadcast.emit('recieve',{message:message,name:socket.id})
 })






    socket.on("disconnect",(message)=>{
       socket.broadcast.emit('left',socket.id);
       delete socket.id;
    })
    
    

})






http.listen(8002,()=>{
    console.log("App is listening to 8002");
})
