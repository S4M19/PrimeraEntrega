let cursos = [{
    id: 1,
    nombre:'Programación Avanzada',
    duracion: '50 horas',
    valor: '250000 pesos'
},
{
    id: 2,
    nombre:'Estadistica Inferencial',
    duracion: '30 horas',
    valor: '180000 pesos'
},
{
    id: 3,
    nombre: 'Inglés Básico',
    duracion: '20 horas',
    valor: '120000 pesos'
}];

const argv = require('yargs')
const fs = require('fs');

argv
    .command('$0', 'the default command', () => {}, (argv) => {
        for (let i = 0; i < cursos.length; i++) {
            setTimeout(() => {
            console.log('El Id del curso es ' + cursos[i].id + ' el curso se llama ' + cursos[i].nombre + ' tiene una duración de ' + cursos[i].duracion + ' y un valor de ' + cursos[i].valor);
            }, i * 2000);
        }
    }) 
    .command('inscribir', 'Inscripción de Cursos', (yargs) => {
        
        return yargs.option('id', {
                        alias: 'i',
                        demand: true
                    })
                    .option('nombre', {
                        alias: 'n',
                        demand: true
                    })
                    .option('cedula', {
                        alias: 'c',
                        demand: true
                    })
        },
        ({id, nombre, cedula}) => {

            let crearArchivo = (argv,encontrarCursos) =>{
                texto = 'El Estudiante ' + nombre + '\n' +
                        'con número de cédula ' + cedula + '\n' + 
                        'se ha matriculado en el curso llamado ' + encontrarCursos.nombre + '\n' +
                        'que tiene una duración de ' + encontrarCursos.duracion +'\n' +
                        'y un valor de ' + encontrarCursos.valor
                fs.writeFile('Inscripcion.txt', texto, (err) => {
                    if (err) throw (err);
                    console.log('Se ha creado el archivo')
                });
                
            }
            if (id < 1 || id > 3) {
                let mensajeError = (callback) => {cursos.forEach(function(curso){
                    setTimeout(function(){        
                        let resultado = ('El Id del curso es ' + curso.id + ' el curso se llama ' + curso.nombre + ' tiene una duración de ' + curso.duracion + ' y un valor de ' + curso.valor);
                        callback(resultado); 
                    },0000);
                })
                }
                console.log('Ha ingresado un id que no corresponde a ningun curso')
                mensajeError(function(resultado){
                    console.log(resultado)
                })    
            }else{
                let encontrarCursos = cursos.find( buscarCurso => buscarCurso.id == id);
                console.log(encontrarCursos);
                crearArchivo (argv,encontrarCursos);
            } 
        }
)


.argv;            

