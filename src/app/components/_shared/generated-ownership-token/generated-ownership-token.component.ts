import { HelperService } from 'src/app/services/util/helper';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-generated-ownership-token',
  templateUrl: './generated-ownership-token.component.html',
  styleUrls: ['./generated-ownership-token.component.scss'],
})
export class GeneratedOwnershipTokenComponent implements OnInit {

  @Input() ownershipToken:string;
  copied = ""
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  copy(){
    HelperService.copyToClipboard(this.ownershipToken);
    this.copied = "copied"
  }

  async dissmiss() {
    await this.modalController.dismiss()
  }
}
