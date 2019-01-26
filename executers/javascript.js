import { exec, removeLastLine, log, generageContainerName, id } from '../utils'

export default code => {
    const container = generageContainerName('nodejs')

    return exec(`docker run --name ${ container } nodejs:executors /bin/bash -c "node -e '${ code }'" && docker rm ${ container }`)
        .then(log)
        .catch(id)
        .then(({ err, stderr, stdout }) => err || stderr || stdout)
        .then(removeLastLine)
}
