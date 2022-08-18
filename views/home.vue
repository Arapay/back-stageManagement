<template>
    <div>
        <el-row class="home" :gutter="20" >
            <el-col :span="8" style="margin-top:20px">
                <el-card shadow='hover' style="height:320px">
                    <div class="user">
                        <img :src="userimg" alt=""/>
                        <div class="userinfo">
                            <p class="name">FJX</p>
                            <p class="access">超级管理员</p>
                        </div>
                    </div>
                    <div class="login-info">
                        <p>上次登录的时间： <span>2022-5-13</span></p>
                        <p>上次登录的地点： <span>安徽大学</span></p>
                    </div>
                </el-card>
                <el-card shadow='hover' style="margin-top:20px;height:400px ">
                    <el-table :data="tableData">
                        <el-table-column
                            prop="name"
                            label="姓名"
                            >
                        </el-table-column>
                        <el-table-column
                            prop="todayBuy"
                            label="今日购买">
                        </el-table-column>
                        <el-table-column
                            prop="monthBuy"
                            label="本月购买">
                        </el-table-column>
                        <el-table-column
                            prop="totalBuy"
                            label="总购买">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card style="margin-top:20px" shadow='hover' >
                       <div class="statistics" >
                            <el-card class='massage' v-for="item in countData" :key="item.name" :body-style="{padding:0}">
                                <div class="num">
                                    <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
                                    <div class='num-content' >
                                        <p class="num">￥{{item.value}}</p>
                                        <p class="txt">{{item.name}}</p>
                                    </div>
                                </div>
                            </el-card>
                       </div>
                </el-card>
                <el-card style="height:260px" shadow='hover'>
                    <div style="height:260px" ref="echarts">

                    </div>
                </el-card>
                <div class="graph" style="display:flex;justify-content:space-between">
                    <el-card style="height:250px;width:400px" shadow='hover'> 
                        <div style="height:250px" ref="echarts1"></div>
                    </el-card>
                    <el-card  style="height:250px;width:400px" shadow='hover'>
                        <div style="height:250px" ref="pieecharts"></div> </el-card>
                </div>
              
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getData} from '../api/data.js'
import * as echarts from 'echarts'
export default {
   name:'home',
   data(){
       return{
           userimg:require('../src/assets/user1.png'),
            tableData: [],
            countData: [
          {
            name: "今日支付订单",
            value:"1234" ,
            icon: "success",
            color:"#2ec7c9" 
          },
          {
            name: "今日收藏订单",
            value: "210",
            icon: "star-on",
            color:"#ffb980 " 
          },
          {
            name:"今日未支付订单" ,
            value:"1434" ,
            icon: "s-goods",
            color: "#5ab1ef"
          },
          {
            name: "本月支付订单",
            value:"1934" ,
            icon: "success",
            color:"#2ec7c9" 
          },
          {
            name: "本月收藏订单",
            value: "5210",
            icon: "star-on",
            color:"#ffb980 " 
          },
          {
            name:"本月未支付订单" ,
            value:"134" ,
            icon: "s-goods",
            color: "#5ab1ef"
          },
        ],
       }
   },
   mounted(){
       getData().then(res=>{
           const {code,data}=res.data
           if(code===20000){
               this.tableData=data.tableData
               const order = data.orderData
               const xData = order.date
               const keyArray = Object.keys(order.data[0])
               const series=[]
               keyArray.forEach(key => {
                   series.push({
                       name:key,
                       data:order.data.map(item=>item[key]),
                       type:'line'
                   })
               });
               const option ={
                   xAxis:{
                       data:xData
                   },
                   yAxis:{},
                   legend:{
                       data:keyArray
                   },
                   series
               }
               
               const E = echarts.init(this.$refs.echarts)
               E.setOption(option)

               //用户图
               const userOption={
                    legend:{
                        textStyle:{
                        color:"#333", //提示颜色
                        },
                    },
                    grid:{
                    left:"20%"
                    },
                    tooltip:{
                    trigger:"item"
                    },
                    xAxis:{
                        type:"category",
                        data:data.userData.map(item=>item.date),
                        axisLine:{ //刻标颜色
                        lineStyle:{
                            color:"#17b3a3",
                        } 
                        },
                        axisLabel:{ //刻度标签颜色
                        interval:0,
                        color:"#333",
                        }
                    },
                    yAxis:[
                        {
                        type:"value",
                        axisLine:{
                        lineStyle:{
                            color:"#17b3a3"
                        }
                        }
                        }
                    ],
                    color:["#2ec7c9","#b6a2de"],
                    series:[
                        {
                        name:'新增用户',
                        data:data.userData.map(item=>item.new),
                        type:'bar'
                        },
                        {
                        name:'活跃用户',
                        data:data.userData.map(item=>item.active),
                        type:'bar'
                        }
                    ]
                    }
                    const U = echarts.init(this.$refs.echarts1)
                    U.setOption(userOption)

                    //饼图
                    const videooption={
                       tooltip:{
                            trigger:"item",
                        },
                        color:[
                            "#0f78f4",
                            "#dd536b",
                            "#9462e5",
                            "#a6a6a6",
                            "#elbb22",
                            "#39c362",
                            "#3ed1cf",
                        ],
                        series:[
                            {
                            data:data.videoData,
                            type:'pie',
                                
                            }
                        ]

                    }
                    const V=echarts.init(this.$refs.pieecharts)
                    V.setOption(videooption)
           }
           console.log(res)
       })
   }
}
</script>
<style lang="less" scoped>
    *{
       margin: 0;
       padding: 0; 
    }
    .user{
        display: flex;
        justify-content: space-around;
        img{
            width: 150px;
            height: 150px;
        }
    }
    .userinfo{
        
        p{
            margin: 20px;
            margin-top: 40px;
            font-size: 20px;
        }
    }
    .login-info{
        border-top: 2px solid grey;
        p{
            margin: 20px;
            font-size: 10px;
            color: gray;
        }
    }
    .num{
        margin: 0;
        padding: 0;
        display: flex;
    }
    .massage{
        display: flex;
        flex-direction: row;
        width: 220px;
        height: 60px;
        float: left;
        margin: 20px;
        justify-content: space-between;
        .icon{
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: white;
            font-size: 30px;
        }
        .txt{
            font-size: 10px;
            color: grey;
        }
    }
    .num-content{
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
    
</style>