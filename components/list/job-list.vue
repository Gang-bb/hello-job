<template>
	<view class="job-list bg-fff">
		<view v-if="type==='default'" class="">
			<view class="job-item" v-for="(item, index) in list" :key="index" @click="$emit('click', {item,index})">
				<view class="job-title row-between">
					<view class="job-title-left row center">
						<text class="m-r-10 job-inline">{{item.title}}</text>
						<u-icon v-if="item.level===1" color="#3c9cff" size="15" name="level"></u-icon>
					</view>
					<view class="money color main">{{item.money}}</view>
				</view>
				<!-- 是否企业直招、是否热点招聘、工资结算方式、是否有提成、是否有免费培训、是否包吃、是否包住、是否有交通补贴、 -->
				<view v-if="item.labels && item.labels.length!==0" class="label-block row flex-wrap p-t-b-20">
					<view v-for="(v,i) in item.labels" :key="i" class="blue-tag m-b-10" :class="{'orange': v.blue==1 }">{{v.text}}</view>
					<!-- <view class="blue-tag orange">有提成</view> -->
				</view>
				<view class="company-info">
					<view class="company-name row center">
						<text class="m-r-10 job-inline">{{item.company}}</text>
						<u-icon v-if="item.good===1" color="#3c9cff" size="15" name="level"></u-icon>
					</view>
					<view class="job-inline m-l-30">{{item.place}}</view>
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
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	
	.job-list {
		.job-item {
			box-sizing: border-box;
			padding: 30rpx;
			width: 100%;
			border-bottom: 1rpx solid #f2f2f2;
			.job-title {
				font-size: 30rpx;
				color: #303133;
				font-weight: bold;
				.job-title-left {
					width: 500rpx;
				}
				.money {
					
				}
			}
			
			.label-block {
				.blue-tag {
					background: #3c9cff;
					padding: 4rpx 10rpx;
					border-radius: 3rpx;
					font-size: 24rpx;
					color: #fff;
					margin-right: 10rpx;
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
				.company-name {
					width: 50%;
				}
			}
			
		}
	}	
	
</style>
