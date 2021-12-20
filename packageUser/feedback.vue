<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow f-s-24 p-l-40 p-r-40 p-t-50 p-b-80 m-t-b-20">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
				<u-form-item label="邮箱" prop="email" borderBottom ref="email">
					<u--input v-model="userInfo.email" border="none" placeholder="请输入您的邮箱"></u--input>
				</u-form-item>
				<u-form-item label="反馈类型" prop="feedbackType" borderBottom @click="showType = true; hideKeyboard()" ref="feedbackType">
					<u--input v-model="userInfo.feedbackType" disabled disabledColor="#ffffff" placeholder="请选择反馈类型" border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="反馈信息" prop="content" borderBottom ref="content">
					<u--textarea
						placeholder="请输入反馈信息"
						v-model="userInfo.content"
						count
						height="250rpx"
					></u--textarea>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showType" :actions="actions" title="请选择反馈类型" description="如果选择保密会报错" @close="showType = false" @select="setType"></u-action-sheet>
		</view>
		
		<view class="p-t-b-30 f-s-22 c9 m-b-30">
			注：需填写打<text class="main-color">*</text>号的内容才能保存该模块
		</view>
		<u-button :hairline="false" text="提交" shape="circle" :color="allCheck===true?'#F56718' : 'rgba(245,103,24,.5)'" size="large" @click="submit"></u-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				allCheck: false, // 全部校验完毕
				userInfo: {
					email: '',
					feedbackType: '',
					content: ''
				},
				labelStyle:{
					fontSize:'26rpx',
					color: '#999',
					width:'200rpx'
				},
				showType: false,
				actions: [{
						name: '居民身份证',
					},
					{
						name: '户口簿',
					},
					{
						name: '保密',
					},
				],
				rules: {
					email: {
						// type: 'string',
						type: 'email',
						required: true,
						message: '请输入您的邮箱',
						trigger: ['blur', 'change']
					},
					feedbackType: {
						type: 'string',
						max: 20,
						required: true,
						message: '请选择证件类型',
						trigger: ['blur', 'change']
					},
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
		watch: {
			'userInfo.email'() {
			  const { email, feedbackType, content } = this.userInfo
			  if(email.length!==0 && feedbackType.length!==0 && content.length!==0 ) {
			  	this.allCheck = true
			  } else {
			  	this.allCheck = false
			  }
			},
			'userInfo.feedbackType'() {
			  const { email, feedbackType, content } = this.userInfo
			  if(email.length!==0 && feedbackType.length!==0 && content.length!==0 ) {
			  	this.allCheck = true
			  } else {
			  	this.allCheck = false
			  }
			},
			'userInfo.content'(){
				const { email, feedbackType, content } = this.userInfo
				if(email.length!==0 && feedbackType.length!==0 && content.length!==0 ) {
					this.allCheck = true
				} else {
					this.allCheck = false
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form.setRules(this.rules)
		},
		methods:{
			setType(e) {
				this.userInfo.feedbackType = e.name
				this.$refs.form.validateField('feedbackType')
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
					this.allCheck = true
				}).catch(errors => {
					uni.$u.toast('请填写认证信息~')
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		}
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
	/deep/.u-border {
		border: none;
	}
</style>
