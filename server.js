const WebSocket = require('ws');
const {Client} = require('pg');
const express =require('express');
const app = express();
const ws = new WebSocket.Server({ port: 9998 });

// var active_connection = null;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'rdc_1',
  // password: 'postgres',
  password: 'ciaodafrancesca',
  port: 5432
});
// client.connect();
// const query = "INSERT INTO utenti (id_utente) SELECT * FROM (SELECT $1) AS tmp WHERE NOT EXISTS (SELECT id_utente FROM utenti WHERE id_utente = $1) RETURNING *"
//             const value = [nome]

//             client
//             .query(query, value)
//             .then(res => {
//                 console.log(res.rows[0])
//                 //{id_utente: name}
//             })
//             .catch(e => console.error(e.stack))
            
            
ws.on('connection', function connection(ws) {

  console.log("new client connected");
  // ws.send("hello new client");


  ws.on('message', function incoming(message) {
     
    console.log('received_s: %s', message);
    // ws.send("the message i receiver is"+message);

    if(message=="connect"){
      client.connect();

    }
    if(message=="query"){
      client.connect();
      const query = "SELECT * FROM azioni "
      client
                  .query(query)
                  .then(res => {
                      console.log(res.rows[0])
                      
                  })
                  .catch(e => console.error(e.stack))

    }
  });

 

});

app.listen(3000,()=> console.log("server in ascolto"));

app.get('/',(req,res)=> res.send("ciao dal server sei connesso sulla 3000"));

