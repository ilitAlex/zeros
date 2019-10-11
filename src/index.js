module.exports = function zeros(expression) {

////////////создаем фукнции, которые высчитывают '!' и '!!' для больших чисел

    function factorial(num) {
        return num ? num * factorial(num - BigInt(1)) : BigInt(1);
    }

    function double_factorial(num) {
        return num > 0 ? num * double_factorial(num - BigInt(2)) : BigInt(1);
    }


////////////////////////////////////////////////////////////////////////////

    let array = expression.split('*');   //превратили строку в массив, где разделить для элементов '*'
    let array_with_factorial = [];       //создали массивы для хранения посчитанных факториалов
    let array_with_double_factorial = [];

    ///////////////////////// закидываем в массивы '!' и '!!' элементы с соответствующими     факториалами и отрезаем факториалы

    for (let i = 0; i < array.length; i++) {
        if (array[i].slice(-2) === '!!') {
            array_with_double_factorial.push(BigInt(array[i].slice(0, (array[i].length - 2))));
        } else if (array[i].slice(-1) === '!') {
            array_with_factorial.push(BigInt(array[i].slice(0, (array[i].length - 1))));
        }
    }


    ////////////////создаем переменные, где будут хранится результаты возведения в степень

    let init_value = BigInt(1);
    let result_factorial = BigInt(1);
    let result_double_factorial = BigInt(1);

    /////////////////////////////// перебирающий метод перемножает все элементы массива

    if (array_with_factorial.length != 0) {
        result_factorial = array_with_factorial.reduce(
            (accumulator, value) => {
                return accumulator * factorial(value);
            }, init_value
        );
    }

    if (array_with_double_factorial.length != 0) {
        result_double_factorial = array_with_double_factorial.reduce(
            (accumulator, value) => {
                return accumulator * double_factorial(value);
            }, init_value
        );
    }

/////////////////////////// перемножаем обе фактиральные функции

    let multiply = result_factorial * result_double_factorial;

//////////////// счетчик нулей через регулярное выражение

    let counter = /0+$/
    let result = counter.exec(multiply + '');

    //////////////////////////проверяем есть ли нули в конце и считаем

    if (result === null) {
        result = 0;
    } else {
        result = counter.exec(multiply + '')[0].length;
    }

    return result;
}




