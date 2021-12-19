<template>
	<view class="page">
		<view class="row-between p-30 m-b-20 bg-fff">
			<view class="" @click="" style="width: 500rpx;">
					<view class="f-s-28 color m-b-15 job-inline">急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP</view>
					<view class="f-s-22 c9 m-t-30">
						<text>{{place}}</text>
						<text class="m-l-r-30">{{time}}</text>
						<text>{{money}}</text>
					</view>
			</view>
			<view class="main-color f-s-28 m-l-30" @click="">已失效</view>
		</view>
		
		<view class="bg-fff p-30">
			<LineHead title="兼职报名追踪"/>
			<view class="m-t-b-40 p-b-30 bottom-line">
				<u-steps current="3" activeIcon="checkmark-circle" inactiveIcon="checkmark-circle" inactiveColor="#999" activeColor="#F56718">
					<u-steps-item title="成功投递" iconSize="30"></u-steps-item>
					<u-steps-item title="已查看" iconSize="30"></u-steps-item>
					<u-steps-item title="已录用" iconSize="30"></u-steps-item>
					<u-steps-item title="已失效" iconSize="30"></u-steps-item>
					<u-steps-item title="已结算" iconSize="30"></u-steps-item>
				</u-steps>
			</view>
			<view class="">
				<view class="row m-b-40" v-for="(item,index) in list" :key="index">
					<u-badge :isDot="true" :bgColor="index==0?'#F56718':'#ddd'"></u-badge>
					<view class="c9 m-l-20">
						<view class="f-s-24 m-b-10" :class="{'main-color': index==0}">{{item.time}}</view>
						<view class="f-s-26" :class="{'color': index==0}" style="width: 640rpx;">{{item.title}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import LineHead from '@/components/layout/line-head.vue'
	export default {
		components: { LineHead },
		data() {
			return {
				place: '天河',
				time: '2020-05-20',
				money: '200元/天',
				list:[
					{
						time:'2020-04-2109:51:52',
						title:'很遗憾,由于该兼职导致地球磁场消失,为了保护您的安全,猫小乖暂时下架了该兼职,请查看兼职猫中的其他兼职信息。'
					},{
						time:'2020-04-13 05:26:32。',
						title:'恭喜您被录用了,请等待企业联系上班'
					},{
						time:'2020-04-1305:26:13',
						title:'企业已阅读您的简历,离成功又近了一步啦~'
					},{
						time:'2020-04-1303:51:10',
						title:'您已经成功投递,请等待企业录用。'
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-badge {
		margin-top: 10rpx;
	}
</style>
