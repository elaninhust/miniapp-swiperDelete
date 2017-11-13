// pages/shopCar/shopCar.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopCarData:[],
    scrollY:true
  },
  startX:0,
  startY:0,
  swiperDirection:0,//0:未激活,1:已激活水平滑动,2:已激活垂直滑动
  maxLeft:50,
  currentLeft:0,
  movedX:0,
  preIndex:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    var shopCarData=[];
    for(let i=0;i<20;i++){
      shopCarData.push({
        content:'ELAN_'
      })
    }
    _this.setData({
      shopCarData: shopCarData,
      height: util.getHeight()
    });
  },

  touchS:function(ev){
    let _this = this;
    let index = ev.currentTarget.dataset.index;
    _this.startX = ev.touches[0].clientX;
    _this.startY = ev.touches[0].clientY;
    if(index == _this.preIndex){
      return;
    }else{
      _this.currentLeft = 0;
      _this.movedX = 0;
      let animation = wx.createAnimation({
        duration:200
      })
      let obj={};
      let key = "shopCarData[" + _this.preIndex +"].animation";
      obj[key] = animation.translateX(0).step().export();
      _this.setData(obj);
    }
  },
  touchM:function(ev){
    let _this = this;
    let index = ev.currentTarget.dataset.index;
    
    if(ev.touches.length == 1){
      let disX = ev.touches[0].clientX - _this.startX;
      let disY = ev.touches[0].clientY - _this.startY;
      if ( _this.swiperDirection == 2) {
        // 已激活垂直滚动
        return;
      }
      if (_this.swiperDirection == 0){
        if(Math.abs(disY) > 10){
          _this.swiperDirection = 2;
          return;
        }else if(Math.abs(disX) > 5){
          _this.swiperDirection = 1;
          _this.setData({
            scrollY:false
          });
        }
      }
      if (_this.swiperDirection == 1){
        let animation = wx.createAnimation({
          duration: 0,
          timingFunction:"ease"
        });
        let obj = {};
        let key = "shopCarData[" + index + "].animation";
        obj[key] = animation.translateX(disX + _this.currentLeft).step().export();
        _this.setData(obj);
        _this.movedX = disX;
      }
    }
  },
  touchE:function(ev){
    let _this = this;
    let currentLeft = 0;
    let index = ev.currentTarget.dataset.index;
    let swiperDirection = _this.swiperDirection;
    _this.swiperDirection = 0; 
    if (swiperDirection == 2){
      return;
    }   
    if (swiperDirection == 0){
      return;
    }  
    if (ev.changedTouches.length == 1){
      let disX = _this.movedX;
      if(disX < 0){
        // 左滑
        if(Math.abs(disX) >= _this.maxLeft/2){
          currentLeft = 0 - _this.maxLeft;
        }else{
          currentLeft = 0;
        }
      }else{
        // 右滑
        if(Math.abs(disX) >= _this.maxLeft/2){
          currentLeft = 0;
        }else{
          currentLeft = 0 - _this.maxLeft;
        }
      }
      _this.currentLeft = currentLeft;
      _this.preIndex = index;
      let animation = wx.createAnimation({
        duration:400,
        timingFunction: "ease"
      })
      let obj={};
      let key = "shopCarData[" + index + "].animation";
      obj[key] = animation.translateX(currentLeft).step().export();
      obj.scrollY = true;
      _this.setData(obj);
    }
  },

  fnDelete:function(ev){
    let _this = this;
    let index = ev.currentTarget.dataset.index;
    let animation = wx.createAnimation({
      duration:200,
      timingFunction:"ease"
    });
    let obj={};
    let key="shopCarData["+  index +"].deleteAnimation";
    obj[key]= animation.height(0).step().export();
    _this.setData(obj);

    setTimeout(function(){
      _this.data.shopCarData.splice(index,1);
      _this.setData({
        shopCarData: _this.data.shopCarData
      })
    },200);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})