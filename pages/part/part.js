// pages/part/part.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  partdetailFn(e){
    let i=e.currentTarget.dataset.idx
    wx.navigateTo({
      url: '/pages/part/partdetail/partdetail?id='+i,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '小订单列表'
    })
    let user= wx.getStorageSync('user')
    let that=this
    wx.request({
      url: 'http://118.24.196.69:20017/Api/SJApi/SmallOrderList',
      method:'POST',
      data:{
        OrderSN:options.id,
        usercode:user
      },
      success(res){
        let data=JSON.parse(res.data.data)
        that.setData({
          'partData':data
        })
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