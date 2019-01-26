import { exec, removeLastLine, log, generageContainerName, id } from '../utils'

export default (language, dockerCmd) => {
    const container = generageContainerName(language)

    return exec(`docker run --name ${ container } ${ language }:executors /bin/bash -c "${ dockerCmd }" && docker rm ${ container }`)
        .then(log)
        .catch(id)
        .then(({ err, stderr, stdout }) => err || stderr || stdout)
        .then(removeLastLine)
}
