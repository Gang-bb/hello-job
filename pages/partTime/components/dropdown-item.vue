<template>
	<view>
		<scroll-view scroll-y="true" class="type-box">
			<!-- 类型 -->
			<view v-if="menuType==='type'" class="">
				<view class="p-30">
					<view class="type-item m-b-20" :class="{'active': isAllType}" @click="selectAll()">全部</view>
					<view v-for="(v,i) in newList" :key="i" class="">
						<view class="m-b-10 f-s-28">{{v.title}}</view>
						<view class="type-list m-b-20 row center">
							<view 
								class="type-item m-b-20" 
								v-for="(item,index) in v.children" :key="index" 
								:class="{'active': item.check===true}" 
								@click="select(item, index)">
								{{item.label}}
							</view>
						</view>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn job-button primary" @click="submit()">确定</view>
				</view>
			</view>
			<!-- 区域 -->
			<view v-if="menuType==='area'" class="">
				<view class="p-30">
					<view class="type-item m-b-20" :class="{'active': areaIdx===-1}" @click="selectAllArea()">全南宁</view>
					<view class="type-list m-b-20 row center">
						<view class="type-item m-b-20" 
							v-for="(areaItem,areaIndex) in newList" :key="areaIndex" 
							:class="{'active': areaIdx===areaIndex}" 
							@click="selectArea(areaIndex)">
							{{areaItem.name}}
						</view>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn job-button primary" @click="submitArea()">确定</view>
				</view>
			</view>
			<!-- 排序 -->
			<view v-if="menuType==='sort'" class="">
				<view class="sort-box">
					<view 
						v-for="(sortItem,sortIndex) in newList" :key="sortIndex" 
						class="sort-item p-t-b-30 f-s-26" :class="{'color main': sortIdx===sortIndex}"
						@click.stop="selectSort(sortItem, sortIndex)">
						{{sortItem.label}}
					</view>
				</view>
			</view>
			<!-- 筛选 -->
			<view v-if="menuType==='filter'" class="">
				<view class="p-30">
					<view v-for="(filterItem,filterIndex) in newList" :key="filterIndex" class="">
						<view class="m-b-10 f-s-28">{{filterItem.title}}</view>
						<view class="type-list m-b-20 row center">
							<view class="type-item m-b-20" 
								v-for="(filterItem2,filterIndex2) in filterItem.children" :key="filterIndex2" 
								:class="{'active': filterItem2.check===true}" 
								@click="selectFilter(filterItem, filterItem2, filterIndex2)">
								{{filterItem2.label}}
							</view>
						</view>
					</view>
					<view class="row-between">
						<view class="">只看企业认证</view>
						<u-switch v-model="isQiYe" activeColor="#F56718" size="16" @change="changeQY()"></u-switch>
					</view>
				</view>
				<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
					<view class="type-btn reset-btn job-button normal m-r-20" @click="resetFilter()">重置</view>
					<view class="type-btn submit-btn job-button primary" @click="submitFilter()">确定</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'dropdown-item',
		props:{
			menuType: {
				type: String,
				default: 'type'
			},
			sortIdx: {
				type: Number,
				default: -1
			},
			list: {
				type: Array,
				default: ()=>{
					return []
				}
			}
		},
		data() {
			return {
				newList:[],
				isAllType: true, // 是否选中全部类型
				typeIndex: -1, // 类型选中索引
				areaIdx: -1, // 区域选中索引
				isQiYe: false, // 是否只看企业认证
			};
		},
		watch:{
			list(){
				this.newList = this.list
			}
		},
		created() {
			this.newList = this.list
		},
		methods: {
			moveHandle() {},
			// 选中全部类型
			selectAll(){
				// this.$emit('select-all')
				this.isAllType = true
				if(this.isAllType===true) {
					this.newList.forEach((v=>{
						v.children.forEach((t, i)=>{
							t.check = false
						})
					}))
				}
			},
			// 选中类型
			select(item, index) {
				item.check = !item.check
				this.newList.forEach((v=>{
					v.children.forEach((t, i)=>{
						if( item.label !== t.label ) {
							t.check = false
						}
					})
				}))
				this.$emit('select', {item, index})
			},
			// 选中类型提交
			submit() {
				let selectData = {}
				this.newList.forEach((v=>{
					v.children.forEach(t=>{
						if(t.check === true) {
							selectData = t
						}
					})
				}))
				this.$emit('submit', selectData)
			},
			// 选中全部区域
			selectAllArea(){
				let i = this.areaIdx
				this.areaIdx = i === -1 ? -2 : -1
			},
			// 选中区域
			selectArea(index) {
				let i = this.areaIdx
				this.areaIdx = i===index ? -1 : index
			},
			// 确定区域提交
			submitArea(){
				console.log('确定区域提交');
				const { areaIdx, newList } = this
				let selectData = {}
				selectData = newList[areaIdx]
				this.$emit('submitArea', selectData)
			},
			// 选中排序
			selectSort(item, index) {
				this.$emit('selectSort', {item, index})
			},
			// 选中筛选
			selectFilter(v, item, index) {
				if(v.multiple) { // 多选
					item.check = !item.check
				} else {
					item.check = true
					v.children.forEach((t, i)=>{
						if( item.label !== t.label ) {
							t.check = false
						}
					})
				}
			},
			// 重置筛选
			resetFilter(){
				this.newList.forEach(item=>{
					item.children.forEach((v, i)=>{
						v.check = i===0 ? true : false
					})
				})
			},
			// 确定筛选提交
			submitFilter(){
				this.$emit('submitFilter', this.newList, this.isQiYe)
			},
			// 是否只看企业认证
			changeQY(e){
				console.log('change', e);
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	.type-box {
		min-height: 300rpx;
		max-height: 800rpx;
		overflow-y: auto;
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
			margin-right: 22rpx;
			&.active {
				border: 1rpx solid #F56718;
				color: #F56718;
				background-color: #fdf6ec;
			}
		}
		.type-item:nth-child(4n) {
			margin-right: 0;
		}
		.type-bottom-btn {
			height: 120rpx;
			position: sticky;
			bottom: 0;
			left: 0;
			
			.type-btn {
				font-size: 32rpx;
				height: 76rpx;
				border-radius: 6rpx;
			}
			
			.reset-btn {
				width: 160rpx;
			}
			
			.submit-btn {
				width: 500rpx;
			}
		}
		
	}
	
	.sort-box {
		.sort-item {
			text-align: center;
		}
	}
	
</style>
