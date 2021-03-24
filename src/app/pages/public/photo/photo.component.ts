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
  selector: 'app-friendslist',
  templateUrl: './friendslist.component.html',
  styleUrls: ['./friendslist.component.scss']
})
export class PhotoComponent implements OnInit {
  client: any;

  // constructor() {
  //   this.client = new OSS({
  //     //服务器地区
  //     region: 'oss-cn-beijing',
  //     //Accesstoken中的keyid
  //     accessKeyId: 'LTAI4GDqNLNrwanghaoliang1992M9iBJXFngX7h',
  //     //Accesstoken中的KeySecret
  //     accessKeySecret: 'HNGUCQGMUUjwanghaoliang1992DLa0tr0IYxAZVW2o1dg',
  //     //bucket实例名称
  //     bucket: 'haoliang-bucket',
  //   });
  // }


  ngOnInit(): void {
    //base64数据，要转换成blob对象，再转为buffer流。用put上传
    // console.log("client")
    // const formData = new FormData();

    // this.client.put('UIPage', this.dataURLtoBlob(file.preview));
    // console.log(".put")


  }

  fileList: NzUploadFile[] = [
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error'
    }
  ];
  previewImage: string | undefined = '';
  previewVisible = false;

  handlePreview = async (file: NzUploadFile) => {
    console.log("2");
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
      console.log("file.preview");
      console.log(file.preview);

      console.log(this.dataURLtoBlob(file.preview));
      // let OSS = require('ali-oss');
      // this.client = new OSS({
      //   //服务器地区
      //   region: 'oss-cn-beijing',
      //   //Accesstoken中的keyid
 //     accessKeyId: 'LTAI4GDqNLNrwanghaoliang1992M9iBJXFngX7h',
  //     //Accesstoken中的KeySecret
  //     accessKeySecret: 'HNGUCQGMUUjwanghaoliang1992DLa0tr0IYxAZVW2o1dg',
      //   //bucket实例名称
      //   bucket: 'haoliang-bucket',
      // });
      // this.client.put('UIPage', this.dataURLtoBlob(file.preview));

    }
    console.log("file.url");    console.log(file.url);
    this.previewImage = file.url || file.preview;
    console.log("this.previewImage");    console.log(this.previewImage);
    this.previewVisible = true;
    console.log("this.previewVisible");    console.log(this.previewVisible);
  };

  
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',');
     //注意base64的最后面中括号和引号是不转译的   
     var _arr = arr[1].substring(0,arr[1].length-2);
     var mime = arr[0].match(/:(.*?);/)[1],
       bstr =atob(_arr),
       n = bstr.length,
       u8arr = new Uint8Array(n);
     while (n--) {
       u8arr[n] = bstr.charCodeAt(n);
     }
     return new Blob([u8arr], {
       type: mime
     });
   }

  // // 获取文件
  // fileEvent(fileInput: any) {
  //   const file = fileInput.target.files[0];  //  获取文件资源
  //   const reader = new FileReader();
  //   if (file) reader.readAsDataURL(file);    // 读取文件
  //   this.uploadFile(file);                  // 调用上传方法
  //   fileInput.target.value = ''             // 重置以便下次可上传同个文件（以通过change检测）
  // }


  // uploadFile(file) {
  //   this.client.put('UIPage', file.fileVal).catch((err) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //   }).then((result) => {
  //     console.log(result);
  //   })
  // }

//   customReq = (item: NzUploadModule) => {
//     const formData = new FormData();
 
//       formData.append('key','UIPage.jpg');
//       formData.append('bucket', 'haoliang-bucket');
//       // formData.append('x-oss-meta-tag', 'dummy_etag_' + file.name);
//       formData.append('OSSAccessKeyId', 'LTAI4GDqNLNrM9iBJXFngX7h');
//       formData.append('policy', serve.policy);
//       formData.append('Signature', serve.Signature);
//       // formData.append('callback', this.serve.callback);
//       formData.append('success_action_status', '200');
//       // tslint:disable-next-line:no-any
//       formData.append('file', item.file as any);
//  //设置cors跨域请求
//       const headerstemp = new HttpHeaders({  'Access-Control-Allow-Origin': '*' });
 
//       console.log('------', formData.get('file'));
 
//       item.action = serve.host;
//   }

}
