const d = new Date()
const dataNow = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`

console.log(`Dia atual: ${d.getDate()} | Horas: ${d.getHours()}`)
d.setDate(d.getDate() + 1);
console.log(`Dia atual: ${d.getDate()} | Horas: ${d.getHours()}`)