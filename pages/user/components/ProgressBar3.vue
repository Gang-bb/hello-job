<template>
	<div class="circleProgress_wrapper">
		<div class="wrapper right">
			<div class="circleProgress rightcircle" :style="{ transform: leftprogress}"></div>
		</div>
		<div class="wrapper left">
			<div class="circleProgress leftcircle" :style="{ transform: rightprogress}"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			percent: {
				type: [Number, String],
				default: 30
			}
		},
		data(){
			return {
				leftprogress: 'rotate(-45deg)',
				rightprogress: 'rotate(45deg)',
				progresstext:'50'
			}
		},
		created() {
			this.init()
		},
		methods:{
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
		}
	}
</script>

<style lang="scss" scoped>
	.circleProgress_wrapper {
		width: 200rpx;
		height: 200rpx;
		// margin: 50px auto;
		position: relative;
		// border: 1px solid #ddd;
	}

	.wrapper {
		width: 50%;
		height: 100%;
		position: absolute;
		top: 0;
		overflow: hidden; // 重点作用
	}

	.right {
		right: 0;
	}

	.left {
		left: 0;
	}

	.circleProgress {
		width: 160rpx;
		height: 160rpx;
		// border: 20rpx solid transparent;
		border: 20rpx solid #ccc;
		border-radius: 50%;
		position: absolute;
		top: 0;
		// transform: rotate(45deg);
		// transform: rotate(-135deg);
	}

	.rightcircle {
		border-top: 20rpx solid green;
		border-right: 20rpx solid green;
		right: 2rpx;
		// animation: circleProgressLoad_right 5s linear infinite;
	}

	.leftcircle {
		border-bottom: 20rpx solid green;
		border-left: 20rpx solid green;
		left: 4rpx;
		// animation: circleProgressLoad_left 5s linear infinite;
	}

	@-webkit-keyframes circleProgressLoad_right {
		0% {
			transform: rotate(-135deg);
		}
		50%{
			transform: rotate(-135deg);
		}
		100% {
			transform: rotate(45deg);
		}
	}

	@-webkit-keyframes circleProgressLoad_left {

		0%,
		50% {
			transform: rotate(-135deg);
		}

		100% {
			transform: rotate(45deg);
		}
	}
</style>
