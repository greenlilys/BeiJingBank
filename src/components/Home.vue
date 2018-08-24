<template>
  <div class="homecontent">
  	<div class="imgbox"><img src="../assets/images/banner.jpg" alt="" /></div>
  	
  	<div class="flex-wrap flex-horizontal secondbox">
  		<div class="flex-con">
  			<h1><img src="../assets/images/jiang.jpg" alt="" /><span>专业</span></h1>
  			<p>15年电动车电池行业经验 | 服务于500+家销售门店 | 与国内外知名电动车企业深度合作</p>
  		</div>
  		<div class="flex-con">
  			<h1><img src="../assets/images/tree.jpg" alt="" /><span>环保</span></h1>
  			<p>高端锂电池 | 电动车租用/换电服务 | 新国标引领先锋 | 绿色出行/新能源风潮倡导者</p>
  		</div>
  		<div class="flex-con">
  			<h1><img src="../assets/images/backs.jpg" alt="" /><span>创新</span></h1>
  			<p>以租代售颠覆用户用电习惯 | 智能设备+移动互联网打造一体化供换电服务 | 深挖用户痛点，关注大数据价值</p>
  		</div>
  	</div>
  	
  	<div class="thirdbox">
  		<h1 class="tr">天牛租电 没电就换</h1>
  		<p>为城镇居民、外卖/快递配送员、跑男等电动车用户提供锂电池\电车租用业务，通过矩阵式分布的服务网点、智能换电柜为其提供便捷、实惠的满电电池更换服务。</p>
  		<div class="flex-wrap flex-horizontal thirdbom">
  			<div class="flex-con tr">集中式充电管理,有效防范安全事故<br/>平台品质监管统一保养、更新安全可靠</div>
  			<div class="flex-con tr">降低锂电价格门槛,助力新国标实施<br/>便捷高效,实惠省心</div>
  			<div class="flex-con tr">彻底解决高频电动车用户充电难题<br/>行业变革在即，顺应时代发展</div>
  		</div>  		
  	</div>
  	
  	<div class="imgbox">
  		<img src="../assets/images/city.jpg" alt="" />
  	</div>
  	<div class="btnbox">
  		<div @click="navBattery">了解更多</div>
  	</div>
  	<div class="batterytitle">换电体系灵活 支持不同区域需求</div>
  	
  	<div class="flex-wrap flex-horizontal forebox">
  		<div class="flex-con">
  			<p>自营/加盟网点</p>
  			<img src="../assets/images/pic1.png" alt="" />
  			<ul>
  				<li>专用APP处理日常业务</li>
  				<li>人工辅助整改安装</li>
  				<li>快速部署上线</li>
  				<li>更适于居民街区、支线干道</li>
  			</ul>
  		</div>
  		<div class="flex-con">
  			<p>自营/加盟网点</p>
  			<img src="../assets/images/pic2.png" alt="" />
  			<ul>
  				<li>无人值守，自助换电</li>
  				<li> 365天24小时全勤</li>
  				<li>多重保护，安全环保</li>
  				<li>更适于高频商业区、办公区</li>
  			</ul>
  		</div>
  		<div class="flex-con">
  			<p>网点+智能换电柜</p>
  			<img src="../assets/images/pic3.png" alt="" />
  			<ul>
  				<li>城市穿插分布部署，场景为先</li>
  				<li>快速成型运营，分布密度可控</li>
  				<li>标准服务流程，按需选择</li>
  				<li>运营维护有序，数据类型丰富</li>
  			</ul>
  		</div>
  	</div>
  	<div class="btnbox">
  		<router-link to="/Home/Load"><div>了解更多</div></router-link>
  	</div>
  	<div class="imgboxd">
  		<p>智能换电系统 骑行续航无忧</p>
  		<div class="lefticon flex-wrap flex-horizontal">
  			<div class="iconfore flex-wrap flex-vertical flex-justify-around">
  				<div><img src="../assets/images/pic4.png" alt="" /><h2>实时定位</h2></div>
  				<div><img src="../assets/images/pic8.png" alt="" /><h2>骑行导航</h2></div>
  				<div><img src="../assets/images/pic12.png" alt="" /><h2>网点地图</h2></div>
  				<div><img src="../assets/images/pic16.png" alt="" /><h2>一码订单</h2></div>
  			</div>
  			<div class="iconthree flex-wrap flex-vertical flex-justify-around">
  				<div><img src="../assets/images/pic6.png" alt="" /><h2>实时救援</h2></div>
  				<div><img src="../assets/images/pic10.png" alt="" /><h2>租期提醒</h2></div>
  				<div><img src="../assets/images/pic14.png" alt="" /><h2>3秒预约</h2></div>
  			</div>
  		</div>
  		<div class="righticon flex-wrap flex-horizontal">
  			<div class="iconthree flex-wrap flex-vertical flex-justify-around">
  				<div><img src="../assets/images/pic7.png" alt="" /><h2>支付安全</h2></div>
  				<div><img src="../assets/images/pic11.png" alt="" /><h2>积分商城</h2></div>
  				<div><img src="../assets/images/pic15.png" alt="" /><h2>T+1提现</h2></div>
  			</div>
  			<div class="iconfores flex-wrap flex-vertical flex-justify-around">
  				<div><img src="../assets/images/pic5.png" alt="" /><h2>等级折扣</h2></div>
  				<div><img src="../assets/images/pic9.png" alt="" /><h2>贴心客服</h2></div>
  				<div><img src="../assets/images/pic13.png" alt="" /><h2>优惠活动</h2></div>
  				<div><img src="../assets/images/pic17.png" alt="" /><h2>退租续租</h2></div>
  			</div>
  		</div>
  		<div class="btnbox dingwei">
  			<router-link to="/Home/Load"><div>下载安装</div></router-link>
  		</div>  	
  	</div>  	
  		
  	<h3 class="citya">城市运营效果显著</h3>
  	<h3 class="cityb">郑州作为天牛换电首批运营的省会城市，聚焦在跑男群体中运营半年，取得良好效果。</h3>
  	<div class="tablebox flex-wrap flex-horizontal">
  		<div class="flex-con flex-wrap flex-vertical flex-justify-center flex-align-center">
  			<p>56<span>家</span></p>
  			<h4>网点</h4>
  		</div>
  		<div class="flex-con flex-wrap flex-vertical flex-justify-center flex-align-center">
  			<p>800<span>+个</span></p>
  			<h4>租电用户</h4>
  		</div>
  		<div class="flex-con flex-wrap flex-vertical flex-justify-center flex-align-center">
  			<p>1000<span>+组</span></p>
  			<h4>流通锂电</h4>
  		</div>
  		<div class="flex-con flex-wrap flex-vertical flex-justify-center flex-align-center">
  			<p>1200<span>+次</span></p>
  			<h4>日均换电</h4>
  		</div>
  		<div class="flex-con flex-wrap flex-vertical flex-justify-center flex-align-center">
  			<p>6<span>家</span></p>
  			<h4>月租</h4>
  		</div>
  	</div>
  	
  	<div class="btnbox">  		
  		<div>加入我们</div>
  	</div>
  	
  	<div class="hand">
  		<p>备受群体/企业客户关注</p>
  		<div class="btnbox dingwei">
  			<router-link to="/Home/Contant"><div>联系我们</div></router-link>  			
  		</div> 
  	</div>  	
  
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
     
    }
  },
  methods:{
  	navBattery(){
  		this.$router.push('/Home/Battery');
  	}
  }
}
</script>


