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
				<DropdownMenu ref="dropdown" @mask="()=>handler().closeMask()">
					<!-- 类型 -->
					<view v-if="current===0">
						<DropdownItem :list.sync="typeList" menuType="type" @submit="(e)=>handler().submitType(e)" />
					</view>
					<!-- 区域 -->
					<view v-if="current===1">
						<DropdownItem menuType="area" :list="areaList" @submitArea="(val)=>handler().submitArea(val)" />
					</view>
					<!-- 排序 -->
					<view v-if="current===2">
						<DropdownItem menuType="sort" :list="sortList" :sortIdx.sync="sortIdx" @selectSort="(val)=>handler().selectSort(val)" />
					</view>
					<!-- 筛选 -->
					<view v-if="current===3">
						<DropdownItem menuType="filter" :list="filterList" @submitFilter="(arr, status)=>handler().submitFilter(arr, status)" />
					</view>
					
				</DropdownMenu>
			</view>
		</u-sticky>
		
		<JobList :list="jobList"></JobList>
	</view>
</template>

<script>
	import CommonNav from '@/components/layout/common-nav.vue'
	import JobList from '@/components/list/job-list.vue'
	import DropdownMenu from './components/dropdown-menu.vue'
	import DropdownItem from './components/dropdown-item.vue'
	import {mapState} from 'vuex'
	export default {
		components: { CommonNav, JobList, DropdownMenu, DropdownItem },
		data() {
			return {
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
				sortList:[ // 排序下拉框数据
					{label: '综合排序'},
					{label: '最新发布'},
					{label: '离我最近'},
				],
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
			handler(){
				return {
					// 遮罩点击事件
					closeMask: ()=>{
						this.handler().closeSelect()
					},
					// 关闭下拉框
					closeSelect:()=>{
						this.$refs.dropdown.show = false
						this.current = -1
					},
					// 点击打开下拉框
					openSelect: (index)=> {
						let idx = this.current
						this.current = index
						this.$refs.dropdown.show = true
						if(idx == index) {
							this.$refs.dropdown.show = false
							this.current = -1
						}
					},
					// 确定类型提交
					submitType:(val)=>{
						console.log('确定类型提交', val);
						this.handler().closeSelect()
					},
					// 选中排序
					selectSort:(val) => {
						console.log('选中排序2', val);
						const {item,index} = val
						this.sortIdx = index
						this.handler().closeSelect()
					},
					// 确定区域提交
					submitArea:(val)=>{
						console.log('确定区域提交', val);
						this.handler().closeSelect()
					},
					// 确定筛选提交
					submitFilter:(arr, status)=>{
						console.log('确定筛选提交', arr, status);
						this.handler().closeSelect()
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
	
</style>
