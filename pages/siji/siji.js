// pages/siji.js

// pages/siji.js
import * as echarts from '../../ec-canvas/echarts';
import * as echarts1 from '../../ec-canvas/echarts';
import Toast from '../../dist/toast/toast';
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
    isHome:true,
    _t:'',
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    showw:false,
    isday:true,
    isyear:false,
    ismonth:false,
    timetype:3,
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
    dayweight:'',
    index:1,
    bar:'../../images/baractive.png',
    yeardata:'2021',
    year:'2021',
    month:'1',
    mounth:'',
    day:'1',
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
  onInput(event) {
    this.setData({
      currentDate: event.detail,
    });
  },
  pie:function(){
    this.setData({
    })
   
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetYearReport',
      method:"POST",
      data:{"count": "5", "areas": this.data.areas},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        
        this.setData({
          pieData:res.data,
        })
        console.log(this.data.pieData)
        this.init_echarts1()
      },
    })
    this.setData({
      pie:'../../images/pieactive.png',
      bar:'../../images/bar.png',
      showpie:true,
      showEchart:false
    })
 
  },
  bar:function(){
    this.setData({
      pie:'../../images/pie.png',
      bar:'../../images/baractive.png',
      showEchart:true,
      showpie:false
    })
  },
//   onDate(event) {
//     const { picker, value, index } = event.detail;
//     picker.setColumnValues(1,value[0].children);
    
