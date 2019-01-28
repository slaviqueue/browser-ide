import { exec as execCb } from 'child_process'
import { removeLastLine, log, generageContainerName, id } from '../utils'

const exec = command =>
  new Promise((resolve, reject) =>
    execCb(
      command, 
      (err, stdout, stderr) => err ? reject({ err, stdout, stderr }) : resolve({ err, stdout, stderr })
    )
  )

// todo
// set resourses and execution time limit per container

export default (language, dockerCmd) => {
  const container = generageContainerName(language)
  const command = `timeout --kill-after 1s 2s\
                   docker run --name ${ container } ${ language }:executors /bin/bash -c "${ dockerCmd }";\
                   docker rm -f ${ container};`

  return exec(command)
    .then(log)
    .catch(err =>
      exec(`docker rm ${ container }`).then(() => log(err)))
    .then(({ err, stderr, stdout }) => (err && err.err) || stderr || removeLastLine(stdout))
}
