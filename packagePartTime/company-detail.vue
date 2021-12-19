<template>
	<view class="page p-b-30">
		<view class="row-between p-30">
			<view class="row center" @click="navigateTos('/packagePartTime/company-detail')">
				<view class="org-avatar m-r-30">
					<image src="../static/images/icon/index/search-more.png" mode="aspectFill"></image>
				</view>
				<view class="">
					<view class="f-s-28 color m-b-15">广西瑞申电子设备有限公司</view>
					<view class="f-s-24 c9">正在招聘以下岗位</view>
				</view>
			</view>
			<view class="main-color f-s-28" @click="reLaunch('/page/index/index')">返回首页</view>
		</view>
		
		<view class="bg-fff p-30">
			<LineHead title="公司简介" />
			<view class="m-t-30">
				<view class="f-s-26 c6">暂无填写</view>
			</view>
		</view>
		
		<view class="p-30">
			<view class="f-s-26 m-b-20">正在招聘的岗位(1)</view>
			<JobList :list="jobList" type="simple" :listSty="listSty"></JobList>
		</view>
		
		<view class="p-b-30 p-l-r-30">
			<view class="f-s-26 m-b-20">附近3公里内有<text class="main-color">{{jobList.length}}</text>个热门岗位:</view>
			<JobList :list="jobList" type="simple" :listSty="listSty"></JobList>
		</view>
		
	</view>
</template>

<script>
	import LineHead from '@/components/layout/line-head.vue'
	import JobList from '@/components/list/job-list.vue'
	export default {
		components: { LineHead, JobList },
		data() {
			return {
				listSty:{
					'background': '#f2f2f2'
				},
				jobList:[
					{	
						bg: require('@/static/images/icon/index/search-more.png'),
						title: '零基础学编程爬虫|在家日赚500',
						money:'500元/天',
						type: 0
					},{
						bg: require('@/static/images/icon/index/search-more.png'),
						title: '零基础学编程爬虫|在家日赚500',
						money:'500元/天',
						type: 0
					},{
						bg: require('@/static/images/icon/index/search-more.png'),
						title: '零基础学编程爬虫|在家日赚500',
						money:'500元/天',
						type: 1
					},{
						bg: require('@/static/images/icon/index/search-more.png'),
						title: '零基础学编程爬虫|在家日赚500',
						money:'500元/天',
						type: 1
					},
				]
			};
		}
	}
</script>

<style lang="scss" scoped>
	
	.org-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		>image {
			display: block;
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	
</style>
