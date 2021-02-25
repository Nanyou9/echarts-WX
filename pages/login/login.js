// pages/login/login.js
// import Toast from '/dist/toast/index';
// import Toast from '@vant/weapp/dist/toast/toast';
import Toast from "../../dist/toast/toast"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    username:'',
    password:''
  },
  onChange(event) {
    // event.detail 为当前输入的值
    this.setData({
      'username':event.detail
    })
  },
  onChange1(event) {
    // event.detail 为当前输入的值
    this.setData({
      'password':event.detail
    })
  },
  longin:function(e){
    Toast.loading({
      message: '登录中...',
      forbidClick: true,
    });
    

    if(this.data.password==''||this.data.username==''){
      Toast.clear
      Toast('账号或密码为空');
      
    }
      let that=this
     
            wx.setStorage({
              key: 'key',
              data: [that.data.username,that.data.password],
              success(res) {
               }
            })
            Toast.clear
            wx.reLaunch({
              url: '/pages/siji/siji'
            })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this
    wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          username:res.data[0],
          password:res.data[1]
        })
      },
    })
    wx.setNavigationBarTitle({
      title: '登录'
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#4367FB',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
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
    wx.hideHomeButton();
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