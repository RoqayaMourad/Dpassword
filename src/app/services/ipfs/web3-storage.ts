import { Security } from './../../models/security.class';
import { Filelike, getFilesFromPath, Web3Storage } from 'web3.storage'
import { Base64 } from 'js-base64';
import * as stream from 'stream';

export class Web3Store {
  constructor() {
  }

  private webstorage() {
    return process.env.WEB3STORAGE_TOKEN
  }

  private makeStorageClient() {
    return new Web3Storage({ token: this.webstorage() });
  }

  async getStatus(cid) {
    const client = this.makeStorageClient();
    const status = await client.status(cid);
    return status;
  }
  async retrieve(cid) {
    const client = this.makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`)
    }

    return res;
  }

  async retrieveFiles(cid) {
    const client = this.makeStorageClient()
    const res = await client.get(cid)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
    }

    const files = await res.files();
    return files;
  }

  /** File objects from a json opject */
  makeFileObject(obj, fileName) {
    const buffer = Buffer.from(JSON.stringify(obj));
    return new File([buffer], fileName)
  }

  async getFiles(path) {
    const files = await getFilesFromPath(path)
    console.log(`read ${files.length} file(s) from ${path}`)
    return files
  }

  async storeFiles(files: Filelike) {
    const client = this.makeStorageClient()
    const cid = await client.put([files], {
      maxRetries: 10,
      wrapWithDirectory: false
    })
    console.log('stored files with cid:', cid)
    return cid;
  }

  // db interfaces
  async getDb(db_cid: string, private_key: string) {

    const web3 = new Web3Store();
    const files = await web3.retrieveFiles(db_cid);
    const file = files[0];

    if (!file) throw new Error("Db file was not found");

    // the following conversion supports arabic characters, emojis and Chinese and asian character
    // File ==> ArrayBuffer ==> Base64 ==> String ==> Object

    // Conver file to ArrayBuffer
    let buffer = await file.arrayBuffer() as any;

    // Convert ArrayBuffer to Base64
    var blob_file = new Blob([buffer], { type: 'text/plain' });
    var serverEncryptedDb = await blob_file.text();

    // Decrypt the database to user decryption level
    const base64_str = Security.decryptString(serverEncryptedDb, private_key)

    // Conver Base64 to String
    let enctyptedStringfiedDBObject = Base64.decode(base64_str)

    // Converty String to Object
    let enctyptedDBObject = JSON.parse(enctyptedStringfiedDBObject);

    return enctyptedDBObject;


  }

  async storeDb(encrypteddb, private_key) {

    const serverEncryptedDb = Security.encryptString(encrypteddb, private_key)
    // convert encrypteddb string to file object
    const buffer = Buffer.from(serverEncryptedDb);
    const theStream = () => stream.Readable.from(buffer);

    let node_file: any = {
      name: "encrypteddb",
      stream: theStream
    }
    const web3 = new Web3Store();

    // upload to IPFS
    const cidString = await web3.storeFiles(node_file);
    return cidString
  }
}
