export default {
  data() {
    return {
    };
  },
  methods: {
		ui() {
			return {
        showModal: ({ title = '', success, content = '', showCancel = true, cancelColor, cancelText }) => {
          uni.showModal({
          	title,
          	content,
            showCancel,
            cancelColor,
            cancelText,
          	success: (e) => {
          		if (success) {
          			success(e)
          		}
          	},
          })
        },
        /**
         * @param string title 标题
         * @param function success 成功回调
         * @param string content 正文内容
         */
				confirm: ({ title, success, content }) => {
					uni.showModal({
						title,
						content,
						success: (e) => {
							success(e)
						},
					})
				},
        /**
         * @param string title 标题
         * @param function success 成功回调
         * @param string content 正文内容
         */
				alert: ({ title, success, content }) => {
					uni.showModal({
						title,
						content,
						showCancel: false,
						success: (e) => {
							success(e)
						},
					})
				},
        // 轻提示
        toast: ({ title = '', duration = 1500, mask = false, icon = 'none', success = () => {}, fail = () => {}, complete = () => {}, position = '',  } = {}) => {
          uni.showToast({
            title,
            icon,
            mask,
            duration: (Number)(duration),
            success,
            complete,
            fail,
            position,
          })
        },
        // 隐藏请提示
        hideToast: () => {
          uni.hideToast()
        },
        // 加载动画
        loading: ({ title = '', mask = false, success = () => {}, fail = () => {}, complete = () => {}} = {}) => {
          uni.showLoading({
            title,
            mask,
            success,
            fail,
            complete,
          })
        },
        hideLoading: () => {
          uni.hideLoading()
        },
			}
		},
	},
}
