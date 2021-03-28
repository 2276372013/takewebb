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
  fileVal:File;

   ok(){

  
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
    reader2.onload = function(){
    base64Data = reader2.result;
    console.log(reader2.result); //获取到base64格式图片

    var byteString;
    if(base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);//base64 解码
    else{
        byteString = unescape(base64Data.split(',')[1]);
    }
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];//mime类型 -- image/png

    // var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
    // var ia = new Uint8Array(arrayBuffer);//创建视图
    var ia = new Uint8Array(byteString.length);//创建视图
    for(var i = 0; i < byteString.length; i++) {
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

  // async function put () {
  //   try {
  //     // 'object'填写上传至OSS的object名称,即不包括Bucket名称在内的Object的完整路径。
  //     // 'localfile'填写上传至OSS的本地文件完整路径。
  //     let r1 = await client.put('object','localfile'); 
  //     console.log('put success: %j', r1);
  //     let r2 = await client.get('object');
  //     console.log('get success: %j', r2);
  //   } catch(e) {
  //     console.error('error: %j', e);
  //   }
  // }
  // put();

  // fileList: NzUploadFile[] = [
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-2',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-3',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-4',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-xxx',
  //     percent: 50,
  //     name: 'image.png',
  //     status: 'uploading',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  //   },
  //   {
  //     uid: '-5',
  //     name: 'image.png',
  //     status: 'error'
  //   }
  // ];
  // previewImage: string | undefined = '';
  // previewVisible = false;

  // handlePreview = async (file: NzUploadFile) => {
  //   console.log("2");
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj!);
  //     console.log("file.preview");
  //     console.log(file.preview);

  //     console.log(this.dataURLtoBlob(file.preview));
  //     let OSS = require('ali-oss');
  //     this.client = new OSS({
  //       //服务器地区
  //       region: 'oss-cn-beijing',
  //       //Accesstoken中的keyid
  //    accessKeyId: 'LTAI4GDqNLNrM9iBJXFngX7h',
  //     //Accesstoken中的KeySecret
  //     accessKeySecret: 'HNGUCQGMUUjDLa0tr0IYxAZVW2o1dg',
  //       //bucket实例名称
  //       bucket: 'haoliang-bucket',
  //     });
  //     this.client.put('UIPage', this.dataURLtoBlob(file.preview));

  //   }
  //   console.log("file.url");    console.log(file.url);
  //   this.previewImage = file.url || file.preview;
  //   console.log("this.previewImage");    console.log(this.previewImage);
  //   this.previewVisible = true;
  //   console.log("this.previewVisible");    console.log(this.previewVisible);
  // };

  
  // dataURLtoBlob(dataurl) {
  //   var arr = dataurl.split(',');
  //    //注意base64的最后面中括号和引号是不转译的   
  //    var _arr = arr[1].substring(0,arr[1].length-2);
  //    var mime = arr[0].match(/:(.*?);/)[1],
  //      bstr =atob(_arr),
  //      n = bstr.length,
  //      u8arr = new Uint8Array(n);
  //    while (n--) {
  //      u8arr[n] = bstr.charCodeAt(n);
  //    }
  //    return new Blob([u8arr], {
  //      type: mime
  //    });
  //  }

}
