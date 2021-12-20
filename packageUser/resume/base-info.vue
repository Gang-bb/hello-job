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
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="姓名" :required="true" prop="name" borderBottom ref="item1">
						<u--input v-model="userInfo.name" border="none" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="性别" :required="true" prop="sex" borderBottom ref="item1">
						<u-radio-group v-model="sexvalue" placement="row" @change="sexChange">
							<u-radio :customStyle="{margin: ' 0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in sexlist" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="所在城市" :required="true" prop="city" borderBottom ref="item1"
						@click="cityShow = true; hideKeyboard()">
						<u--input v-model="userInfo.city" disabled disabledColor="#ffffff" placeholder="请选择所在城市"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="出生年月" :required="true" prop="birthday" borderBottom
						@click="showBirthday = true; hideKeyboard()" ref="item1">
						<u--input v-model="userInfo.birthday" disabled disabledColor="#ffffff"
							placeholder="请选择出生年月" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="身高" :required="false" prop="height" borderBottom ref="item1">
						<u--input v-model="userInfo.height" border="none" placeholder="请输入您的身高"></u--input>
						<text slot="right">CM</text>
					</u-form-item>
				</u--form>
				<u--form labelPosition="left" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="教育状态" :required="true" prop="edu" borderBottom ref="item1">
						<u-radio-group v-model="eduvalue" placement="row" @change="eduChange">
							<u-radio :customStyle="{margin: '0 30rpx'}" activeColor="#F56718"
								v-for="(item, index) in edulist" :key="index" :label="item.name" :name="item.name">
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u--form>
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="最高学历" :required="true" prop="eduGrade" borderBottom
						@click="showEduGrade = true; hideKeyboard()" ref="item1">
						<u--input v-model="userInfo.eduGrade" disabled disabledColor="#ffffff"
							placeholder="请选择最高学历" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
				</u--form>
				<!-- <u-calendar :show="showBirthday" @confirm="calendarConfirm" @close="calendarClose" confirmDisabledText="请选择出生年月" color="#F56718"></u-calendar> -->
				<u-action-sheet :show="showEduGrade" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showEduGrade = false" @select="eduGradeSelect">
				</u-action-sheet>
				<u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
					@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
				<u-picker :show="cityShow" ref="uPicker" :columns="columns" @confirm="confirm" @cancel="cityShow=false"
					@change="changeHandler"></u-picker>
			</view>
		</view>
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="p-b-30">
				<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
					<u-form-item label="手机号" :required="true" prop="phone" borderBottom ref="item1">
						<u--input v-model="userInfo.phone" border="none" placeholder="请输入您的手机号"></u--input>
					</u-form-item>
					<u-form-item label="邮箱" prop="email" borderBottom ref="item1">
						<u--input v-model="userInfo.email" border="none" placeholder="请输入您的邮箱"></u--input>
					</u-form-item>
					<u-form-item label="QQ号" prop="qq" borderBottom ref="item1">
						<u--input v-model="userInfo.qq" border="none" placeholder="请输入您的QQ号"></u--input>
					</u-form-item>
					<u-form-item label="微信" prop="wx" borderBottom ref="item1">
						<u--input v-model="userInfo.wx" border="none" placeholder="请输入您的微信号"></u--input>
					</u-form-item>
				</u--form>
			</view>
		</view>
		<view class="p-t-b-30 f-s-22 c9 m-b-50">
			注：需填写打<text class="main-color">*</text>号的内容才能保存该模块
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
					width: '200rpx',
					marginLeft: '10rpx'
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
				showBirthday: false,
				userInfo: {
					name: '',
					sex: '男',
					city: '',
					birthday: '',
					edu: '在读',
					eduGrade: '',
					height: '',
					phone:'',
					email:'',
					wx:''
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
					name: [{
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
					sex: {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
					city: {
						type: 'string',
						max: 30,
						required: true,
						message: '请选择所在城市',
						trigger: ['blur', 'change']
					},
					birthday: {
						type: 'string',
						required: true,
						message: '请选择生日',
						trigger: ['change']
					},
					edu: {
						type: 'string',
						max: 5,
						required: true,
						message: '请选择教育状态',
						trigger: ['blur', 'change']
					},
					eduGrade: {
						type: 'string',
						max: 5,
						required: true,
						message: '请选择最高学历',
						trigger: ['blur', 'change']
					},
					phone: {
						type: 'string',
						max: 11,
						required: true,
						message: '请输入您的手机号',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			// 选择性别
			sexChange(n) {
				console.log('sexChange', n);
				this.userInfo.sex = n
			},
			// 选择教育状态
			eduChange(n) {
				console.log('eduChange', n);
				this.userInfo.edu = n
			},
			// 选择最高学历
			eduGradeSelect(e) {
				this.userInfo.eduGrade = e.name
				this.$refs.form.validateField('eduGrade')
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.form.validateField('birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.form.validateField('birthday')
			},
			calendarConfirm(e) {
				console.log('e', e);
				this.showBirthday = false
				this.userInfo.birthday = `${e[0]} / ${e[e.length - 1]}`
				this.$refs.form.validateField('birthday')
			},
			calendarClose() {
				this.showBirthday = false
				this.$refs.form.validateField('birthday')
			},
			// 选择城市
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
				const {value} = e
				this.cityShow = false
				// let i = 1
				value.forEach((v,i)=>{
					console.log('i', i, value.length);
					let str = (i+1) === value.length ? '' : '-'
					this.userInfo.city += v + str
				})
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				console.log('userInfo--', this.userInfo);
				this.$refs.form.validate().then(res => {
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
