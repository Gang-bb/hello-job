<template>
	<div class="circle-progress" :style="{'background-image': getPercentStyle(percent, color), '--deg':deg}">
		<div class="overlay">
			{{percent}}%
		</div>
	</div>
	<!-- <div class="circle-progress">
		<div class="move" :style="{'background-image': getPercentStyle(percent, color), '--deg':deg}"></div>
		<div class="overlay">
			{{percent}}%
		</div>
	</div> -->
</template>

<script>
	export default {
		name: 'circle-progress',
		props:{
			percent: {
				type: [Number, String],
				default: 0
			},
			color: {
				type: String,
				default: '#F56718'
			}
		},
		data() {
			return {
				// percent: 40,
				// color: '#F56718',
				deg: 0,
				num: '50%'
			}
		},
		computed: {
		    delay () {
		      return `-${this.num}s`
		    }
		},
		created() {
			this.startAnimate(10, '100%', 1000)
		},
		methods: {
			getPercentStyle(percent, color, bgColor = '#ddd') {
				let startDeg = percent > 50 ? -90 : -270;
				let computeDeg = percent > 50 ? percent - 50 : percent;
				let oneDeg = 3.6;
				let deg = startDeg + oneDeg * computeDeg;
				this.deg = deg
				console.log(percent, color, bgColor, startDeg, computeDeg, oneDeg, deg);
				if (percent <= 50) {
					return `linear-gradient(90deg, ${bgColor} 50%, transparent 50%), linear-gradient(${deg}deg, ${color} 50%, ${bgColor} 50%)`;
					// return `linear-gradient(90deg, ${bgColor} 50%, transparent 50%), linear-gradient(${deg}deg, ${color} 50%, ${bgColor} 50%)`;
				}
				return `linear-gradient(-90deg, ${color} 51%, transparent 50%), linear-gradient(${deg}deg, ${color} 50%, ${bgColor} 50%)`;
				// return `linear-gradient(-90deg, ${color} 51%, transparent 50%), linear-gradient(${deg}deg, ${color} 50%, ${bgColor} 50%)`;
			},
			startAnimate (step, limit, speed) {
			  setTimeout(() => {
			  // num 为百分比
			    if (this.num < limit) {
			      this.num += step
			      this.startAnimate(step, limit, speed)
			    } else {
			      this.num = limit
			    }
			  }, speed)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import 'static/style/variables.scss';
	.circle-progress {
		height: 180rpx;
		width: 180rpx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		// border: 30rpx solid #ddd;
		// background: #ddd;
		background-image: linear-gradient(-90deg, red 50%, transparent 50%), linear-gradient(90deg, red 50%, #ddd 50%);
		// position: relative;
		// transform-origin: left;
		// animation: spin 1s linear, bg 1s step-end;
	}
	
	.circle-progress .overlay {
		/* position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%); */
		border-radius: 50%;
		width: 130rpx;
		height: 130rpx;
		background-color: #FFF;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 40rpx;
		color: $primary-color;
	}
	
</style>
