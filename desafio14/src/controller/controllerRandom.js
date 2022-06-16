const numberRandom = function (num) {
    let numbers = new Object();
    let {
        cantidad
    } = num;

    if (!cantidad) {
        cantidad = 100000000
    } else {
        cantidad = parseInt(cantidad)
    }

    for (let i = 0; i < cantidad; i++) {
        let random = Math.floor(Math.random() * 1000) + 1

        if (isNaN(numbers[random])) {
            numbers[random] = 1
        } else {
            numbers[random]++
        }
    }
    return numbers
}

process.on('message', req => {
    process.send(numberRandom(req))
    process.exit()
})
process.send('start')