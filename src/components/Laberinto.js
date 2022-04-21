import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styles from './Laberinto.css'
import Personaje from './Personaje.jpg'
import Metas from './Metas.jpg'
import pared from './pared.svg'

//Función que procesa los elementos y los manda a la pantalla. Este lee a todas las paredes.
function Paredes(){
    return(
        <div className='Pared'>
            <img className='Paredes' src={pared}/>
        </div> /*Haciendo div para los elemenetos paredes*/
    )
}


//Función que procesa los elementos y los manda a la pantalla. Este lee el espacio vacío.
function Otro(){
    return(
        <div className='Otro'></div> /*Haciendo div para el espacio vacío*/
    )
}

//Función que procesa los elementos y los manda a la pantalla. Este lee al elemento del jugador.
function Jugador(){
    return(
        <div className='Jugador'>
            <img className='Heroe' src={Personaje}/>
        </div> /*Haciendo div para el jugador*/
    )
}

//Función que procesa los elementos y los manda a la pantalla.
function Meta(){
    return(
        <div className='Meta'>
            <img className='Metas' src={Metas}/>
        </div> /*Haciendo div para el espacio vacío*/
    )
}

function Laberinto () {
    
    //Api: https://maze.juanelcaballo.club/?type=json&w=4&h=4.

    //useState sirve para modificar el estado de un componente.
    const [maze, setMaze] = useState([]) //Se le pasa un array vacío porque va a ser el estado del maze; la variable laberinto va a ser el estado inicial del maze.
                                                    //setLaberinto permite actualizar el estado del laberinto.

    /*Estados para las posiciones x e y*/
    //Se inicializa en 1, dado que el jugador está en (1,1)
    const [posx, setPosx] = useState(1)
    const [posy, setPosy] = useState(1)


    function movimientos() {
        window.addEventListener("load", ()=> {
            
            /*Identificando las teclas que se presionan*/
            window.addEventListener("keydown", (e) => {
                if(e.key === "ArrowLeft"){
                    /*Detectando la flecha izquierda para poder mover al personaje*/
                    console.log("Izquierda")
                    /*Viendo si la posición de la izquierda está vacía o si en la posición está el jugador*/
                    if(maze[posy][posx -  1] === ' ' || maze[posy][posx - 1] === 'p'){
                        setPosx(posx-1)
                        console.log("Sí llegué")
                    }
                }else if(e.key === "ArrowRight"){
                    /*Detectando la flecha derecha para poder mover al personaje*/
                    console.log("Derecha")

                    /*Viendo si la posición de la derecha está vacía o si en la posición está el jugador*/
                    if(maze[posy][posx + 1] === ' ' || maze[posy][posx + 1] === 'p'){
                        setPosx(posx+1)
                        console.log("Sí llegué")
                    }

                }else if(e.key === "ArrowDown"){
                    /*Detectando la flecha de abajo para poder mover al personaje*/
                    console.log("Abajo")

                    /*Viendo si la posición de abajo está vacía o si en la posición está el jugador*/
                    
                    if(maze[posy + 1][posx] === ' ' || maze[posy + 1][posx] === 'p'){
                        setPosx(posy+1)
                        console.log("Sí llegué")
                    }
                }else if(e.key === "ArrowUp"){
                    
                    /*Detectando la flecha de abajo para poder mover al personaje*/
                    console.log("Arriba")

                    /*Viendo si la posición de arriba está vacía o si en la posición está el jugador*/
                    if(maze[posy - 1][posx] === ' ' || maze[posy - 1][posx] === 'p'){
                        
                        setPosx(posy-1)
                        console.log("Sí llegué")
                    }
                }
            })

    })
}
    /*Haciendo efectiva la función de movimientos*/
    useEffect(() => {
        movimientos()
    }, [])


    //useEffect sirve para poder ver efectos secundarios en componentes.
    useEffect(() => {

        //Función que manda a pedir el laberinto al API. Esta función va a hacer un pedido asincrónico. Va a tener un async y un await. 
        //El async determina que la función va a tener un pedido asincrónico y cuando se hace el pedido, no se sabe cuánto va a tardar. En ese momento se pone un await
        //para decirle que espere hasta que se haga la consulta.
        function obtenerLaberinto  () {

            //Trayendo el laberinto desde el API.
             const url = 'https://maze.juanelcaballo.club/?type=json&w=3&h=3' //Url del API. 
            //Pedido con fetch.
             fetch(url)
                .then(res => res.json()) 
                .then(datos => setMaze(datos))//Se llama a setLaberinto y se le pasa como parámetro el result.data que es la matriz de que se pidió desde el API.
             //console.log(result.data) //Imprimiendo la data del API.
             //console.log(resultado) //Imprimiendo las cosas que trajo del API.
             //La función para actualizar elementos es setLaberinto.
            //console.log(maze)
        }

        obtenerLaberinto() //Poniendo a funcionar la promesa.

    }, []) //Si no se pone un array vacío, entonces la función se ejecuta en un loop infinito.


    console.log(maze) //Corroborando la matriz que se trajo del API.

    return(
        <div className="Maze"> {/*Padre de todos los div's*/}
            {/*Devolviendo un map que va a imprimir cada elemento del laberinto*/}
            <h2>Ahora trata de llegar a la meta</h2> {/*Imprimiendo en pantalla un título h2 para indicar que se está imprimiendo el laberinto*/}
            <div className='Mapa'> {/*Se mapea la matriz de laberinto y luego se mapea cada matriz que hay dentro de la matriz grande.*/}
                { /*Jalando todos los objetos de la matriz devuelta por el fetch*/
                    maze.map((elementos) => 
                        /*Entrando a la matriz que se trae desde el API*/
                     <div className='Todo' key={Math.random()}>{
                        elementos.map((elemento) => {
                            /*Leyendo cada elemento de la matriz que se trae desde el API*/
                            if(elemento === "-" || elemento === "|" || elemento === "+"){
                                /*Si la matriz tiene estos elementos, entonces significa que hay paredes y suelos*/
                                /*Llamando al elemento Paredes para dibujarlas en la pantalla*/
                                return <Paredes
                                        key = {Math.random()}
                                        /> 
                            }if(elemento === " "){
                                /*Llamando al elemento otro para dibujar un espacio vacío en el canvas*/
                                return <Otro 
                                        key={Math.random()}
                                        />
                            }if(elemento === "p"){
                                /*Llamando al método de Jugador para que cree un div personalizado*/
                                return <Jugador
                                    key={Math.random()}
                                />
                            }if(elemento === "g"){
                                /*Llamando al elemento meta para dibujarla en el canvas*/
                                return <Meta
                                    key={Math.random()}
                                />                                
                            }
                        })}
                        </div>
                    )}
            </div>
        </div>
    )

    //console.log(maze) //Imprimiendo el array del laberinto.
}

export default Laberinto