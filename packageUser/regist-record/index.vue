<template>
	<view class="page">
		<!-- 顶部tab -->
		<u-sticky :offset-top="0" bgColor="#fff">
			<view class="border-box">
				<u-tabs 
					:list="topTabList" :current="tabIndex" lineWidth="70" lineHeight="4" lineColor="#F56718"
					:activeStyle="{color: '#F56718',fontSize: '28rpx'}"
					:inactiveStyle="{color: '#303133', fontSize: '28rpx'}"
					itemStyle="height: 80rpx;" @change="(item)=>handler().click(item)">
				</u-tabs>
			</view>
		</u-sticky>
		<view class="">
			<u-swipe-action class="p-30">
				<u-swipe-action-item 
					class="box-shadow m-b-30 bg-fff b-r-12" 
					v-for="(item,index) in list" :key="index" :options="options" :name="index"
					@click="(idx)=>handler().itemClick(idx)">
					<view class="row-between" @click="navigateTos('/packageUser/regist-record/detail')">
						<view class="record-status color white f-s-26" :class="{'blue': item.status===1, 'red':item.status===2, 'green': item.status===3}">
							{{item.status===1?'已报名':item.status==2?'已录用':item.status==3?'已到岗':'已失效'}}
						</view>
						<view class="column-between p-20">
							<view class="record-title f-s-30 color">{{item.title}}</view>
							<view class="f-s-22 c9 m-t-30 row-around">
								<text>{{item.place}}</text>
								<text class="m-l-r-30">{{item.time}}</text>
								<text>{{item.money}}</text>
							</view>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				tabIndex: 0, // 当前选中tab
				topTabList:[
					{
						name: '全部'
					}, {
						name: '已报名'
					},{
						name: '已录用'
					}, {
						name: '已到岗'
					}, {
						name: '已结算'
					}
				],
				options: [{text: '删除',style: {backgroundColor: '#f56c6c'}}],
				list:[
					{
						status: 0,
						title: '急招短视频文章评论员│APP急招短视频文章评论员│APP',
						place: '天河',
						time: '2020-05-20',
						money: '200元/天'
					},{
						status: 1,
						title: '急招短视频文章评论员│APP急招短视频文章评论员│APP',
						place: '天河',
						time: '2020-05-20',
						money: '200元/天'
					},{
						status: 2,
						title: '急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP',
						place: '天河',
						time: '2020-05-20',
						money: '200元/天'
					},{
						status: 3,
						title: '急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP急招短视频文章评论员│APP',
						place: '天河天河天河天河',
						time: '2020-05-20',
						money: '20000元/天'
					},
				]
			};
		},
		computed:{
			...mapState(['sysNav'])
		},
		methods:{
			itemClick(index){
				console.log(index);
			},
			handler(){
				return {
					click: (item)=> {
						const { index, name } = item
						this.tabIndex = index
						// console.log(`点击了`,item, this.tabIndex);
					},
					// 右滑按钮点击
					itemClick:(e)=>{
						console.log(e);
						const {index, name} = e // index:右侧按钮索引，name：列表数据索引
					},
					stopPullDownRefresh: ()=> {
						uni.stopPullDownRefresh()
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/mixins.scss';
	@import '@/static/style/variables.scss';
	/deep/.u-swipe-action-item__content {
		background: #fff !important;
	}
	/* #ifdef MP-WEIXIN */
	/deep/.u-swipe-action-item {
		margin: 30rpx;
		border-radius: 12rpx;
		box-shadow: 0 3rpx 4rpx rgba($color: #000000, $alpha: 0.05);
	}
	/* #endif */
	
	.record-status {
		padding: 40rpx;
		background: $primary-color;
		margin: 0 auto; 
		letter-spacing: 8rpx;
		writing-mode: vertical-lr;
		writing-mode: tb-lr;
		
		&.red {
			background: $error-color;
		}
		
		&.blue {
			background: $blue-color;
		}
		&.green {
			background: $success-color;
		}
	}
	.record-title {
		@include ellipsis();
		line-height: 40rpx;
	}
	
</style>
