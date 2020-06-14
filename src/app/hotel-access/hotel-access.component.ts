import { Component, OnInit } from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ToastrService} from "ngx-toastr";
import {AppSetting} from "../appsetting";

@Component({
  selector: 'app-hotel-access',
  templateUrl: './hotel-access.component.html',
  styleUrls: ['./hotel-access.component.scss']
})
export class HotelAccessComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: AppSetting.BASE_SERVER_URL+'/api/upload',
    itemAlias: 'image'
  });
  public imageUrl;
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      console.log('Uploaded File Details:', this.uploader);
    };
    this.uploader.onCompleteItem = (data) => {
      console.log('Uploaded File Details:', data._xhr.response);
      this.imageUrl+=  data._xhr.response;
      console.log(this.imageUrl)
      this.toastr.success('File successfully uploaded!');
    };
  }

}
