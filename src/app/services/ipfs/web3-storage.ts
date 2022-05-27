import { HelperService } from 'src/app/services/util/helper';
import { Security } from './../../models/security.class';
import { Filelike, getFilesFromPath, Web3Storage } from 'web3.storage'
import * as Name from 'web3.storage/name'
import { Revision } from 'web3.storage/name';
import { Injectable } from '@angular/core';
import { IEnctyptedDBObject } from 'src/app/interfaces/interfaces';

@Injectable()
export class Web3Store {
  constructor() {
  }

  private webstorage() {
    return ""
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

  private async _createName(value) {
    const client = this.makeStorageClient()
    const name = await Name.create()
    const revision = await Name.v0(name, value)
    await Name.publish(client, revision, name.key)
    return { filename: name.toString(), name, revision };
  }


  private async _updateName(nextValue, revision, name) {
    const client = this.makeStorageClient()
    const nextRevision = await Name.increment(revision, nextValue)
    return await Name.publish(client, nextRevision, name.key)
  }

  async getRecord(recordName:string) {
    const client = this.makeStorageClient()
    const name = Name.parse(recordName)
    const revision = await Name.resolve(client, name)
    return { name, revision };
  }

  async createRecord(newValue:string) {
    let createRecord = await this._createName(newValue)
    console.log("==== createName()");
    let bytes = createRecord.name.key.bytes
    let PrivateKey = HelperService.ToBase64(bytes)
    return {createRecord, PrivateKey}
  }

  async updateRecord(privatekeybase64:string,revision: Revision, newValue:string) {
    let u8 = HelperService.FromBase64(privatekeybase64) as any
    const name = await Name.from(u8)
    return await this._updateName(newValue, revision, name)
  }
}
