import * as echarts from '../../ec-canvas/echarts';
import * as echarts1 from '../../ec-canvas/echarts';
Page({
  onClickLeft() {
    wx.showToast({ title: '点击返回', icon: 'none' });
  },
  
  // onClickRight() {
  //   wx.showToast({ title: '点击按钮', icon: 'none' });
  // },
  /**
   * 页面的初始数据
   */
  data: {
    echartData:[],
    showw:false,
    isday:false,
    show1:false,
    areas:'',
    supplier:'',
    home:'home',
    date:{},
    pieData:[],
    dayweigh:'',
    showpie:false,
    ec: {
      lazyLoad: true // 延迟加载
    },
    ec1: {
      lazyLoad: true // 延迟加载
    },
    showEchart:true,
    me:'me',
    value:'',
    active: 1,
    index:1,
    bar:'../../images/baractive.png',
    yeardata:'2021',
    year:'2021年',
    mounth:'',
    area:'所有地区',
    pie:'../../images/pie.png',
    areaData:[],
    show:false,
    columnsdata1:[],
    username:'',
    password:'',
    columnsdata:'2021',
    columns:{},
    cos: [
    ],
    option1: [
      { text: '选择地区及区域', value: 'a' },
    ],
    value2: 'a',
  },
  bar:function(){
    this.setData({
      pie:'../../images/pie.png',
      bar:'../../images/baractive.png',
      showEchart:true,
      showpie:false
    })
  },
  onDate(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1,value[0].children);
    
  },
  Change(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  
  me: function () {
  
    wx.navigateTo({
      url: '/pages/my/my',
    })
  },

  year:function(){
    this.setData({
      show:true,
      show1:false
    })
    this.hidee()
  },
  hidee:function(){
    this.setData({
      showEchart:false,
      showpie:false
    })
  },
  showe:function(){
    this.setData({
      showEchart:true
    })
  },
  Close:function(){
    this.setData({
        show:false,
        show1:false,
        showEchart:true
    })
},
onClose:function(){
     this.setData({
       show:false
     })
     this.showe()
},
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  
  getYear(){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y =date.getFullYear();
    var arr = []
    var arrdata=[]
    for(var i=0;i<6;i++){
      arr.push(Y--+'年')
      arrdata.push(Y+1)
    }
    this.setData({
      columns:arr,
      columnsdata:arrdata
    })
    var mouth= ["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
    
    var date1 = [
      {
        text:this.data.columns[0],
        children:["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'
      ]
      },
      {
        text:this.data.columns[1],
        children:["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'
      ]
      },
      {
        text:this.data.columns[2],
        children:["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'
      ]
      },
      {
        text:this.data.columns[3],
        children:["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'
      ]
      },
      {
        text:this.data.columns[4],
        children:["全部","1月",'2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'
      ]
      }
    ]
    this.setData({
      date:date1,
    })
    this.setData({
      cos:[
        {
          values: this.data.date,
          className: 'column1',
        },
        {
          values: this.data.date[0].children,
          className: 'column2',
          defaultIndex: 0,
        },
      ]
    })
  },
  onCancel:function(){
    this.setData({
      show:false,
      show1:false,
      showEchart:true
    })
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  area:function(){
    this.setData({
      show1:true,
      show:false,
      showEchart:false,
      showpie:false
    })
  },
  home:function(){
      wx.reLaunch({
        url: '/pages/siji/siji',
      })
  },
  onArea(event) {
    const { picker, value, index } = event.detail;
    picker.setColumnValues(1,value[0].children);
    
  },
  onConfirm(value){
    this.setData({
      columnsdata1:value.detail.value,
      show:false,
      showEchart:true,
      showpie:false,
      pie:'../../images/pie.png',
      bar:'../../images/baractive.png',
    })
    
    this.setData({
      year:this.data.columnsdata1[0].text,
      mounth:this.data.columnsdata1[1]
    })
    if(this.data.columnsdata1[1]=="全部"){
      this.setData({
       mounth:'',
      })
   }
   if(this.data.mounth.length == 0){
    this.setData({
      isday : false
    })
   }else{
     this.setData({
      isday : true
    })
   }
    wx.request({
     url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetReportDataNew',
     method:"POST",
     data:{areas:this.data.areas,supplier:this.data.supplier,date:this.data.year + this.data.mounth,_t:this.data._t},
     header: {
       'content-type': 'application/json' // 默认值
     },
     success:(res)=>{
       this.setData({
         echartData:res.data,
       })
       if(this.data.isday == true){
            this.setData({
              dayweigh:res.data.sunWeigh
            })
       }
       setTimeout(()=>{
         this.init_echarts()
       },1000)
     },
   })
 },
  ConfirmArea:function(event){
    const { picker, value, index } = event.detail;
    this.setData({
      show1:false,
      showEchart:true,
      showpie:false
    })

    if(event.detail.value[0].text == "全部"){
      this.setData({
        areas:"",
        supplier:"",
        pie:'../../images/pie.png',
        bar:'../../images/baractive.png',
      })
    }else if(event.detail.value[1].text == "全部"){
      this.setData({
        areas:event.detail.value[0].text,
        supplier:"",
        pie:'../../images/pie.png',
        bar:'../../images/baractive.png',
      })
    }else{
      this.setData({
        areas:event.detail.value[0].text,
        supplier:event.detail.value[1].text,
        pie:'../../images/pie.png',
        bar:'../../images/baractive.png',
      })
    }
   
    if(this.data.mounth.length == 0){
      this.setData({
        isday : false
      })
     }else{
       this.setData({
        isday : true
      })
     }
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetReportDataNew',
      method:"POST",
      data:{areas:this.data.areas,supplier:this.data.supplier,date:this.data.year + this.data.mounth,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        this.setData({
          echartData:res.data,
        })
        if(this.data.isday == true){
             this.setData({
               dayweigh:res.data.sunWeigh
             })
        }
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })
    
    
  },
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart');
  this.getYear()
    let that = this
    var timestamp
    timestamp = new Date().getTime(); 
      this.setData({
        _t:timestamp
      })
    setInterval(()=>{
      timestamp = new Date().getTime(); 
      this.setData({
        _t:timestamp
      })
    },1000)
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetArea_Supplier',
      method:"POST",
      data:{_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
         var arrs = res.data
         arrs.unshift({text:"全部",children:[{text:"全部"}]})
         arrs.forEach((item,index) => {
           item.children.unshift({text:"全部"})
         });
         arrs[0].children.pop()
        this.setData({
          areaData:res.data,
          area:[
            {
              values: arrs,
              className: 'column1',
            },
            {
              values: arrs[0].children,
              className: 'column2',
              defaultIndex: 0,
            },
          ]
        })
        this.setData({
          
        })
      
      console.log(arrs,this.data.area )
      },
    })
    
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetReportDataNew',
      method:"POST",
      data:{areas:this.data.areas,supplier:this.data.supplier,date:this.data.year + this.data.mounth,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        this.setData({
          echartData:res.data,
        })
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })
    wx.getStorage({
      key: 'key',
      success(res) {
        that.setData({
          username:res.data[0],
          password:res.data[1]
        })
      },
      fail(res) {
        if(that.data.password==''||that.data.username==''){
        //   setTimeout(()=>{
        //     wx.reLaunch({
        //       url: '/pages/login/login'
        //     })
        // },2000)
        }
      }
    })
    
    
   
  },
  init_echarts: function () {
    const getPixelRatio = () => {
      let pixelRatio = 0
      wx.getSystemInfo({
        success: function (res) {
          pixelRatio = res.pixelRatio
        },
        fail: function () {
          pixelRatio = 0
        }
      })
      return pixelRatio
    }
    var dpr = getPixelRatio()
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
       const Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio:dpr   
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var WeighArray;
    var end
    if(this.data.mounth.length ==0){
      var mouth =['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月']
      WeighArray = this.data.echartData.monthWeighArray
      end = 100
    }else{
      var mouth = this.data.echartData.daysArray
      WeighArray = this.data.echartData.daysWeighArray
      end = 40
    }
    var option = {
      color: ['#37a2da','#e8852f'],
      legend: {
        selectedMode :false,
        data: ['收运量(吨)']
      },
      dataZoom:[
        {
          type: 'inside',//slider表示有滑动块的，inside表示内置的
            show:true,
            yAxisIndex:[0],
            start:end,
            end: 0,
            filterMode: 'filter',
        }
      ],
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
    	xAxis:[{
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }],
	    yAxis: [{
        type: 'category',
        axisTick: { show: false },
        data:mouth ,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          interval:0,
          color: '#666',
        }
      }],
      
	    series:[
        
        {
          name: '收运量(吨)',
          type: 'bar',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: WeighArray,
          itemStyle: {
            // emphasis: {
            //   color: '#37a2da'
            // }
          }
        }
      ]
    }
    return option;
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