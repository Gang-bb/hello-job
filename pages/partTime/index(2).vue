<template>
	<view class="page">
		<CommonNav />
		<u-sticky :offset-top="sysNav.top + sysNav.height">
			<view class="">
				<view class="bg-fff p-t-b-20 row f-s-22 top-cate-block">
					<view v-for="(item,index) in topList" :key="index" class="row-center select-box" @click="()=>{handler().openSelect(index)}">
						<text class="m-r-10" :class="{'main-color': current === index }">{{item.label}}</text>
						<u-icon :name="current === index? 'arrow-up' : 'arrow-down'" :color="current === index? '#F56718' : ''" size="9"></u-icon>
					</view>
				</view>
				<!-- 筛选下拉框 -->
				<view v-if="show" class="mask" :style="{'--top':sysNav.top + sysNav.height + 50 }" @click="()=>{handler().closeMask()}" @touchmove.stop.prevent="moveHandle"></view>
				<view scroll-y="true" v-if="show" class="bg-fff select-menu-block" :style="{'--top':sysNav.top + sysNav.height + 50 }">
					<view>
						<!-- 类型 -->
						<view v-if="current===0">
							<scroll-view scroll-y="true" class="type-box">
								<view class="p-30">
									<view class="type-item m-b-20" :class="{'active': isAllType}" @click="()=>{handler().selectAllType()}">全部</view>
									<view v-for="(tv,ti) in typeList" :key="ti" class="">
										<view class="m-b-10 f-s-28">{{tv.title}}</view>
										<view class="type-list m-b-20 row center">
											<view class="type-item m-b-20" v-for="(tv2,ti2) in tv.children" :key="ti2" :class="{'active': tv2.check===true}" @click="()=>{handler().selectType(tv2, ti2)}">{{tv2.label}}</view>
										</view>
									</view>
								</view>
								<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
									<view class="type-btn job-button primary" @click="()=>{handler().submitType()}">确定</view>
								</view>
							</scroll-view>
						</view>
						<!-- 区域 -->
						<view v-if="current===1">
							<scroll-view scroll-y="true" class="type-box">
								<view class="p-30">
									<view class="type-item m-b-20" :class="{'active': areaIdx===-1}" @click="()=>{handler().selectAllArea()}">全南宁</view>
									<view class="type-list m-b-20 row center">
										<view class="type-item m-b-20" 
											v-for="(areaItem,areaIndex) in areaList" :key="areaIndex" 
											:class="{'active': areaIdx===areaIndex}" 
											@click="()=>{handler().selectArea(areaIndex)}">
											{{areaItem.name}}
										</view>
									</view>
								</view>
								<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
									<view class="type-btn job-button primary" @click="()=>{handler().submitArea()}">确定</view>
								</view>
							</scroll-view>
						</view>
						<!-- 排序 -->
						<view v-if="current===2" class="sort-box">
							<view 
								v-for="(sortItem,sortIndex) in sortList" :key="sortIndex" 
								class="sort-item p-t-b-30 f-s-26" :class="{'color main': sortIdx===sortIndex}" 
								@click="()=>{handler().selectSort(sortIndex)}">
								{{sortItem.label}}
							</view>
						</view>
						<!-- 筛选 -->
						<view v-if="current===3">
							<scroll-view scroll-y="true" class="type-box">
								<view class="p-30">
									<view v-for="(filterItem,filterIndex) in filterList" :key="filterIndex" class="">
										<view class="m-b-10 f-s-28">{{filterItem.title}}</view>
										<view class="type-list m-b-20 row center">
											<view class="type-item m-b-20" 
												v-for="(filterItem2,filterIndex2) in filterItem.children" :key="filterIndex2" 
												:class="{'active': filterItem2.check===true}" 
												@click="()=>{handler().selectFilter(filterItem, filterItem2, filterIndex2)}">
												{{filterItem2.label}}
											</view>
										</view>
									</view>
									<view class="row-between">
										<view class="">只看企业认证</view>
										<u-switch v-model="isQiYe" activeColor="#F56718" size="16" @change="(e)=>{handler().changeQY(e)}"></u-switch>
									</view>
								</view>
								<view class="type-bottom-btn bg-fff p-l-r-30 top-shadow row-center">
									<view class="type-btn reset-btn job-button normal m-r-20" @click="()=>{handler().resetFilter()}">重置</view>
									<view class="type-btn submit-btn job-button primary" @click="()=>{handler().submitFilter()}">确定</view>
								</view>
							</scroll-view>
						</view>
					</view>
				</view>
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
				current:-1, // 下拉选中索引
				topList:[ // 下拉框菜单
					{
						label: '类型',
						open: false
					},{
						label: '区域',
						open: false
					},{
						label: '排序',
						open: false
					},{
						label: '筛选',
						open: false
					},
				],
				isAllType: true, // 是否选中全部类型
				typeIndex: -1, // 类型选中索引
				typeList:[ // 类型下拉框数据
					{
						title: '热门推荐',
						children:[
							{label: '主播', check: false},
							{label: '客服', check: false},
							{label: '手机任务', check: false},
							{label: '厂工', check: false},
							{label: '派单', check: false},
						]
					},{
						title: '市场推广',
						children:[
							{label: '网点', check: false},
							{label: '短视频', check: false},
							{label: '电商', check: false},
							{label: '地推', check: false},
							{label: '广告监测', check: false},
							{label: '代理', check: false},
							{label: '促销', check: false},
							{label: '销售导购', check: false},
						]
					},{
						title: '服务行业',
						children:[
							{label: '店员', check: false},
							{label: '厨师', check: false},
							{label: '美容美甲', check: false},
							{label: '送餐员', check: false},
							{label: '服务员', check: false},
						]
					},{
						title: '教育行业',
						children:[
							{label: '助教', check: false},
							{label: '机构教师', check: false},
							{label: '才艺教师', check: false},
							{label: '课程顾问', check: false},
							{label: '线上教师', check: false},
							{label: '家教', check: false},
						]
					},{
						title: '会展演出',
						children:[
							{label: '助教', check: false},
							{label: '机构教师', check: false},
							{label: '才艺教师', check: false},
							{label: '课程顾问', check: false},
							{label: '线上教师', check: false},
							{label: '家教', check: false},
						]
					}
				],
				sortIdx: -1, // 排序选中索引
				sortList:[ // 排序下拉框数据
					{label: '综合排序'},
					{label: '最新发布'},
					{label: '离我最近'},
				],
				// isAllArea: false, // 是否选中全部区域
				areaIdx: -1, // 区域选中索引
				areaList: [ // 区域下拉框数据
					{name:'兴宁'},
					{name:'青秀'},
					{name:'西乡塘'},
					{name:'江南'},
					{name:'良庆'},
					{name:'邕宁'},
					{name:'武鸣县'},
					{name:'隆安县'},
					{name:'马山县'},
					{name:'上林县'},
					{name:'宾阳县'},
					{name:'横县'}
				],
				filterList:[ // 筛选下拉框数据
					{
						title: '性别要求',
						children:[
							{label: '不限', check: true},
							{label: '男', check: false},
							{label: '女', check: false},
						]
					},{
						title: '上班时间（可多选）',
						multiple: true,
						children:[
							{label: '不限', check: true},
							{label: '上午', check: false},
							{label: '下午', check: false},
							{label: '晚上', check: false},
						]
					},{
						title: '开始工作时间',
						children:[
							{label: '不限', check: true},
							{label: '指定', check: false},
						]
					},{
						title: '工作周期',
						children:[
							{label: '不限', check: true},
							{label: '长期兼职', check: false},
							{label: '短期兼职', check: false},
							{label: '周末兼职', check: false},
						]
					}
				],
				isQiYe: false, // 是否只看企业认证
				jobList:[ // 工作列表
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
					// 遮罩点击时间
					closeMask: ()=>{
						this.handler().closeSelect()
					},
					// 关闭下拉框
					closeSelect:()=>{
						this.show = false
						this.current = -1
					},
					// 点击打开下拉框
					openSelect: (index)=> {
						let idx = this.current
						this.current = index
						this.show = true
						if(idx == index) {
							this.show = false
							this.current = -1
						}
					},
					// 选中全部类型
					selectAllType:()=>{
						this.isAllType = !this.isAllType
					},
					// 选中类型
					selectType: (item, index)=> {
						item.check = !item.check
						this.isAllType = item.check==true ? false : true
						this.typeList.forEach((v=>{
							v.children.forEach((t, i)=>{
								if( item.label !== t.label ) {
									t.check = false
								}
							})
						}))
						console.log('选中类型', item, index, this.isAllType, this.typeList);
					},
					// 确定类型提交
					submitType:()=>{
						console.log('确定类型提交');
						this.handler().closeSelect()
					},
					// 选中排序
					selectSort:(index) => {
						let idx = this.sortIdx
						this.sortIdx = index
						if(idx == index) {
							this.sortIdx = -1
						}
						this.handler().closeSelect()
					},
					// 选中全部区域
					selectAllArea:()=>{
						let i = this.areaIdx
						this.areaIdx = i === -1 ? -2 : -1
					},
					// 选中区域
					selectArea: (index)=> {
						let i = this.areaIdx
						this.areaIdx = i===index ? -1 : index
					},
					// 确定区域提交
					submitArea:()=>{
						console.log('确定区域提交');
						this.handler().closeSelect()
					},
					// 选中筛选
					selectFilter: (v, item, index)=> {
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
					resetFilter:()=>{
						this.filterList.forEach(item=>{
							item.children.forEach((v, i)=>{
								v.check = i===0 ? true : false
							})
						})
					},
					// 确定筛选提交
					submitFilter:()=>{
						console.log('确定类型提交');
						this.handler().closeSelect()
					},
					// 是否只看企业认证
					changeQY: (e)=> {
						console.log('change', e);
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
		max-height: 800rpx;
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
		overflow-y: hidden;
		
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
		
	}
	
</style>
