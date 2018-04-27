import { Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef } from '@angular/core';

export class File {
  name = '';
  size = 0;
  contents: any = '';
}

export enum FileTypes { TEXT = 'text', URL = 'url', BINARY = 'binary', ARRAY = 'array' }
@Component({
  selector: 'app-file-io',
  templateUrl: './file-io.component.html',
  styleUrls: ['./file-io.component.css']
})
export class FileIoComponent implements OnInit {

  @Output() file: EventEmitter<File> = new EventEmitter<File>();
  @Input() type: FileTypes = FileTypes.TEXT;
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('fileOutput') fileOutput: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onFileLoad(evt) {
    const self = this;
    if (evt.target && evt.target.files && evt.target.files.length > 0) {
      const f = evt.target.files[0];
      const reader = new FileReader();
      reader.onload = (function (file) {
        return function (e) {
          self.file.emit({ name: f.name, size: f.size, contents: e.target.result });
        };
      })(f);
      switch (self.type) {
        case FileTypes.TEXT:
          reader.readAsText(f);
          break;
        case FileTypes.ARRAY:
          reader.readAsArrayBuffer(f);
          break;
        case FileTypes.BINARY:
          reader.readAsBinaryString(f);
          break;
        case FileTypes.URL:
          reader.readAsDataURL(f);
          break;
      }
    }
  }
  public upload() {
    this.fileInput.nativeElement.click();
  }
  public download(blob: Blob, fileName: string) {
    this.fileOutput.nativeElement.href = window.URL.createObjectURL(blob);
    this.fileOutput.nativeElement.download = fileName;
    this.fileOutput.nativeElement.click();
  }
}
