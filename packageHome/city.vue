<template>
	<view class="page city-page">
		<u-index-list :indexList="indexList" activeColor="#F56718">
			<view slot="header" class="city-head">
				<view class="head-item">
					<view class="f-s-24 head-text bottom-line">当前定位城市</view>
					<view class="city-list p-30 row center flex-wrap">
						<view class="city-item active row-center m-r-30 m-b-20">南宁</view>
					</view>
				</view>
				<view class="head-item">
					<view class="f-s-24 head-text bottom-line">热门城市</view>
					<view class="city-list p-30 row center flex-wrap">
						<view 
							v-for="(item,index) in hotCitys" :key="index" 
							class="city-item row-center m-r-30 m-b-20" 
							@click="()=>handler().chooseHotCity(index)"
							:class="{'active': hotIndex===index}">
							{{item.name}}
						</view>
					</view>
				</view>
			</view>
			<template v-for="(item, index) in itemArr">
				<!-- #ifdef APP-NVUE -->
				<u-index-anchor :text="indexList[index]" :key="index"></u-index-anchor>
				<!-- #endif -->
				<u-index-item :key="index">
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="indexList[index]"></u-index-anchor>
					<!-- #endif -->
					<view class="city-list p-30 row center flex-wrap">
						<view 
							v-for="(item1, index1) in item" :key="index1" 
							class="city-item row-center m-r-30 m-b-20" 
							@click="()=>handler().chooseCity(item1, index1)"
							:class="{'active': item1.check===true}">
							{{item1.name}}
						</view>
					</view>
				</u-index-item>
			</template>
		</u-index-list>
	</view>
	
</template>

<script>
	// 索引列表
	/* const indexList = () => {
		const indexList = []
		const charCodeOfA = 'A'.charCodeAt(0)
		// indexList.push("↑")
		// indexList.push("☆")
		for (let i = 0; i < 26; i++) {
			indexList.push(String.fromCharCode(charCodeOfA + i))
		}
		// indexList.push('#')
		console.log('indexList--', indexList);
		return indexList
	} */
	export default {
		data() {
			return {
				hotIndex: -1,
				hotCitys:[
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
					{name:'南宁'},
				],
				indexList: ['A', 'B', 'C', 'D'],
				itemArr:[
					[
						{name: 'A1', check: false},
						{name: 'A2', check: false},
						{name: 'A3', check: false},
						{name: 'A4', check: false},
						{name: 'A5', check: false},
						{name: 'A6', check: false},
						{name: 'A7', check: false},
						{name: 'A8', check: false},
						{name: 'A9', check: false},
						{name: 'A10', check: false},
						{name: 'A11', check: false},
						{name: 'A12', check: false},
						{name: 'A13', check: false},
						{name: 'A14', check: false},
					],
					[
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
						{name: 'B1', check: false},
					],
					[
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
						{name: 'C1', check: false},
					],
					[
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
						{name: 'D1', check: false},
					],
					
				]
			}
		},
		onLoad() {
			// console.log(this.itemArr);
		},
		methods:{
			handler(){
				return {
					// 选择热门城市
					chooseHotCity: (index)=> {
						this.hotIndex = index
						this.itemArr.forEach(v=>{
							v.forEach(v2=>{
								v2.check = false
							})
						})
					},
					// 选择城市
					chooseCity: (item, index) => {
						item.check = true
						this.hotIndex = -1
						this.itemArr.forEach(v=>{
							v.forEach(v2=>{
								if(v2.name===item.name) {
									v2.check = true
								} else {
									v2.check = false
								}
							})
							
						})
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';
	
	/deep/.u-index-list__letter__item__index.data-v-7e596c49 {
		font-size: 28rpx;
		text-align: center;
		line-height: 28rpx;
	}
	
	.city-page {
		background: #eee;
	}
	
	.city-head {
		.head-item {
			.head-text {
				padding: 20rpx 30rpx;
				background: rgb(222, 222, 222);
				border-bottom: 1rpx solid #dadbde;
			}
		}
	}
	
	.city-list {
		box-sizing: border-box;
		.city-item {
			width: 200rpx;
			height: 64rpx;
			border-radius: 6rpx;
			border: 1rpx solid #CCC;
			&.active {
				border: 1rpx solid $primary-color;
				color: $primary-color;
			}
		}
		.city-item:nth-child(3n) {
			margin-right: 0;
		}
	}
	
</style>
