import {Component, Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {AppSetting} from '../../../appsetting';
import {ToastrService} from 'ngx-toastr';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {


    @Output() private imageSrcUrl = new EventEmitter();

    // tslint:disable-next-line:no-input-rename
    @Input('multiple') private multiple = true

    public uploader: FileUploader = new FileUploader({
        url: AppSetting.BASE_SERVER_URL + '/api/upload',
        itemAlias: 'image'
    });
    public imageUrl = '';
    listImgPreview: SafeUrl[] = [];

    // previewImg: SafeUrl;

    constructor(private toastr: ToastrService, private sanitizer: DomSanitizer) {
    }

    ngOnInit() {
        this.uploader.onAfterAddingFile = (file) => {
            file.withCredentials = false;
            console.log('Uploaded File Details:', this.uploader);
            // this.previewImg = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file)));
            this.listImgPreview.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(file._file))));
            console.log(this.listImgPreview)
            // console.log(this.previewImg)


        };
        this.uploader.onCompleteItem = (data) => {
            console.log('Uploaded File Details:', data._xhr.response);
            this.imageUrl += data._xhr.response;
            this.imageSrcUrl.emit(this.imageUrl)
            this.toastr.success('File successfully uploaded!');
        };
    }

    removeSelectedFile(i) {
        console.log(this.uploader);
        this.listImgPreview.splice(i, 1)
        this.uploader.queue[i].remove()
    }

}


