import { IIPNSObj } from './../../../interfaces/IPFS.interface';
import { HelperService } from 'src/app/services/util/helper';
import { ModalController } from '@ionic/angular';
import { DataService } from 'src/app/services/data/data.service';
import { LoginService } from './../../../services/auth/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Web3Store } from 'src/app/services/ipfs/web3-storage';
import { GeneratedOwnershipTokenComponent } from '../../_shared/generated-ownership-token/generated-ownership-token.component';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss'],
})
export class LoginRegisterComponent implements OnInit {

  login_form: FormGroup
  register_form: FormGroup
  shown_form: "login" | "register" = "login";
  constructor(fb: FormBuilder, private loginSrv: LoginService, private data: DataService, private modalController: ModalController, private web3: Web3Store) {
    this.register_form = fb.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required],
    });
    this.login_form = fb.group({
      password: ['', Validators.required],
      privatekey: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.data.getUserFromStorage().then(u => {
      console.log("======= User is fetched ========");
      console.log(u);
      if (u?.email) {
        this.login_form.get("email").setValue(u.email);
      }
    })

    this.modalController.create({
      component: GeneratedOwnershipTokenComponent,
      cssClass: "loginRegisterModal",
      componentProps: {
        ownershipToken:`eyJmaWxlbmFtZSI6Ims1MXF6aTV1cXU1ZGo4amk3bTc1bWZ5enZhNTBkb29uaWZsYWhieWhwYjlyM3loMzljb2g4c3RzMmVzNjhvIiwicHJpdmF0ZWtleSI6IkNBRVNRS3B5SGt6QXBYZ0V2cUFCMDRmVXJ2Q2VlMitTYmJ4OGI5Uk40SnY0ZGRKa2VvcldzbHZnVDNSYzMxUjJiVXh3Zk9iMXNuS0tFS0ZoQjJaYko2MFBKSmc9In0=`
      },
      backdropDismiss: true,
    }).then((m) => {
      m.present()
      m.onDidDismiss().then(() => {
        setTimeout(() => {
          this.data.toast("Welcom To Dassword 🔐, The Password Manager build on decentralized technology", "Registred", 5000);
        }, 1000);
      })
    })
  }

  async login() {
    if (this.login_form.invalid) {
      this.data.alert("Invalid login fields")
      return;
    }
    let ownershipToken = this.login_form.get("privatekey").value;
    this.data.setMasterPassword(this.login_form.get("password").value);
    await this.data.show_loading();

    // get IPNS records
    let IPNSObj = HelperService.decodeFileNameAndPrivateKey(ownershipToken)
    this.data.IPNSObj = IPNSObj
    await this.data.getCID()
    // get DB records
    await this.data.getDbFromIPFS();
    // to update the list
    this.data.filter$.next("");
    await this.dissmiss();
    await this.data.dismiss_loading();
  }


  async generateToken() {
    if (this.register_form.invalid) {
      this.data.alert("Invalid fields")
      return;
    }
    if (this.register_form.value.password_confirm !== this.register_form.value.password) {
      this.data.alert("Confirm pasword field doesn't match password")
      return;
    }
    await this.data.show_loading();
    await this.data.initDb();
    await this.data.uploadDbToIPFS(false)
    let record = await this.web3.createRecord(this.data.CID);
    let IPNSObj: IIPNSObj = {
      filename: record.createRecord.filename,
      privatekey: record.PrivateKey
    }
    this.data.CURRENT_REVISION = record.createRecord.revision;
    this.data.IPNSObj = IPNSObj;

    let ownershipToken = HelperService.encodeFileNameAndPrivateKey(IPNSObj)
    console.log("ownershipToken", ownershipToken);
    await this.dissmiss();

    await this.data.resetStorage();
    this.data.setMasterPassword(this.register_form.value.password);
    await this.data.initDb();
    await this.data.dismiss_loading();
    this.data.IPFSState = "Create Item to Sync"
    this.data.filter$.next("")

    this.modalController.create({
      component: GeneratedOwnershipTokenComponent,
      cssClass: "loginRegisterModal",
      componentProps: {
        ownershipToken
      },
      backdropDismiss: true,
    }).then((m) => {
      m.present()
      m.onDidDismiss().then(() => {
        setTimeout(() => {
          this.data.toast("Welcom To Dassword 🔐, The Password Manager build on decentralized technology", "Registred", 5000);
        }, 1000);
      })
    })
  }

  async dissmiss() {
    await this.modalController.dismiss()
  }

}
