// import { Filelike, getFilesFromPath, Web3Storage } from 'web3.storage'

export class Web3Store {
    constructor() {
    }

    private getAccessToken() {
        return process.env.WEB3STORAGE_TOKEN
    }

}
