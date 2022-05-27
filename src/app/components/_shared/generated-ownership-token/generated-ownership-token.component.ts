import { HelperService } from 'src/app/services/util/helper';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generated-ownership-token',
  templateUrl: './generated-ownership-token.component.html',
  styleUrls: ['./generated-ownership-token.component.scss'],
})
export class GeneratedOwnershipTokenComponent implements OnInit {

  @Input() ownershipToken:string;
  copied = ""
  constructor() { }

  ngOnInit() {}

  copy(){
    HelperService.copyToClipboard(this.ownershipToken);
    this.copied = "copied"
  }
}
