let fs = require('fs');
/**
 * Nombres de los archivos de lectura y escritura, modifique como considere.
 */
let ARCHIVO_LECTURA = 'inB';
let ARCHIVO_ESCRITURA = 'outB'

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
                let [n, m] = readLine().split(" ").map(e => parseInt(e));
                let libros = [];
                for(let i = 0 ; i < m; ++i){
                    let data = readLine().split(" ");
                    let nombre = data[0];
                    let paginas = parseInt(data[1]);
                    libros.push(new Libro(nombre, paginas));
                }
                resolve(new Entrada(n, m, libros));
            }
        });
    });
}
/**
 * Método para realizar la escritura de la respuesta del problema, no modificar.
 */
async function output(obj) {
    let out = obj.tiempoTotal + "\n";
    for( let i = 0 ; i < obj.libroQueEmpieza.length ; ++i){
        out+= obj.libroQueEmpieza[i] + " " + obj.libroQueTermina[i] +"\n";
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
async function solve(n, m, libros) {

    return new Respuesta(0, [], []);
}
async function main() {
    const inp = await input();
    let res = await solve(inp.n, inp.m, inp.libros);
    await output(res);
}


function Entrada(n, m, libros){
    this.n = n;
    this.m = m;
    this.libros = libros; 
}
function Libro(nombre, paginas){
    this.nombre = nombre;
    this.paginas = paginas;
}
function Respuesta(tiempoTotal, libroQueEmpieza, libroQueTermina){
    this.tiempoTotal = tiempoTotal;
    /**
     * Esta variable contiene en su posición i, el nombre del libro por el que empieza el i-ésimo
     * escritor.
     */
    this.libroQueEmpieza = libroQueEmpieza;
    /**
     * Esta variable contiene en su posición i, el nombre del libro por el que termina el i-ésimo
     * escritor.
     */
    this.libroQueTermina = libroQueTermina;
}

main();