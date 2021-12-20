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
			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="top" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.name" border="none" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="性别" prop="userInfo.sex" borderBottom ref="item1">
						<u-radio-group v-model="sexvalue" placement="row" @change="groupChange">
							<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in sexlist"
								:key="index" :label="item.name" :name="item.name" @change="radioChange">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="教育状态" prop="userInfo.sex" borderBottom ref="item1">
						<u-radio-group v-model="sexvalue" placement="row" @change="groupChange">
							<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in sexlist"
								:key="index" :label="item.name" :name="item.name" @change="radioChange">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="model1" ref="form1" :labelStyle="labelStyle">
					<u-form-item label="出生年月" prop="userInfo.birthday" borderBottom
						@click="showBirthday = true; hideKeyboard()" ref="item1">
						<u--input v-model="model1.userInfo.birthday" disabled disabledColor="#ffffff"
							placeholder="请选择出生年月" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showSex = false" @select="sexSelect">
				</u-action-sheet>
				<u-calendar :show="showCalendar" mode="range" @confirm="calendarConfirm" @close="calendarClose"
					startText="住店" endText="离店" confirmDisabledText="请选择离店日期" :formatter="formatter"></u-calendar>
				<u-code ref="uCode" @change="codeChange" seconds="20" @start="disabled1 = true"
					@end="disabled1 = false"></u-code>
				<u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
					@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
			</view>
		</view>
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
				// u-radio-group的v-model绑定的值如果设置为某个radio的name，就会被默认选中
				sexvalue: '男',
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				showCalendar: false,
				showBirthday: false,
				model1: {
					userInfo: {
						name: '楼兰',
						sex: '',
						birthday: ''
					},
					radiovalue1: '苹果',
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				showSex: false,
				birthday: Number(new Date()),
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
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
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
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
				radiolist1: [{
						name: '苹果',
						disabled: false
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '毒橙子',
						disabled: false
					}
				],
				checkboxList1: [{
						name: '羽毛球',
						disabled: false
					},
					{
						name: '跑步',
						disabled: false
					},
					{
						name: '爬山',
						disabled: false
					}
				]
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
			groupChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			navigateBack() {
				uni.navigateBack()
			},
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
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
			calendarConfirm(e) {
				this.showCalendar = false
				this.model1.hotel = `${e[0]} / ${e[e.length - 1]}`
				this.$refs.form1.validateField('hotel')
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			calendarClose() {
				this.showCalendar = false
				this.$refs.form1.validateField('hotel')
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

	.user-avatar {
		width: 180rpx;
		height: 180rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
</style>
