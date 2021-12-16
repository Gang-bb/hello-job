<template>
	<view class="page">
		<CommonNav />
		<u-sticky :offset-top="sysNav.top + sysNav.height">
			<view class="">
				<view class="bg-fff p-t-b-20 row f-s-22 top-cate-block">
					<view v-for="(item,index) in topList" :key="index" class="row-center select-box" @click="()=>{handler().openSelect(index)}">
						<text class="m-r-10" :class="{'main-color': current===index }">{{item.label}}</text>
						<u-icon :name="current===index? 'arrow-up' : 'arrow-down'" :color="current===index? '#F56718' : ''" size="9"></u-icon>
					</view>
				</view>
				<!-- 筛选下拉框 -->
				<view v-if="show" class="mask" :style="{'--top':sysNav.top + sysNav.height + 50 }" @click="()=>{handler().closeMask()}" @touchmove.stop.prevent="moveHandle"></view>
				<scroll-view scroll-y="true" v-if="show" class="bg-fff p-30 select-menu-block" :style="{'--top':sysNav.top + sysNav.height + 50 }">
					<view>
						<!-- 类型 -->
						<view v-if="current===0" class="type-box">
							<view class="type-item m-b-20">全部</view>
							<view v-for="(tv,ti) in typeList" :key="ti" class="">
								<view class="m-b-10 f-s-28">{{tv.title}}</view>
								<view class="type-list m-b-20 row-between">
									<view class="type-item m-b-20" :class="{'active': typeIndex===ti2}" v-for="(tv2,ti2) in tv.children" :key="ti2" @click="typeIndex=ti2">{{tv2.label}}</view>
								</view>
							</view>
						</view>
						<!-- 区域 -->
						<view v-if="current===1" class="">
							区域
						</view>
						<!-- 排序 -->
						<view v-if="current===2" class="sort-box">
							<view class="sort-item p-t-b-30">综合排序</view>
							<view class="sort-item p-t-b-30">最新发布</view>
							<view class="sort-item p-t-b-30">离我最近</view>
						</view>
						<!-- 筛选 -->
						<view v-if="current===3" class="">
							筛选
						</view>
					</view>
				</scroll-view>
			</view>
			
		</u-sticky>
		
		<JobList :list="jobList"></JobList>
	</view>
</template>

<script>
	import CommonNav from '@/components/layout/common-nav.vue'
	import JobList from '@/components/list/job-list.vue'
	import {mapState} from 'vuex'
	export default {
		components: { CommonNav, JobList },
		data() {
			return {
				show: false, // 筛选下拉框显隐
				current:-1,
				topList:[
					{
						label: '类型'
					},{
						label: '区域'
					},{
						label: '排序'
					},{
						label: '筛选'
					},
				],
				typeIndex: -1,
				typeList:[
					{
						title: '热门推荐',
						children:[
							{label: '主播'},
							{label: '客服'},
							{label: '手机任务'},
							{label: '厂工'},
							{label: '派单'},
						]
					}
				],
				jobList:[
					{
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
				
			}
		},
		computed:{
			...mapState(['sysNav']),
		},
		onLoad() {

		},
		methods: {
			moveHandle() {},
			handler(){
				return {
					closeMask: ()=>{
						this.show = false
						this.current = -1
					},
					openSelect: (index)=> {
						this.current = index
						if(this.current === index && this.show===true) {
							this.show = false
							this.current = -1
							return
						}
						this.show = !this.show
					},
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.top-cate-block {
		height: 64rpx;
	}
	
	.select-box {
		width: 25%;
	}
	
	.mask {
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: calc(var(--top)*2rpx);
		/* #endif */
		/* #ifdef H5 */
		top: 100rpx;
		/* #endif */
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.3);
		z-index: -1;
		overflow: hidden;
	}
		
	.select-menu-block {
		min-height: 300rpx;
		max-height: 80%;
		border-radius: 0 0 12rpx 12rpx;
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: calc(var(--top)*2rpx);
		/* #endif */
		/* #ifdef H5 */
		top: calc(var(--top)*2rpx);
		/* #endif */
		left: 0;
		right: 0;
		box-sizing: border-box;
		
		.type-box {
			.type-list {
				box-sizing: border-box;
				width: 100%;
				flex-wrap: wrap;
			}
			.type-item {
				width: 22%;
				border: 1rpx solid #e5e5e5;
				background: #eee;
				font-size: 22rpx;
				text-align: center;
				padding: 15rpx 0;
				border-radius: 3rpx;
				&.active {
					border: 1rpx solid #F56718;
					color: #F56718;
					background-color: #fdf6ec;
				}
			}
		}
		
		.sort-box {
			.sort-item {
				text-align: center;
			}
		}
		
	}
	
</style>
