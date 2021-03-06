// var AbandonedCallsImplementation = require('../implementation/AbandonedCallsImplementation');
// var err = AbandonedCallsImplementation.put(service,day,country,from,to,threshold);


exports.put = function (service, day, country, from, to, threshold) {
    return new Promise((resolve, reject) => {

        console.log('\n Entrando a la implementacion de Average Calls Implementation');

        var servicio = service;
        if (service == 'GSS-USA') {
            servicio = 'USA';
        }
        var fecha = day;
        var pais = country;
        var horaInicio = from;
        var horaFinal = to;
        var limite = threshold;

        var mysql = require('mysql'); // Incluimos el modulo de MySQL
        // Conexion a la BD
        var promesaConnect = new Promise((resolve, reject) => {
            var connectionBD = mysql.createConnection({
                host: 'localhost', //35.188.135.65
                user: 'root', //root
                password: '',
                database: 'cdr', //cdr
                port: 3306
            });

            connectionBD.connect(function (error) {
                if (error) {
                    //console.log("\n --> Error al conectar a la base de datos")
                    reject();
                } else {
                    //console.log('\n Conexion correcta a la base de datos');
                    resolve(connectionBD);
                }
            });
        })

        // VALIDACIONES

        // SI no recibe hora inicio, hora final, pais y limite
        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal == null && limite == null) {
            console.log('\nConsulta solo para SERVICIO Y FECHA');

            if (service == 'GSS-USA') {
                country = 'Mexico';
            }

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT ((SUM(SUBSTR(Tiempo, 1,2)))*60*60) as HorasSegundos, SUM(SUBSTR(Tiempo, 4,2)*60) as MinutosSegundos, SUM(SUBSTR(Tiempo, 7,2)) as Segundos, COUNT(*) as CantidadLlamadas FROM tiemposesperallamadas WHERE Entrada LIKE "' + [fecha] + '%"';
                    //console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;

                        var horasSegundos = rows[0].HorasSegundos;
                        console.log('Horas segundos: ' + horasSegundos);
                        var minutosSegundos = rows[0].MinutosSegundos;
                        console.log('Minutos: ' + minutosSegundos);
                        var segundos = rows[0].Segundos;
                        console.log('Segundos: ' + segundos);
                        var cantidadLlamadas = rows[0].CantidadLlamadas;
                        console.log('Cantidad Llamadas: ' + cantidadLlamadas);

                        var promedio = (horasSegundos + minutosSegundos + segundos) / cantidadLlamadas;
                        var promedioString = promedio.toString();
                        var posicion = promedioString.indexOf('.');
                        var porcionPromedio = promedioString.substring(0, posicion);

                        var arreglo = porcionPromedio.split("");
                        var tamanio = arreglo.length;

                        if (tamanio <= 1) {
                            var horaPromedio = '00:00:0' + porcionPromedio;
                        } else {
                            var horaPromedio = '00:00:' + porcionPromedio;
                        }

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            AverageWaitingTimeOfCallsAnswered = horaPromedio;
                            informacion = new datosObtenidos(service, day, country, AverageWaitingTimeOfCallsAnswered, from, to, threshold);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal == null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA Y PAIS");
        }

        if (servicio != null && fecha != null && limite != null && pais == null && horaInicio == null && horaFinal == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA Y LIMITE\n");
        }

        if (servicio != null && fecha != null && limite != null && pais != null && horaInicio == null && horaFinal == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, PAIS Y LIMITE");
        }


        // Si recibe hora inicio y final

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal != null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, PAIS, HORA INICIO Y FINAL \n");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal != null && limite != null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, LIMITE, HORA INICIO Y FINAL \n");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal != null && limite == null) {
            console.log("\nConsulta solo para SERVICIO, FECHA, HORA INICIO Y FINAL \n");
            if (service == 'GSS-USA') {
                country = 'Mexico';
            }

            var promesaQuery = (connectionBDParam) => {
                return new Promise(function (resolve, reject) {
                    var queryString = 'SELECT ((SUM(SUBSTR(Tiempo, 1,2)))*60*60) as HorasSegundos, SUM(SUBSTR(Tiempo, 4,2)*60) as MinutosSegundos, SUM(SUBSTR(Tiempo, 7,2)) as Segundos, COUNT(*) as CantidadLlamadas FROM tiemposesperallamadas WHERE Entrada LIKE "' + [fecha] + '%" AND Entrada BETWEEN "' + [fecha] + " " + [horaInicio] + '" AND "' + [fecha] + " " + [horaFinal] + '"';
                    console.log(queryString);
                    connectionBDParam.query(queryString, [fecha], function (err, rows, fields) {
                        if (err) throw err;

                        var horasSegundos = rows[0].HorasSegundos;
                        console.log('Horas segundos: ' + horasSegundos);
                        var minutosSegundos = rows[0].MinutosSegundos;
                        console.log('Minutos: ' + minutosSegundos);
                        var segundos = rows[0].Segundos;
                        console.log('Segundos: ' + segundos);
                        var cantidadLlamadas = rows[0].CantidadLlamadas;
                        console.log('Cantidad Llamadas: ' + cantidadLlamadas);

                        var promedio = (horasSegundos + minutosSegundos + segundos) / cantidadLlamadas;
                        var promedioString = promedio.toString();
                        var posicion = promedioString.indexOf('.');
                        var porcionPromedio = promedioString.substring(0, posicion);

                        var arreglo = porcionPromedio.split("");
                        var tamanio = arreglo.length;

                        if (tamanio <= 1) {
                            var horaPromedio = '00:00:0' + porcionPromedio;
                        } else {
                            var horaPromedio = '00:00:' + porcionPromedio;
                        }

                        item = [];
                        for (var i in rows) {
                            //id = rows[i].id;
                            service = service;
                            day = fecha;
                            country = country;
                            AverageWaitingTimeOfCallsAnswered = horaPromedio;
                            from = null;
                            to = null;
                            threshold = limite;
                            informacion = new datosObtenidos(service, day, country, AverageWaitingTimeOfCallsAnswered);
                            item.push(informacion);
                        }
                        if (item != []) {
                            resolve(item)
                        } else {
                            reject()
                        }
                    })
                })
            }
        }

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal != null && limite != null) {
            console.log("\n Consulta todos los parametros");
        }


        // Si recibe solo la hora inicial 

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal == null && limite == null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene pais)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal == null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene limite)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio != null && horaFinal == null && limite == null) {
            console.log("--> ERROR: Es necesario una hora final (falta pais y limite)");
        }

        if (servicio != null && fecha != null && pais != null && horaInicio != null && horaFinal == null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora final (viene pais y limite)");
        }


        // Si recibe solo la hora final

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal != null && limite == null) {
            console.log("\n --> ERROR: Es necesario una hora final inicial (viene pais)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal != null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora inicial (viene limite)");
        }

        if (servicio != null && fecha != null && pais == null && horaInicio == null && horaFinal != null && limite == null) {
            console.log("--> ERROR: Es necesario una hora inicial (falta pais y limite)");
        }

        if (servicio != null && fecha != null && pais != null && horaInicio == null && horaFinal != null && limite != null) {
            console.log("\n --> ERROR: Es necesario una hora inicial (viene pais y limite)");
        }

        function datosObtenidos(service, day, country, AverageWaitingTimeOfCallsAnswered) {
            this.service = service;
            this.day = day;
            this.country = country;
            this.AverageWaitingTimeOfCallsAnswered = AverageWaitingTimeOfCallsAnswered;
        }

        promesaConnect.then((res) => {
                return promesaQuery(res);
            }).catch(err => {
                reject('\n --> DATOS INCORRECTOS');
            })
            .then((result) => {
                resolve(JSON.stringify(result));
            })
            .catch(error => {
                reject('\n --> UNA DE LAS PROMESAS FALLO');
            });
    });
    connectionBD.end();
}