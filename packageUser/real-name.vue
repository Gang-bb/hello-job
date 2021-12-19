<template>
	<view class="page p-30">
		<view class="b-r-12 bg-fff box-shadow f-s-24 c9 p-40">
			<view class="m-b-20">请上传身份证的正反面</view>
			<view class="row-between">
				<view class="column-center">
					<image src="../static/images/icon/index/search-more.png" mode="aspectFill" class="id-image"></image>
					<text>身份证人像面</text>
				</view>
				<view class="column-center">
					<image src="../static/images/icon/index/search-more.png" mode="aspectFill" class="id-image"></image>
					<text>身份证国徽面</text>
				</view>
			</view>
		</view>
		<view class="b-r-12 bg-fff box-shadow f-s-24 p-40 m-t-20">
			<view class="row-between p-25 b-r-12 bg-F8F8F8">
				<view class="">当前绑定的手机号：<text class="main-color">139****01</text></view>
				<view class="c-blue">更改绑定</view>
			</view>
			<view class="">
				<view class="u-demo-block__content">
					<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
					<u--form labelPosition="top" :model="userInfo" ref="form" :labelStyle="labelStyle">
						<u-form-item label="姓名" prop="name" borderBottom ref="name">
							<u--input v-model="userInfo.name" border="none" placeholder="请输入真实姓名"></u--input>
						</u-form-item>
						<u-form-item label="证件类型" prop="idType" borderBottom @click="showType = true; hideKeyboard()" ref="idType">
							<u--input v-model="userInfo.idType" disabled disabledColor="#ffffff" placeholder="请选择证件类型" border="none"></u--input>
							<u-icon slot="right"name="arrow-right"></u-icon>
						</u-form-item>
						<u-form-item label="证件号码" prop="num" borderBottom ref="num">
							<u--input v-model="userInfo.num" border="none" placeholder="请输入证件号码"></u--input>
						</u-form-item>
					</u--form>
					<view class="row-center p-t-b-30">
						<u-checkbox-group>
							<u-checkbox size="15" activeColor="#F56718" v-model="checked"></u-checkbox>
						</u-checkbox-group>
						<view class="f-s-22">
							同意兼职猫<text class="main-color m-l-10">用户认证协议</text>
						</view>
					</view>
					<u-button text="提交" shape="circle" color="#F56718" size="large" @click="submit"></u-button>
					<u-action-sheet :show="showType" :actions="actions" title="请选择证件类型" description="如果选择保密会报错" @close="showType = false" @select="setType"></u-action-sheet>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				userInfo: {
					name: '',
					idType: '',
					num: ''
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
					name: [{
						type: 'string',
						required: true,
						message: '请输入真实姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "请输入真实姓名",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					idType: {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择证件类型',
						trigger: ['blur', 'change']
					},
					num: {
						type: 'string',
						min: 18,
						required: true,
						message: '请输入证件号码',
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
			setType(e) {
				this.userInfo.idType = e.name
				this.$refs.form.validateField('idType')
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form.validate().then(res => {
					// uni.$u.toast('校验通过')
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
	.id-image {
		width: 290rpx;
		height: 200rpx;
		border-radius: 12rpx;
		border: 1rpx solid red;
		margin-bottom: 10rpx;
	}
	
</style>
