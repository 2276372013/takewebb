import { Component, OnInit } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import * as OSS from 'ali-oss'
import { NzUploadModule } from 'ng-zorro-antd/upload';
function getBase64(file: File): Promise<string | ArrayBuffer | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  ngOnInit(): void {
  }
  fileVal: File;

  ok() {


  }

  fileEvent(fileInput: any) {
    let client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId: 'LTAI4GDqNLNrM9iBJXFngX7h',
      accessKeySecret: 'HNGUCQGMUUjDLa0tr0lYxAZVW2O1dg',
      bucket: 'haoliang-bucket',
    });
    var base64Data;
    const reader2 = new FileReader()
    reader2.readAsDataURL(fileInput.target.files[0]);
    reader2.onload = function () {
      base64Data = reader2.result;
      console.log(reader2.result); //获取到base64格式图片

      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
      else {
        byteString = unescape(base64Data.split(',')[1]);
      }
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

      // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
      // var ia = new Uint8Array(arrayBuffer);//创建视图
      var ia = new Uint8Array(byteString.length);//创建视图
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ia], {
        type: mimeString
      });

      client.put('object.png', blob).then(function (r1) {
        console.log('put success: %j', r1);
        return client.get('object.png');
      }).then(function (r2) {
        console.log('get success: %j', r2);
      }).catch(function (err) {
        console.error('error: %j', err);
      });
    };

  }

}
