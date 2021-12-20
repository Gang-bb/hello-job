<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="p-b-30">
				<u--form labelPosition="top" :model="form" ref="form" :labelStyle="labelStyle">
					<u-form-item label="学校" :required="true" prop="shcool" ref="shcool" borderBottom>
						<u--input :disabled="false" v-model="form.shcool" border="none" placeholder="请输入您的学校"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="主修专业" :required="false" prop="major" ref="major" borderBottom>
						<u--input :disabled="false" v-model="form.major" border="none" placeholder="请输入您的主修专业"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="学历" :required="true" prop="edu" ref="edu" borderBottom>
						<u--input :disabled="false" v-model="form.edu" border="none" placeholder="请选择您的学历"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					
					<u-form-item label="入学时间" :required="true" ref="item1"></u-form-item>
					<u-form-item label="学校" :required="true" prop="subSchool" ref="subSchool" borderBottom>
						<u--input :disabled="false" v-model="form.subSchool" border="none" placeholder="请输入您的学校"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="主修专业" :required="false" prop="subMajor" ref="subMajor" borderBottom>
						<u--input :disabled="false" v-model="form.subMajor" border="none" placeholder="请输入您的主修专业"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="学历" :required="true" prop="subEdu" ref="subEdu" borderBottom>
						<u--input :disabled="false" v-model="form.subEdu" border="none" placeholder="请选择您的学历"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="入学时间" :required="true" prop="startTime" borderBottom
						@click="showStart = true; hideKeyboard()" ref="startTime">
						<u--input v-model="form.startTime" disabled disabledColor="#ffffff"
							placeholder="请选择入学时间" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="毕业时间" :required="true" prop="endTime" borderBottom
						@click="showEnd = true; hideKeyboard()" ref="endTime">
						<u--input v-model="form.endTime" disabled disabledColor="#ffffff"
							placeholder="请选择毕业时间" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<!-- 时间选择器 -->
					<u-datetime-picker :show="showStart" mode="date" closeOnClickOverlay
						@confirm="startConfirm" @cancel="startClose" @close="startClose"></u-datetime-picker>
					<u-datetime-picker :show="showEnd" mode="date" closeOnClickOverlay
						@confirm="endConfirm" @cancel="endClose" @close="endClose"></u-datetime-picker>
					
				</u--form>
			</view>
		</view>
		
		<view class="b-r-12 bg-fff box-shadow p-40 m-b-30">
			<view class="p-b-30">
				<u--form labelPosition="top" :model="form" ref="form" :labelStyle="labelStyle">
					<u-form-item label="在校经历" :required="true" prop="content" :borderBottom="false" ref="content">
						<u--textarea :placeholder="placeholder" v-model="form.content" count height="500rpx" maxlength="800"></u--textarea>
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
				form:{
					school:'',
					major:'',
					edu:'',
					subSchool:'',
					subMajor:'',
					subEdu:'',
					startTime:'',
					endTime:'',
					content:''
				},
				placeholder:`请输入你的在校经历如示例:1.大学期间,连续四年获得年纪奖学金一等奖;2.大三下学期,在双单位xx部门实习三个月;获得最佳优秀实习生称号·`,
				labelStyle:{
					fontSize:'26rpx',
					color: '#999',
					width:'200rpx',
					marginLeft: '10rpx'
				},
				showStart: false,
				showEnd: false,
				rules: {
					school: {
						type: 'string',
						required: true,
						message: '请输入您的学校',
						trigger: ['blur', 'change']
					},
					edu: {
						type: 'string',
						required: true,
						message: '请选择您的学历',
						trigger: ['blur', 'change']
					},
					subSchool: {
						type: 'string',
						required: true,
						message: '请输入您的学校',
						trigger: ['blur', 'change']
					},
					subEdu: {
						type: 'string',
						required: true,
						message: '请输入您的学历',
						trigger: ['blur', 'change']
					},
					startTime: {
						type: 'string',
						required: true,
						message: '请输入您的入学时间',
						trigger: ['blur', 'change']
					},
					endTime: {
						type: 'string',
						required: true,
						message: '请输入您的毕业时间',
						trigger: ['blur', 'change']
					},
					content: {
						type: 'string',
						min: 10,
						required: true,
						message: '请输入您的在校经历',
						trigger: ['change']
					}
				},
			};
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			startClose(show) {
				this.showStart = false
				// this.$refs.form.validateField('birthday')
			},
			startConfirm(e, show) {
				this.showStart = false
				// this.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.$refs.form.validateField('birthday')
			},
			endClose() {
				this.showEnd = false
				// this.$refs.form.validateField('birthday')
			},
			endConfirm() {
				this.showEnd = false
				// this.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				// this.$refs.form.validateField('birthday')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submit(){
				console.log('submit--', this.form);
				this.$refs.form.validate().then(res => {
					uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-border {
		border: none;
	}
</style>
