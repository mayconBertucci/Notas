const {crear, borrar, ordenar, buscar, escribir, leer} = require('./notas');
const yargs = require('yargs');


yargs.command({
    command: 'add',
    describe: 'añadir nota',
    builder: {
        titulo: {
            alias: 't',
            describe: 'el titulo',
            demandOption: true,
            typ: 'string'
        },
        cuerpo: {
            alias: 'c',
            describe: 'el cuerpo',
            demandOption: true,
            typ: 'string'
        }

    },
    handler(argv) {
        crear(argv.titulo, argv.cuerpo);
    }
});

yargs.command({
    command: 'remove',
    describe: 'borrar nota',
    builder: {
        titulo: {
            alias: 't',
            describe: 'titulo',
            demandOption: true,
            typ: 'string'
        },
        handler(argv) {
            borrar(argv.titulo);
        }
    }
});

yargs.command({
    command: 'sort',
    describe: 'ordenar notas',
    builder: {
        criterio: {
            alias: 't',
            describe: 'titulo o cuerpo',
            demandOption: true,
            typ: 'string'
        },
        handler(argv) {
            ordenar(argv.criterio);
        }
    }
});

yargs.command({
    command: 'find',
    describe: 'buscar texto en notas',
    builder: {
        titulo: {
            describe: 'texto a buscar',
            demandOption: true,
            typ: 'string'
        },
        handler(argv) {
            buscar(argv.texto);
        }
    }
});

yargs.command({
    command: 'create',
    describe: 'crear nota',
    builder: {
        titulo: {
            alias: 't',
            describe: 'el titulo',
            demandOption: true,
            typ: 'string'
        },
        cuerpo: {
            describe: 'el cuerpo',
            demandOption: true,
            typ: 'string'
        },
        handler(argv) {
            escribir(argv.titulo, argv.cuerpo);
        }
    }
});

yargs.command({
    command: 'read',
    describe: 'leer notas',
    builder: {
        handler(argv) {
            leer(argv.fichero);
        }
    }
});

yargs.parse();