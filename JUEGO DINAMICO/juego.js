//un contador de tarjetas
//null -> que no tiene valor
let tarjetasDestapadas = 0;
let tarjeta1 = null; 
let tarjeta2 = null; 

primerResultado = null;
segundoResultado = null;

let movimientos =0; 
//apuntando a documento html de movements(Movimientos)
let mostrarMovimientos = document.getElementById('movimientos');

let aciertos = 0;
//apuntando a documento html de los hits(Aciertos)
let mostrarAciertos = document.getElementById('aciertos');

let temporizador = false; // false-> valor inicial
let timer = 30;
let timerInicial = 30;
let mostrarTiempo = document.getElementById('t-restantes');
let tiempoRegresivoId = null;

let clickAudio = new Audio("./audio/click.wav");
let correctoAudio = new Audio("./audio/correcto.wav");
let erroneoAudio = new Audio("./audio/erroneo.wav");
let ganaAudio = new Audio("./audio/gana.wav");
let pierdeAudio = new Audio("./audio/pierde.wav"); 


//Generar los numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

function contarTiempo(){
 tiempoRegresivoId = setInterval(()=>{
   timer --;
   mostrarTiempo.innerHTML = `Time: ${timer} seconds`;  
   if(timer == 0){
     clearInterval(tiempoRegresivoId);
     bloquearTarjetas();
     pierdeAudio.play();
   }
 },1000);
}

//funcion de bloquear
//tendra un valor 0, llega a 15 y aumenta
function bloquearTarjetas(){
  for (let i = 0; i <= 15; i++){
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = `<img src="./imagenes/${numeros[i]}.png" alt="">`;
    tarjetaBloqueada.disabled = true;
  }
}

//funcion principal
function destapar(id){

  if(temporizador == false){
    contarTiempo();                
    temporizador = true;//ejecutar "contarTiempo",temporizador se vuelve activo 
 
  }

tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if(tarjetasDestapadas == 1){
  //mostrar primer numero
  tarjeta1= document.getElementById(id);
  primerResultado = numeros[id ]; //16 botones se asocien a los 16 elementos desordenados.
  tarjeta1.innerHTML = `<img src="./imagenes/${primerResultado}.png" alt="">` 
  clickAudio.play();
  //deshabilitar el primer boton
  tarjeta1.disabled = true;

 }else if(tarjetasDestapadas == 2){
    //mostrar segundo numero
    tarjeta2 = document.getElementById(id)
    segundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./imagenes/${segundoResultado}.png" alt="">`;

  //deshabilitar el segundo boton
   tarjeta2.disabled = true;

   
   // movimientos,cada vez que destapas dos tarjetas
   //incrementar movimientos
   movimientos++;
   mostrarMovimientos.innerHTML = `Movements: ${movimientos}`; //variable que esta incrementandose

   if(primerResultado == segundoResultado){
    //encerar contador de tarjetas destapadas
    tarjetasDestapadas = 0;
    //aumentar aciertos
    aciertos++;
    mostrarAciertos.innerHTML = `Hits: ${aciertos}`; 
    correctoAudio.play();

    if(aciertos == 8){
      ganaAudio.play();
    //mensajes finales
    clearInterval(tiempoRegresivoId);
    mostrarAciertos.innerHTML = `Hits: ${aciertos}🙀`; 
    mostrarTiempo.innerHTML = `GREAT YOU ONLY TOOK ${timerInicial - timer} SECONDS!🥳 `
    mostrarMovimientos.innerHTML = ` Movements: ${movimientos}✌🏼🤪  `;
    }
   }else{
    erroneoAudio.play();
   //cuando no sean iguales ocurrira:
   setTimeout(()=>{
    tarjeta1.innerHTML = " ";
    tarjeta2.innerHTML = " ";
    tarjeta1.disabled = false;
    tarjeta2.disabled = false;
    tarjetasDestapadas = 0;
   },600);
   }
 }
}