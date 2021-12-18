<template>
	<view class="page">
		<u-sticky :offset-top="0">
			<view class="p-l-30 p-r-30 p-t-10 p-b-20 flex-1 bottom-line">
				<u-search v-model="keyword"></u-search>
			</view>
		</u-sticky>
		<view class="m-t-b-30 p-l-r-30">
			<view class="m-b-20 f-s-26">热门搜索</view>
			<view class="row center flex-wrap">
				<view v-for="(item,index) in hots" :key="index" class="select-box m-r-20 m-b-20 f-s-22">{{item}}</view>
			</view>
		</view>
		<view class="p-l-r-30">
			<view class="m-b-20 f-s-26 row-between">
				<text>历史搜索</text>
				<u-icon name="trash" size="23"></u-icon>
			</view>
			<view class="row center flex-wrap">
				<view v-for="(item,index) in historys" :key="index" class="select-box m-r-20 m-b-20 f-s-22">{{item}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				hots:[
					'日结', '直招兼职', '包餐', '健康码救护呜呜呜回', '高新', 'app'
				],
				historys:[
					'日结', '直招兼职', '包餐', '健康码救护呜呜呜回', '高新', 'app'
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	.select-box {
		padding: 10rpx 20rpx;
		color: #666;
		border-radius: 34rpx;
		border: 1rpx solid #ddd;
	}
</style>
