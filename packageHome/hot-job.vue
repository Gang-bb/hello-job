<template>
	<view class="page hot-job-page p-b-30">
		<view class="top border-box p-30 f-s-26">
			<image src="../static/images/icon/index/search-more.png" mode="aspectFill" class="top-bg"></image>
			<view class="row-between">
				<view class="row-center">
					<u-icon name="map-fill" color="#fff" size="20"></u-icon><text class="m-l-15">南宁</text>
				</view>
				<view class="row-center">
					<u-icon name="share" color="#fff" size="25"></u-icon><text class="m-l-15">分享</text>
				</view>
			</view>
		</view>
		<u-sticky :offset-top="0">
			<view class="tab-block p-b-20">
				<u-tabs 
					:list="tabList" sticky 
					lineWidth="60"
					lineColor="rgba(0,0,0,0.35)"
					:activeStyle="{color: '#fff',fontSize: '28rpx'}"
					:inactiveStyle="{color: '#fff',fontSize: '28rpx'}"
					 @change="(item)=>handler().tabClick(item)">
				</u-tabs>
				<view class="p-l-r-10 m-t-20">
					<u-tabs
						:list="cateList" sticky 
						lineHeight="0"
						lineColor="rgba(0,0,0,0.35)"
						:activeStyle="{padding:'8rpx 30rpx', color: '#fff', borderRadius:'34rpx', marginRight:'0rpx', fontSize:'22rpx', background:'rgba(0,0,0,0.35)'}"
						:inactiveStyle="{padding:'8rpx 30rpx', color: '#606266', borderRadius:'34rpx', marginRight:'0rpx', fontSize:'22rpx',  background:'#fff'}"
						itemStyle="padding:0 10rpx"
						 @change="(item)=>handler().cateClick(item)">
					</u-tabs>
				</view>
				
			</view>
		</u-sticky>
		
		<view class="m-30 border-box">
			<JobList :list="jobList" :showAvatar="true" image_url="'image_url'" :listSty="listStyle"></JobList>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import JobList from '@/components/list/job-list.vue'
	export default {
		components: { JobList },
		data() {
			return {
				tabIndex:0,
				tabList:[
					{
						name: '最新发布',
					}, {
						name: '离我最近'
					}, {
						name: '薪资最高'
					}
				],
				cateIndex:0,
				cateList:[
					{
						name: '全部',
					}, {
						name: '假期兼职'
					}, {
						name: '精选导购'
					}, {
						name: '精选餐饮'
					}, {
						name: '精选导购'
					}
				],
				jobList:[
					{
						image_url: require('@/static/images/icon/index/search-more.png'),
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						image_url: '../../static/images/icon/index/search-more.png',
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},{
						title:'在家线上学习PS做兼职',
						level: 0,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司',
						good: 0,
						place: '江南'
					},{
						title:'在家线上学习PS做兼职在家线上学习PS做兼职在家线上学习PS做兼职',
						level: 1,
						money: '200元/天',
						labels:[
							{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},{
								text: '企业直招',
								blue: 1
							},{
								text: '有提成',
								blue: 0
							},
						],
						company: '上海为课网络科技有限公司上海为课网络科技有限公司',
						good: 1,
						place: '江南江南江南江南江南江南江南江南江南江南'
					},
				],
				listStyle:{'border-radius':'12rpx'},
			};
		},
		computed:{
			...mapState(['sysNav'])
		},
		onLoad(e) {
			if(e.params) {
				let params = JSON.parse(e.params)
				this.init().setNavigationBar(params) // 设置页面标题
			}
		},
		methods:{
			init(){
				return {
					// 设置页面标题
					setNavigationBar:(params)=>{
						const {title} = params
						uni.setNavigationBarTitle({
							title: title ? title : '————'
						})
					},
				}
			},
			handler(){
				return {
						tabClick: (item)=> {
							const { index, name } = item
							this.tabIndex = index
							// console.log(`点击了`,item, this.tabIndex);
						},
						cateClick: (item)=> {
							const { index, name } = item
							this.cateIndex = index
							// console.log(`点击了`,item, this.tabIndex);
						},
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';
	.hot-job-page {
		min-height: 100vh;
		background-color: $blue-color;
	}
	
	.top {
		width: 750rpx;
		height: 400rpx;
		position: relative;
		color: #fff;
		.top-bg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}
	}
	
	.tab-block {
		background-color: $blue-color;
	}
	
</style>
