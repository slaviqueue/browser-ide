import { exec, removeLastLine, log, generageContainerName, id } from '../utils'

export default (language, dockerCmd) => {
    const container = generageContainerName(language)
    const command = `timeout --signal=SIGTERM 2 \
                     docker run --name ${ container } ${ language }:executors /bin/bash -c "${ dockerCmd }" sleep 300 \
                     && docker rm ${ container }`

    return exec(command)
        .then(log)
        .catch(err =>
            exec(`docker rm ${ container }`).then(() => log(err)))
        .then(({ err, stderr, stdout }) => (err && err.err) || stderr || stdout)
        .then(removeLastLine)
}
