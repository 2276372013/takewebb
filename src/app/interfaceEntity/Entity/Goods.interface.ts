export class Goods {
     goodsId: String;//'物品Id'
     userId: String;//'属于'
     goodsName: String;//'物品名称'
     goodsPlace: String;//'放置位置'
     goodsPublic: boolean;//'公开权限'
     goodsCode: String;//'物品分享代码'
     saveTimes: Date;//'存放多久'
     placeTime: Date;//'放置时间'
     takeTime: Date;//'拿走时间'
     goodsType: String;//'标签种类'
     frequency: String;//'操作频率'
     goodsPhoto: String;//'物品照片
     goodsDescribe: String;//'物品描述'
     goodsNum:number;
}
export class GoodsType {
     typeid: String;//标签id'
     typeName: String;//标签名称'
     userId: String;//用户Id'
}
export class GoodsPlace {
     placeId: String;//位置Id'
     placeName: String;//位置名称'
     userId: String;//用户名'
     placePhoto: String;//地点照片'
}