<style scoped>
.homecontent{width:100%;}
.imgbox{width:100%;}
.imgbox img{display:inline-block;width:100%;}
.secondbox{width:1200px;margin:68px auto 50px auto;}
.secondbox>div{border:1px #63b62f solid;height:154px;padding:20px 0 0 36px;box-sizing: border-box;} 
.secondbox>div:nth-child(1),.secondbox>div:nth-child(2){border-right:none;}
.secondbox h1{height:40px;font-size:30px;color:#63b62f;}
.secondbox h1 span{line-height: 40px;display:inline-block;height:40px;padding-left:8px;vertical-align:middle}
.secondbox img{display:inline-block;height:40px;}
.secondbox p{margin-top:28px;font-size:14px;}
.thirdbox{width:1130px;margin:0 auto;}
.thirdbox h1{color:#354248;font-size:36px;margin-bottom:30px;}
.thirdbox p{font-size:18px;margin-bottom:30px;text-indent:36px;}
.thirdbox .thirdbom{font-size:14px;line-height:36px;}
.btnbox{width:100%;}
.btnbox div{margin:0 auto;width:180px;height:50px;background:#63b62f;border-radius:25px;font-size:24px;color:#fff;line-height: 50px;
text-align: center;margin-top:40px;margin-bottom:80px;box-shadow: 0 6px 10px #b0c8e8;cursor:pointer;}

.batterytitle{font-size:36px;text-align: center;color:#354248;}
.forebox{width:1200px;margin:0 auto;}
.forebox img{display:inline-block;width:100%;} 
.forebox p{color:#354248;font-size:30px;margin:50px 0;padding-left:80px;}
.forebox ul{margin-top:50px;padding-left:80px;}
.forebox ul li{line-height:30px;list-style:disc;}
.imgboxd{background-image:url('../assets/images/pict_14.jpg');background-repeat:no-repeat;width:100%;height:820px;position:relative;background-size:cover;}
.imgboxd p,.hand p{color:#354248;font-size:36px;text-align:center;line-height:120px;}
.lefticon{position:absolute;top:130px;left:468px;}
.lefticon h2,.righticon h2{font-size:14px;color:#354248;text-align:center;}
.iconfore{height:512px;margin-right:80px;}
.iconthree{height:384px;padding:64px 0;}
.righticon{position:absolute;top:130px;right:448px;}
.iconfores{height:512px;margin-left:80px;}
.dingwei{position:absolute;bottom:80px;height:50px;}
.citya{text-align: center;font-size:36px;color:#citya;line-height:92px;}
.cityb{text-align: center;font-size:18px;color:#citya;line-height:26px;}
.tablebox >div{border:1px #63b62f solid}
.tablebox >div:nth-child(1),.tablebox >div:nth-child(2),.tablebox >div:nth-child(3),.tablebox >div:nth-child(4){border-right:none;}
.tablebox{height:150px;width:1200px;margin:30px auto 0 auto;}
.tablebox p{font-size:42px;color:#63B62F;text-align:center;}
.tablebox h4{font-size:24px;color:#63B62F;text-align:center;}
.tablebox p span{font-size:24px;}
.hand{width:100%;background-image:url('../assets/images/hand.jpg');background-repeat:no-repeat;height:671px;position:relative;background-size:cover;}

</style>
