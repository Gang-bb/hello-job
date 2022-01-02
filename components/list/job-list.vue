<template>
	<view class="job-list bg-fff" :style="listStyle">
		<view v-if="type==='default'" class="">
			<view class="job-item" :class="{'row-between job-item-avatar': showAvatar==true }" v-for="(item, index) in list" :key="index" @click="click(item,index)">
				<view v-if="showAvatar">
					<!-- <image src="" mode="aspectFill"></image> -->
					<image :src="item[image_url]" mode="aspectFill" class="job-avatar m-r-20"></image>
				</view>
				<view :style="{width: showAvatar==true? '510rpx': '100%'}">
					<view class="job-title row-between">
						<view class="job-title-left row center">
							<text class="m-r-10 job-inline">{{item.title}}</text>
							<u-icon v-if="item.level===1" color="#3c9cff" size="15" name="level"></u-icon>
						</view>
						<view class="color main">{{item.money}}</view>
					</view>
					<!-- 是否企业直招、是否热点招聘、工资结算方式、是否有提成、是否有免费培训、是否包吃、是否包住、是否有交通补贴、 -->
					<view v-if="item.labels && item.labels.length!==0" class="label-block row flex-wrap p-t-b-20">
						<view v-for="(v,i) in item.labels" :key="i" class="blue-tag m-b-20" :class="{'orange': v.blue==1 }">{{v.text}}</view>
						<!-- <view class="blue-tag orange">有提成</view> -->
					</view>
					<view class="company-info">
						<view class="company-name row center">
							<text class="m-r-10" :class="{'job-inline': !showAvatar}">{{item.company}}</text>
							<u-icon v-if="item.good===1" color="#3c9cff" size="15" name="level"></u-icon>
						</view>
						<view class="job-inline m-l-30 company-place">{{item.place}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="type==='simple'" class="">
			<view v-for="(item,index) in list" :key="index" class="job-item simple-item box-shadow">
				<view class="simple-item__bg">
					<image :src="item.bg" mode="aspectFill"></image>
				</view>
				<view class="color f-s-30">{{item.title}}</view>
				<view class="row-between m-t-20">
					<text class="f-s-24 main-color">{{item.money}}</text>
					<view class="type-btn" :class="{'red': item.type==1}">{{item.type==0? '兼职':'全职'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'jobList',
		props:{
			list: {
				type: Array,
				default:()=>{
					return []
				}
			},
			type: {
				type: String,
				default: 'default'
			},
			showAvatar: {
				type: Boolean,
				default: false
			},
			image_url:{
				type: String,
				default: 'image_url'
			},
			listSty: {
				type:Object,
				default:()=> {
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			listStyle(){
				let styleStr = ''
				Object.keys(this.listSty).forEach(key => {
					styleStr += `${key}:${this.listSty[key]};`
				})
				return styleStr
			},
		},
		methods:{
			click(item,index) {
				this.navigateTos('/packagePartTime/job-detail')
				this.$emit('click', {item,index})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import 'static/style/variables.scss';
	.job-list {
		width: 100%;
		height: 100%;
		.job-item {
			box-sizing: border-box;
			padding: 30rpx;
			width: 100%;
			height: 100%;
			border-bottom: 1rpx solid #f2f2f2;
			.job-title {
				width: 100%;
				height: 100%;
				font-size: 30rpx;
				color: #303133;
				font-weight: bold;
				.job-title-left {
					// width: 500rpx;
					width: 70%;
				}
			}
			
			.label-block {
				width: 100%;
				height: 100%;
				.blue-tag {
					background: #3c9cff;
					padding: 0rpx 4rpx;
					border-radius: 3rpx;
					font-size: 20rpx;
					color: #fff;
					margin-right: 20rpx;
					border: 1rpx solid #3c9cff;
					width: fit-content;
					&.orange {
						border: 1rpx solid #f9ae3d;
						color: #f9ae3d;
						background-color: #fdf6ec;
					}
				}
				
			}
			
			.company-info {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999;
				font-size: 24rpx;
				width: 100%;
				height: 100%;
				.company-name {
					width: 70%;
				}
				.company-place {
					width: 30%;
					text-align: right;
				}
			}
			
			.type-btn {
				background: #fdf6ec;
				color: $primary-color;
				border: 1rpx solid $primary-color;
				padding: 10rpx 15rpx;
				border-radius: 12rpx;
				font-size: 24rpx;
				&.red {
					background: rgba($color: #ec2126, $alpha: .05);
					color: #ec2126;
					border: 1rpx solid #ec2126;
				}
			}
			
		}
		
		// 带头像的列表样式
		.job-item-avatar {
			width: 100%;
			overflow: hidden;
			.job-avatar {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}
		
		.simple-item {
			padding: 20rpx 30rpx;
			border-bottom: none;
			margin-bottom: 20rpx;
			background-color: #fff;
			border-radius: 12rpx;
			position: relative;
			width: 100%;
			height: 100%;
			overflow: hidden;
			&__bg {
				width: 100%;
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
		}
		
	}	
	
</style>
