export type IIPFSState = "Uploading" | "Downloading" | "Unsaved Changes" | "Create Item to Sync" | "Synced"

export interface IIPNSObj{
  /** used to get the CID from IPNS Records */
  filename:string
  /** user to update the CID in IPNS Records */
  privatekey:string
}
