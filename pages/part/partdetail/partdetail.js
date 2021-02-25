// pages/part/partdetail/partdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [
      {
        text: '进场',
      },
      {
        text: '首次收运',
      },
      {
        text: '验货放行',
      },
      {
        text: '二次收运',
      },
      {
        text: '出场',
      },
      {
        text: '打单',
      },
    ],
    active:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '小订单详情'
    })
    let that=this
    wx.request({
      url: 'http://118.24.196.69:20017/Api/SJApi/SmallOrderDetial',
      method:'POST',
      data:{
        ID:options.id
      },
      success(res){
        let data=JSON.parse(res.data.data)
        that.setData({
          'detailData':data
        })
        switch (data.FlowStates) {
          case 5:
            that.data.active = -1;
            break;
          case 15:
            that.data.active = 0;
            break;
          case 16:
            that.data.active = 1;
            break;
          case 17:
            that.data.active = 2;
            break;
          case 18:
            that.data.active = 3;
            break;
          case 19:
            that.data.active = 4;
            break;
          case 25:
            that.data.active = 5;
            break;
        }
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
    wx.stopPullDownRefresh()
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