import { exec as execCb } from 'child_process'

export const exec = command =>
	new Promise((resolve, reject) =>
		execCb(
			command, 
			(err, stdout, stderr) => err ? reject({ err, stdout, stderr }) : resolve({ err, stdout, stderr })
		)
	)

export const removeLastLine = str =>
	str.split('\n').slice(0, -2).join('\n')

export const log = str => (console.log(str), str)

export const generageContainerName = language => `${ language }-execution-container-${ decollide() }`

const decollide = () =>
	Math.random().toString(36).substring(7)

export const id = something => something
