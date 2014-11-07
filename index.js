var five = require("johnny-five"),
  board, photoresistor;

var mysql = require("mysql");

var cliente = mysql.createConnection({
  'user' : 'root',
  'password' : '',
  'host' : 'localhost',
  'port' : 3306,
  'database' : 'arduino'
});

cliente.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});



board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 1000
  });

var motor;
  /*
      Motor A
        pwm: 3
        dir: 12
   */

/*
  motor = new five.Motor({
    pins: {
      pwm: 3,
      dir: 12
    },
    //AQUI FALTARIA AGREGARLE LA VELOCIDAD
    invertPWM: true
  });




  board.repl.inject({
    motor: motor
  });

  motor.on("start", function(err, timestamp) {
    console.log("start", timestamp);
  });


//ESTA NO VA PQ QUEREMOS QUE EL MOTOR SEA CONTINUO
  motor.on("stop", function(err, timestamp) {
    console.log("automated stop on timer", timestamp);
  });

  motor.on("forward", function(err, timestamp) {
    console.log("forward", timestamp);

    // demonstrate switching to reverse after 5 seconds
      //ESTAS NO VAN PORQUE NO QUEREMOS QUE EL MOTRO CAMBIE SENTIDO
      //board.wait(5000, function() {
      //motor.reverse(50);
      //});
  });

//ESTA NO VA PORQUE ES LA REVERSA
  motor.on("reverse", function(err, timestamp) {
    console.log("reverse", timestamp);

    // demonstrate stopping after 5 seconds
    board.wait(5000, function() {
      motor.stop();
    });
  });

  // set the motor going forward full speed
  motor.forward(255);


  */

  

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  var contador = 1;
  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    if(this.value < 100) {
      cliente.query('UPDATE valores SET valor = ? WHERE id = ?', [contador++, 1] , function(error, result){
         if(error){
            throw error;
            cliente.end();
         }else{
            console.log(result);
         }
      });
    }

    console.log(this.value);
  });
});


