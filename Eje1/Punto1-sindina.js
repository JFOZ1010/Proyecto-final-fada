let fs = require('fs');
/**
 * Nombres de los archivos de lectura y escritura, modifique como considere.
 */
let ARCHIVO_LECTURA = 'inA';
let ARCHIVO_ESCRITURA = 'outA'

/**
 * Método para realizar la lectura del problema, no modificar.
 */
async function input() {
    let line = 0;
    let readData = "";
    const readLine = () => {
        let inputLine = readData[line];
        line++;
        return inputLine;
    }
    return new Promise((resolve, reject) => {
        fs.readFile((ARCHIVO_LECTURA + '.txt'), 'utf-8', async (err, data) => {
            if (err) {
                reject(err);
            } else {
                readData = data.split("\n").map(e => e.replace('\r', ''));
                let n = parseInt(readLine());
                let p = [];
                
                for(let i = 0 ; i < n; ++i){
                    let linea = readLine();
                    let data = linea.split(" ");
                    let horas = data[1].split("-");
                    let horaI, minI, horaF, minF;
                    let tiempo = horas[0].split(":");
                    horaI = parseInt(tiempo[0]);
                    minI = parseInt(tiempo[1]);
                    tiempo = horas[1].split(":");
                    horaF = parseInt(tiempo[0]);
                    minF = parseInt(tiempo[1]);
                    p.push(new Procedimiento(data[0], new Hora(horaI, minI), new Hora(horaF, minF), horaF-horaI))
                }
                resolve(p);
            }
        });
    });
}
/**
 * Método para realizar la escritura de la respuesta del problema, no modificar.
 */
async function output(obj) {
    let out = obj.n + "\n";
    out += obj.tiempoTotal + "\n";
    for( let i = 0 ; i < obj.n ; ++i){
        out+= obj.nombreProcedimientos[i] +"\n";
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(ARCHIVO_ESCRITURA + '.txt', out, (err, list) => {
            if (err) reject(err);
            resolve(true);
        });
    });
}

/**
 * Implementar el algoritmo y devolver un objeto de tipo Respuesta, el cual servirá
 * para imprimir la solución al problema como se requiere en el enunciado.
 */

 function generateBST(array) {
    this.value = array[0];
    this.left = null;
    this.rigth = null;
    
    array.map((procedimiento) => {
        this.insert(procedimiento);
    })
/* 
    let posible = true;

    array.filter((a) => a.horaInicio.fin <= 24) */

  }
  
  generateBST.prototype.insert = function(value) {
    if (this.value.horaInicio.hora > value.horaInicio.hora) {
      if (!this.left) this.left = new generateBST([value]); // <- pasamos un arreglo
      else this.left.insert(value);
    } else if (this.value.horaInicio.hora < value.horaInicio.hora) {
      if (!this.rigth) this.rigth = new generateBST([value]); // <- pasamos un arreglo
      else this.rigth.insert(value);
    }
  }
  
  /* let tree = new generateBST([16,6,23,2,17,31,14,5]);
  console.log(JSON.stringify(tree, null, 2)); */

async function solve(n, procedimientos) {


    procedimientos.sort(((a,b) => a.horaInicio.hora - b.horaInicio.hora))

    console.log(procedimientos)

    let tree = new generateBST(procedimientos);
    
    let soluciones = [tree];

    for(let i of procedimientos){
        procedimientos.shift()
        tree = new generateBST(procedimientos);
        soluciones.push(tree)
    }

    /* console.log(JSON.stringify(tree, null, 2)); */
    console.log(soluciones[0].rigth);

    return new Respuesta(0, new Hora(0, 0), []);
}
async function main() {
    const p = await input();
    let res = await solve(p.length, p);
    await output(res);
}


function Respuesta(n, tiempoTotal, nombreProcedimientos){
    this.n = n;
    this.tiempoTotal = tiempoTotal;
    this.nombreProcedimientos = nombreProcedimientos;
}

function Procedimiento(nombre, horaInicio, horaFin, tarda){
    this.nombre = nombre;
    this.horaInicio = horaInicio;
    this.horaFin = horaFin;
    this.tarda = tarda;
}

class Hora {
    constructor(hora, minutos) {
        this.hora = hora;
        this.minutos = minutos;
    }
    toString(){
        let res = "";
        if (this.hora < 10)
            res+="0"+this.hora;
        else
            res+=this.hora; 
        res+=":";
        if (this.minutos < 10)
            res+="0"+this.minutos;
        else
            res+=this.minutos;
        return res;
    }
}
main();