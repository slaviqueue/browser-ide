export const removeLastLine = str =>
	str.split('\n').slice(0, -2).join('\n')

export const log = str => (console.log(str), str)

export const generageContainerName = language => `${ language }-execution-container-${ decollide() }`

const decollide = () =>
	Math.random().toString(36).substring(7)

export const id = something => something

export const highlight = prop => obj => obj[prop] 

export const delayed = (f, delay,  ...args) => setTimeout(() => f(...args), delay)
