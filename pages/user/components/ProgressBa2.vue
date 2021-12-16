<template>
	<div class="circle-bar">
	    <div class="circle-bar-left"></div>
	    <div class="circle-bar-right"></div>
	    <div class="mask">
				<span class="percent">33%</span>
	    </div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.circle-bar {
	    background-image: linear-gradient(#E25C41, #E69323);
	    width: 182rpx;
	    height: 182rpx;
	    position: relative;
	}
	.circle-bar-left {
	    background-color: #e9ecef;
	    width: 182rpx;
	    height: 182rpx;
	    clip: rect(0, 91rpx, auto, 0);
	}
	.circle-bar-right {
	    background-color: #e9ecef;
	    width: 182rpx;
	    height: 182rpx;
	    clip: rect(0, auto, auto, 91rpx);
	    transform: rotate(118.8deg);
	}
	.mask {
		width: 140rpx;
		height: 140rpx;
		background-color: #fff;
		text-align: center;
		line-height: 0.2em;
		color: rgba(0, 0, 0, 0.5);
		position: absolute;
		left: 21rpx;
		top: 21rpx;
	}
	.mask > span {
		display: block;
		font-size: 44rpx;
		line-height: 140rpx;
	}
	/*所有的后代都水平垂直居中，这样就是同心圆了*/
	.circle-bar * {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		margin: auto;
	}
	/*自身以及子元素都是圆*/
	.circle-bar,
	.circle-bar > * {
	  border-radius: 50%;
	}
</style>
