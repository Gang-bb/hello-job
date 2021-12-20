<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="row-between">
				<view class="f-s-28 color">
					个人头像<text class="main-color">(审核通过)</text>
				</view>
				<view class="row center">
					<image src="../../static/images/icon/index/search-more.png" mode="aspectFill" class="user-avatar">
					</image>
					<u-icon name="arrow-right" size="15" color=""></u-icon>
				</view>
			</view>
			<view class="p-b-30">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="top" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.name" border="none" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="性别" prop="userInfo.sex" borderBottom ref="item1">
						<u-radio-group v-model="sexvalue" placement="row" @change="sexChange">
							<u-radio :customStyle="{margin: ' 0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in sexlist" :key="index" :label="item.name" :name="item.name"
								@change="radioChange">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="教育状态" prop="userInfo.edu" borderBottom ref="item1">
						<u-radio-group v-model="eduvalue" placement="row" @change="eduChange">
							<u-radio :customStyle="{margin: '0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in edulist" :key="index" :label="item.name" :name="item.name"
								@change="radioChange">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="所在城市" prop="userInfo.city" borderBottom ref="item1"
						@click="cityShow = true; hideKeyboard()">
						<u--input v-model="model1.userInfo.city" disabled disabledColor="#ffffff" placeholder="请选择所在城市"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="出生年月" prop="userInfo.birthday" borderBottom
						@click="showBirthday = true; hideKeyboard()" ref="item1">
						<u--input v-model="model1.userInfo.birthday" disabled disabledColor="#ffffff"
							placeholder="请选择出生年月" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>

					<u-form-item label="最高学历" prop="userInfo.eduGrade" borderBottom
						@click="showEduGrade = true; hideKeyboard()" ref="item1">
						<u--input v-model="model1.userInfo.eduGrade" disabled disabledColor="#ffffff"
							placeholder="请选择最高学历" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<u-action-sheet :show="showEduGrade" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showEduGrade = false" @select="eduGradeSelect">
				</u-action-sheet>
				<u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
					@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
				<u-picker :show="cityShow" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cityShow=false"
					@change="changeHandler"></u-picker>
			</view>
		</view>
		<u-button text="保存" shape="circle" color="#F56718" size="large" @click="submit"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelStyle: {
					fontSize: '26rpx',
					color: '#999',
					width: '200rpx'
				},
				// 基本案列数据
				sexlist: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					}
				],
				sexvalue: '男',
				// 基本案列数据
				edulist: [{
						name: '在读',
						disabled: false
					},
					{
						name: '已毕业',
						disabled: false
					}
				],
				eduvalue: '在读',
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				showBirthday: false,
				model1: {
					userInfo: {
						name: '楼兰',
						sex: '',
						city: '',
						birthday: '',
						edu: '',
						eduGrade: '',
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				showEduGrade: false,
				birthday: Number(new Date()),
				cityShow: false,
				columns: [
					['中国', '美国'],
					['深圳', '厦门', '上海', '拉萨']
				],
				columnData: [
					['深圳', '厦门', '上海', '拉萨'],
					['得州', '华盛顿', '纽约', '阿拉斯加']
				],
				actions: [{
						name: '初中',
					},
					{
						name: '高中',
					},
					{
						name: '本科',
					},
					{
						name: '研究生',
					},
					{
						name: '博士',
					},
				],
				rules: {
					'userInfo.name': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					code: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},
					'userInfo.eduGrade': {
						type: 'string',
						max: 5,
						required: true,
						message: '请选择最高学历',
						trigger: ['blur', 'change']
					},
					radiovalue1: {
						type: 'string',
						min: 1,
						max: 2,
						message: '橙子有毒',
						trigger: ['change']
					},
					checkboxValue1: {
						type: 'array',
						min: 2,
						required: true,
						message: '不能太宅，至少选两项',
						trigger: ['change']
					},
					intro: {
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					},
					hotel: {
						type: 'string',
						min: 2,
						required: true,
						message: '请选择住店时间',
						trigger: ['change']
					},
					'userInfo.birthday': {
						type: 'string',
						required: true,
						message: '请选择生日',
						trigger: ['change']
					},
				},
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			afterRead(event) {
				this.fileList1.push({
					url: event.file,
					status: 'uploading',
					message: '上传中'
				})
			},
			sexChange(n) {
				// console.log('groupChange', n);
			},
			eduChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			navigateBack() {
				uni.navigateBack()
			},
			eduGradeSelect(e) {
				this.model1.userInfo.eduGrade = e.name
				this.$refs.form1.validateField('userInfo.eduGrade')
			},
			change(e) {
				// console.log(e);
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.form1.validateField('userInfo.birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.model1.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.form1.validateField('userInfo.birthday')
			},
			changeHandler(e) {
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					picker.setColumnValues(1, this.columnData[index])
				}
			},
			// 回调参数为包含columnIndex、value、values
			confirm(e) {
				console.log('confirm', e)
				this.cityShow = false
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/variables.scss';

	/deep/.u-form-item__body__left__content {
		&:before {
			content: '*';
			color: $theme-color;
			margin-right: 10rpx;
		}
	}

	/deep/.u-radio-group--row {
		align-items: flex-end;
		justify-content: flex-end;
	}

	.user-avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
</style>
