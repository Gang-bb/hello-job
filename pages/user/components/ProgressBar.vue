<template>
	<view class="content">
		<view class="circleprogress">
			<view class="progresstext">{{percent}}%</view>
			<view class="wrapper">
				<view class="leftprogress" :style="{ transform: leftprogress, borderRightColor: percent > 0 ? '#F56718' : ''}"></view>
			</view>
			<view class="wrapper">
				<view class="rightprogress" :style="{ transform: rightprogress, borderLeftColor: percent > 0 ? '#F56718' : ''}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			percent: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
				progresstext:'50'
			}
		},
		created() {
			this.init()
		},
		methods: {
			init(){
				const {percent} = this
				console.log(percent);
				var deg = percent/100*360;
				if(deg<=180)
				{
					this.rightprogress = 'rotate('+(45+deg)+'deg)'
					this.leftprogress = 'rotate('+(-45)+'deg)'
				}else
				{
					this.rightprogress = 'rotate('+(45+180)+'deg)'
					this.leftprogress = 'rotate('+(-45+(deg-180))+'deg)'
				}
			},
			sliderchange:function(event){
				var val = event.detail.value;
				val = val/10;
				this.progresstext = val;
				var deg = val/100*360;
				if(deg<=180)
				{
					this.rightprogress = 'rotate('+(45+deg)+'deg)'
					this.leftprogress = 'rotate('+(-45)+'deg)'
				}else
				{
					this.rightprogress = 'rotate('+(45+180)+'deg)'
					this.leftprogress = 'rotate('+(-45+(deg-180))+'deg)'
				}
			}
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-flow: wrap;
		align-items: center;
		border-radius: 50%;
		text-align: center;
		height: 200upx;
	}
	.circleprogress{
		width: 100%;
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.circleprogress .progresstext{
		position: absolute;
		font-size: 40rpx;
		width: 200rpx;
		height: 160rpx; 
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		color: #F56718;
	}
	.circleprogress .wrapper{
		width: 85rpx;
		height: 200rpx;
		overflow: hidden;
		margin-top: 45rpx;
	}
	.circleprogress .leftprogress,.rightprogress{
		width: 100rpx;
		height: 100rpx;
		/* width: 110rpx;
		height: 110rpx; */
		border: 30rpx solid #ddd;
		border-bottom: 30rpx solid #F56718;
		/* border-bottom: 30rpx solid transparent; */
		border-radius: 50%;
		
	}
	.circleprogress .leftprogress{
		border-right: 30rpx solid #F56718;
		margin-left: 6rpx;
		/* border-right: 30rpx solid transparent; */
		
	}
	.circleprogress .rightprogress{
		border-left: 30rpx solid #F56718;
		/* border-left: 30rpx solid transparent; */
		margin-left: -81rpx;
		/* animation: circleProgressLoad_right 5s linear infinite; */
	}
    
</style>
