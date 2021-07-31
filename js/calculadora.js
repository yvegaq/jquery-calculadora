
$(document).ready(() => {
    var ultimaAccion = undefined;
    var resultado = {
        j: ($("#lblResultado")),
        getValor: () => {
            return resultado.j.text();
        },
        setValor: (valor) => {
            resultado.j.text(valor);
        },
        limpiar: () => {
            resultado.j.text("0");
        },
    }
    var calculo = {
        j: ($("#txtCalculo")),
        getValor: () => {
            return calculo.j.val();
        },
        setValor: (valor) => {
            calculo.j.val(valor);
        },
        limpiar: () => {
            calculo.j.val("");
        },
        concatenarAlFinal: (valor) => {
            calculo.setValor(calculo.getValor() + valor);
        },
    };
    var keysPermitidos = [
        /* numeros */
        { grupo: "numero", caracter: "0", codigo: 48 },
        { grupo: "numero", caracter: "1", codigo: 49 },
        { grupo: "numero", caracter: "2", codigo: 50 },
        { grupo: "numero", caracter: "3", codigo: 51 },
        { grupo: "numero", caracter: "4", codigo: 52 },
        { grupo: "numero", caracter: "5", codigo: 53 },
        { grupo: "numero", caracter: "6", codigo: 54 },
        { grupo: "numero", caracter: "7", codigo: 55 },
        { grupo: "numero", caracter: "8", codigo: 56 },
        { grupo: "numero", caracter: "9", codigo: 57 },
        { grupo: "numero", caracter: "numpad 0", codigo: 96 },
        { grupo: "numero", caracter: "numpad 1", codigo: 97 },
        { grupo: "numero", caracter: "numpad 2", codigo: 98 },
        { grupo: "numero", caracter: "numpad 3", codigo: 99 },
        { grupo: "numero", caracter: "numpad 4", codigo: 100 },
        { grupo: "numero", caracter: "numpad 5", codigo: 101 },
        { grupo: "numero", caracter: "numpad 6", codigo: 102 },
        { grupo: "numero", caracter: "numpad 7", codigo: 103 },
        { grupo: "numero", caracter: "numpad 8", codigo: 104 },
        { grupo: "numero", caracter: "numpad 9", codigo: 105 },

        /* acciones */

        { grupo: "accion", caracter: "multiplicacion", codigo: 106 },
        { grupo: "accion", caracter: "division", codigo: 111 },
        { grupo: "accion", caracter: "suma", codigo: 107 },
        { grupo: "accion", caracter: "resta", codigo: 109 },
    ];

    keysPermitidos = keysPermitidos.map(m => { m.caracter = m.caracter.toLowerCase(); return m; });

    $("body").on("keydown", (event) => {
        if (keysPermitidos.filter(m => m.grupo === "numero").map(m => m.codigo).indexOf(event.which) > -1) {
            calculo.concatenarAlFinal(event.key);
        }
        else if (keysPermitidos.filter(m => m.grupo === "accion").map(m => m.codigo).indexOf(event.which) > -1) {
            var valorAnterior = parseFloat(resultado.getValor());
            var valorIngresado = parseFloat(calculo.getValor());
            var total = 0;
            var key = keysPermitidos.find(m => m.codigo === event.which);

            if (isNaN(valorIngresado)) {
                ultimaAccion = key.caracter;
                return;
            }

            if (ultimaAccion === undefined) {
                ultimaAccion = key.caracter;
            }
            if (ultimaAccion === "suma") {
                total = valorAnterior + valorIngresado;
            }
            else if (ultimaAccion === "resta") {
                total = valorAnterior - valorIngresado;
            }
            else if (ultimaAccion === "multiplicacion") {
                total = valorAnterior * valorIngresado;
            }
            else if (ultimaAccion === "division") {
                total = valorAnterior / valorIngresado;
            }

            ultimaAccion = key.caracter;
            console.log(key.caracter, valorAnterior, valorIngresado, total);
            resultado.setValor(total);
            calculo.limpiar();
        }
    })
});