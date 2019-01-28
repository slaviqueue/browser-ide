import { exec as execCb } from 'child_process'
import { writeFile as writeFileCb, unlink as unlinkCb } from 'fs'
import { removeLastLine, log, generageContainerName } from '../utils'

const exec = command =>
  new Promise((resolve, reject) =>
    execCb(
      command, 
      (err, stdout, stderr) => err ? reject({ err, stdout, stderr }) : resolve({ err, stdout, stderr })
    ))

const writeFile = (path, data) =>
  new Promise((resolve, reject) =>
    writeFileCb(
      path,
      data,
      err => err ? reject(err) : resolve()
    ))

const unlink = path =>
  new Promise((resolve, reject) =>
    unlinkCb(path, err => err ? reject() : resolve()))

// todo
// set resourses and execution time limit per container

export default (language, dockerCmd) => code => {
  const container = generageContainerName(language)
  const command = `timeout --kill-after 1s 2s\
                   docker run \
                    -v $(pwd)/pool/${ container }:/usr/share/index \
                    --name ${ container } ${ language }:executors \
                    /bin/bash -c "${ dockerCmd }";
                   docker rm -f ${ container }`

  return writeFile(`./pool/${ container }`, code)
    .then(() => exec(command))
    .then(log)
    .catch(err =>
      exec(`docker rm ${ container }`).then(() => log(err)))
    .then(res => (unlink(`./pool/${ container }`), res))
    .then(({ err, stderr, stdout }) => (err && err.err) || stderr || removeLastLine(stdout))
}
