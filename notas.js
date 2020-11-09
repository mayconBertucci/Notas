const fs = require('fs');
const chalk = require('chalk');

const crearNota = (titulo, cuerpo) =>{
    const notas = leerNotas('notas.json');

    const indice = notas.findIndex(
        (nota) => nota.titulo === titulo
    );

    if (indice === -1) {
        console.log(chalk.green.inverse('Nota creada'))
        notas.push({
            titulo: titulo,
            cuerpo: cuerpo
        });
        escribirNotas('notas.json', notas);
    } else {
        console.log(chalk.red.inverse('La nota ya está guardada'));
    }

    return notas.length;
}

const borrarNota = (titulo) => {

    const notas = leerNotas('notas.json');
    
    const indice = notas.findIndex((nota) => nota.titulo  === titulo);

    if(indice === -1){
        console.log(chalk.red.inverse('Nota no encontrada'));
    } else {
        notas.splice(indice, 1);
        escribirNotas('notas.json', notas);
        console.log(chalk.green.inverse('Nota borrada'));
    }
}

const ordenarNotas = (opcion) => {
    const notas = leerNotas('notas.json');

    if(opcion === 'titulo'){
        notas.sort((notaA, notaB) => {
            if (notaA.titulo.toLowerCase() < (notaB.titulo.toLowerCase())) {
                return -1;
            } else if(notaA.titulo.toLowerCase() < (notaB.titulo.toLowerCase())) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (opcion === 'cuerpo') {
        notas.sort((notaA, notaB) => {
            if (notaA.cuerpo.toLowerCase() < (notaB.cuerpo.toLowerCase())) {
                return -1;
            } else if (notaA.cuerpo.toLowerCase() < (notaB.cuerpo.toLowerCase())) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        console.log(chalk.red.inverse('Opcion no encontrada'));
    }
    escribirNotas('notas.json', notas);
}

const buscarTextoEnNotas = (texto) => {
    const notas = leerNotas('notas.json');
    
    const notaEncontrada = notas.find((nota) => {
        return nota.titulo.toLowerCase().includes(texto.toLowerCase()) || nota.cuerpo.toLowerCase().includes(texto.toLowerCase());
    });

    if (notaEncontrada) {
        console.log(chalk.green.inverse('Nota encontrada'));
        console.log(notaEncontrada);
    } else {
        console.log(chalk.red.inverse('No se encuentra la nota'));
    }
}

const escribirNotas = (fichero, notas) => {
    const textoJSON = JSON.stringify(notas);
    fs.writeFileSync(fichero, textoJSON);
}

const leerNotas = (fichero) => {
    try {
        const buffer = fs.readFileSync(fichero);
        const datosString = buffer.toString();
        return JSON.parse(datosString);
    } catch (erro) {
        console.log(error);
        return[];
    }
}


module.exports = {
    crear: crearNota,
    borrar: borrarNota,
    ordenar: ordenarNotas,
    buscar: buscarTextoEnNotas,
    escribir: escribirNotas,
    leer: leerNotas,
}