<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow f-s-24 p-l-40">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
				<u-form-item label="自我评价" :required="true" prop="content" :borderBottom="false" ref="content">
					<u--textarea placeholder="请输入自我评价" v-model="userInfo.content" count height="400rpx" maxlength="800"></u--textarea>
				</u-form-item>
			</u--form>
		</view>
		<view class="p-t-b-30 f-s-22 c9 m-b-30">
			注：需填写打<text class="main-color">*</text>号的内容才能保存该模块
		</view>
		<u-button :hairline="false" text="保存" shape="circle" color="#F56718" size="large" @click="submit"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					content: ''
				},
				labelStyle: {
					fontSize: '26rpx',
					color: '#999',
					width: '200rpx',
					marginLeft: '10rpx'
				},
				rules: {
					content: {
						type: 'string',
						min: 10,
						required: true,
						message: '请输入反馈信息',
						trigger: ['change']
					}
				},
			};
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods:{
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
				}).catch(errors => {
					uni.$u.toast('请填写自我评价~')
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