//   },
search:function(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
},
onYear:function(){
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  this.setData({
      timetype:1,
      showEchart:false,
      isyear:'true',
      ismonth:false,
      isday:false,
    })
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:this.data.areas,time:this.data.year,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        Toast.clear
        console.log(res.data.data[res.data.data.length-1])
        this.setData({
          showEchart:true,
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        
        setTimeout(()=>{
          this.init_echarts()
          
        },1000)
      },
    })
},
onMonth:function(){
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
  this.setData({
      timetype:2,
      showEchart:false,
      ismonth:true,
      isyear:false,
      isday:false
    })
    var st = this.data.year.toString()
     if(this.data.month<10){
       var mo = '0' + this.data.month.toString()
     }else{
       var mo  = this.data.month.toString()
     }
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:this.data.areas,time:st+mo,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        Toast.clear
        this.setData({
          showEchart:true,
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })
},
onDate(value){
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
  });
    console.log(value)
    var dateTime = new Date(parseInt(value.detail))
    var year = dateTime.getFullYear();
    var month = dateTime.getMonth() + 1;
    var day = dateTime.getDate();
    this.setData({
        year:year,
        showEchart:false,
        timetype:3,
        month:month,
        day:day,
        isday:true,
        ismonth:false,
        isyear:false,
        showEchart:true,
        showpie:false,
        show:false
    })
    console.log(this.data.year,this.data.month,this.data.day)
    var st = this.data.year.toString()
     if(this.data.month<10){
       var mo = '0' + this.data.month.toString()
     }else{
       var mo  = this.data.month.toString()
     }
     if(this.data.day<10){
       var da = '0' + this.data.day.toString()
     }else{
       var da = this.data.day.toString()
     }
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:this.data.areas,time:st+mo+da,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        Toast.clear
        this.setData({
          showEchart:true,
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })
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
  home:function(){
  
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
  onArea(event) {
  },
  back:function(){
    this.setData({
      isHome:true,
      areas:"",
    })
    var st = this.data.year.toString()
    if(this.data.month<10){
      var mo = '0' + this.data.month.toString()
    }else{
      var mo  = this.data.month.toString()
    }
    if(this.data.day<10){
      var da = '0' + this.data.day.toString()
    }else{
      var da = this.data.day.toString()
    }
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:"",time:st+mo+da,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        Toast.clear
        this.setData({
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        console.log(this.data.echartData)
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })

  },
  ConfirmArea:function(event){
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    const { picker, value, index } = event.detail;
    console.log(value)
    this.setData({
      show1:false,
      showEchart:true,
      showpie:false
    })
    if(event.detail.value[0].text == '全部'){
        this.setData({
            areas:'',
            isHome:true,
            pie:'../../images/pie.png',
            bar:'../../images/baractive.png',
          })
    }else{
      this.setData({
        areas:value[0].text
      })
    }
     var st = this.data.year.toString()
     if(this.data.month<10){
       var mo = '0' + this.data.month.toString()
     }else{
       var mo  = this.data.month.toString()
     }
     if(this.data.day<10){
       var da = '0' + this.data.day.toString()
     }else{
       var da = this.data.day.toString()
     }
     console.log(value[0].text,st+mo+da)
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:this.data.areas,time:st+mo+da,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        Toast.clear
        this.setData({
        
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        console.log(this.data.echartData)
        setTimeout(()=>{
          this.init_echarts()
        },1000)
      },
    })
  },
  
  init_echarts: function () {
    var that = this
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
      console.log(that.data.areas)
      if(that.data.isHome == true){
      Chart.on('click',function(params){
        console.log(params.name)
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
       that.setData({
          show1:false,
          areas:params.name,
          showEchart:true,
          showpie:false
        })
       
         var st = that.data.year.toString()
         if(that.data.month<10){
           var mo = '0' + that.data.month.toString()
         }else{
           var mo  = that.data.month.toString()
         }
         if(that.data.day<10){
           var da = '0' + that.data.day.toString()
         }else{
           var da = that.data.day.toString()
         }
        wx.request({
          url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
          method:"POST",
          data:{area:params.name,time:st+mo+da,type:that.data.timetype,_t:that.data._t},
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:(res)=>{
            Toast.clear
            that.setData({
              isHome:false,
              echartData:res.data,
              dayweight:res.data.data[res.data.data.length-1]
            })
            console.log(that.data.echartData)
            setTimeout(()=>{
              that.init_echarts()
            },1000)
          },
        })
   　　　　 //getStuAnswer(params.seriesName,examClassId,params.name);//调用接口
       })
      }
      return Chart;
    });
   
  },
  init_echarts1: function () {
    this.echartsComponnet1.init((canvas, width, height) => {
      // 初始化图表
       const Chart1 = echarts1.init(canvas, null, {
        width: width,
        height: height
      });
      Chart1.setOption(this.getOption1());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart1;
    });
  },
  getOption1: function () {
    // 指定图表的配置项和数据
    var WeighArray;
    
    console.log(this.data.pieData.yearArray)
      var value= this.data.pieData.yearWeighArray
      var name =this.data.pieData.yearArray
      var data = [{
        value:value[0],
        name:name[0]
      },{
        value:value[1],
        name:name[1]
      },{
        value:value[2],
        name:name[2]
      },{
        value:value[3],
        name:name[3]
      },{
        value:value[4],
        name:name[4]
      }]
    var option = {
      color: ["#37A2DA", "#32C5E9", "#fb1d1d", "#fb851d", "#22cc0f"],
	    series:[
        {
          name: '',
          label: {
            normal: {
              fontSize: 14
            }
          },
          type: 'pie',
          center: ['50%', '50%'],
          radius: ['40%', '60%'],
          data: data,
        }
      ]
    }
    return option;
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var WeighArray;
    var end
    var zoomLock 
    if(this.data.echartData.areas.length<5){
        end = 100
        zoomLock = true
    }else if(this.data.echartData.areas.length<10){
      end = 50 
      zoomLock = false
    }else if(this.data.echartData.areas.length<15){
      end = 40
      zoomLock =false
    }else{
      end = 20
      zoomLock = false
    }
    this.data.echartData.areas.pop()
    this.data.echartData.data.pop()
    console.log(this.data.echartData.areas.length,end,)
      var areas =this.data.echartData.areas
      WeighArray = this.data.echartData.data
    var option = {
      color: ['#37a2da','#e8852f'],
      tooltip:{
        trigger:'axis',
      },
      legend: {
        
        selectedMode :false,
        data: ['收运量(吨)']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      dataZoom:[
        {
          type: 'inside',//slider表示有滑动块的，inside表示内置的
            show:true,
            zoomLock:zoomLock,
            xAxisIndex:[0],
            start:0,
            minSpan:20,
            maxSpan:80,
            end: end,
            filterMode: 'none',
        }
    ],
    	xAxis:[{
        type: 'category',
        axisTick: { show: false },
        data:areas ,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666',
          interval:0,
          formatter:function(value){
            var result = "";//拼接加\n返回的类目项
            var maxLength = 3;//每项显示文字个数
            var valLength = value.length;//X轴类目项的文字个数
            var rowNumber = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowNumber > 1)//如果文字大于3,
            {
                for (var i = 0; i < rowNumber ; i++) {
                    var temp = "";//每次截取的字符串
                    var start = i * maxLength;//开始截取的位置
                    var end = start + maxLength;//结束截取的位置
                    temp = value.substring(start, end) + "\n";
                    result += temp; //拼接生成最终的字符串
                }
                return result ;
            }
            else {
                return value;
            }
        },
        }
      }],
	    yAxis: [{
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999',
          }
        },
        splitLine:false,
        axisLabel: {
          color: '#666',
        }
      }],
	    series:[
        {
          name: '收运量(吨)',
          type: 'bar',
          barCateGoryGap:'0%',
          barWidth : 20,//柱图宽度
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
  onLoad: function (options) {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
    this.echartsComponnet = this.selectComponent('#mychart');
    this.echartsComponnet1 = this.selectComponent('#mychart1');
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
          
        var arrs =[{text:"全部",children:{text:""}}]
        res.data.forEach((item,index)=>{
            arrs.push(res.data[index])
        })
          
          console.log(arrs)
        this.setData({
          areaData:res.data,
          area:[
            {
              values: arrs,
              className: 'column1',
            }
          ]
        })
        console.log(res.data)
      },
    })
    this.setData({
      timetype:1,
      isyear:'true',
      ismonth:false,
      isday:false,
    })
    wx.request({
      url: 'https://jyyf.huantengkj.com:20025/API2/MiniProgram/GetListBySupplier',
      method:"POST",
      data:{area:this.data.areas,time:this.data.year,type:this.data.timetype,_t:this.data._t},
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:(res)=>{
        
        console.log(res.data.data[res.data.data.length-1])
        this.setData({
          echartData:res.data,
          dayweight:res.data.data[res.data.data.length-1]
        })
        setTimeout(()=>{
          this.init_echarts()
          Toast.clear
        },1000)
      },
    })
    wx.hideHomeButton()
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
          setTimeout(()=>{
            wx.reLaunch({
              url: '/pages/login/login'
            })
        },2000)
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