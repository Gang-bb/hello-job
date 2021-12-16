export default {
  data() {
    return {
    };
  },
  methods: {
    /*
     * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 uni.navigateBack 可以返回到原页面。小程序中页面栈最多十层
     * @param url 跳转链接
    */
    navigateTos(url) {
      // console.info(url)
      uni.navigateTo({ url })
    },

    /*
     * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面
     * @param url 跳转链接
    */
    redirectTo(url) {
      uni.redirectTo({ url })
    },

    /*
     * 关闭所有页面，打开到应用内的某个页面
     * @param url 跳转链接
    */
    reLaunch(url) {
      uni.reLaunch({ url })
    },

    /*
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param url 跳转链接
    */
    switchTabs(url) {
      uni.switchTab({ url })
    },

    /*
     * 关闭当前页面，返回上一页面或多级页面。可通过 getCurrentPages 获取当前的页面栈，决定需要返回几层
     * @param delta 返回的页面数
    */
    navigateBack(delta) {
      uni.navigateBack({ delta })
    },

    /*
     * 放大图片
     * @param list 图片列表（没有包含七牛域名的图片链接自动加上）
     * @param index 当前显示图片索引
    */
    openImage(list, index = 0, imgDomain = '') {
      const listNew = []
      list.forEach((item) => {
        listNew.push((imgDomain && item.indexOf(imgDomain) >= 0)? item : (imgDomain + item))
      })

      uni.previewImage({
        current: listNew[index], // 当前显示图片的http链接
        urls: listNew, // 需要预览的图片http链接列表
      })
    },

    /*
     * 拨打电话
     * @param phoneNumber 电话号码
    */
    makePhoneCall(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
      })
    },

    /*
     * 获取时间戳
     * @param date 日期
    */
    getTimestamp(date) {
      const timestamp = new Date(date.replace(/-/g, '/')).getTime();
      // const timestampNow = new Date().getTime();
      // console.log(`timestampNow:${timestampNow}`, `timestamp:${timestamp}`)
      return timestamp
    },

    /*
     * 单位数转两位数
     * @param num 单位数
    */
    getTwoDigits(num) {
      return Number(num) < 10 ? `0${num}` : num
    },

    /*
     * 节流处理（点击提交按钮可用）
     * @param time 毫秒
    */
    throttleAction(time = 1000) {
      const nowTime = new Date().getTime()
      const lastTime = this.lastTimestamp
      console.log(`lastTime:${lastTime}`, `nowTime:${nowTime}`)
      this.lastTimestamp = nowTime
      if (nowTime - lastTime > time) return true
      return false
    },
		
		/*
		 * 节流处理， 
		 * @param time 毫秒
		*/
		throttle(time = 1000) {
		  const nowTime = new Date().getTime()
		  const lastTime = this.lastTimestamp
		  
		  if (nowTime - lastTime > time || lastTime === undefined) {
				this.lastTimestamp = nowTime
				return true
			} else {
				return false
			}
		},

    /*
     * 截取链接参数（扫描二维码时可用）
     * @param name 参数名称
     * @param url1 链接地址
    */
    getQueryString(name, url) {
      //  正则筛选地址链接中的参数
      const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
      // 匹配目标参数
      const result = `&${url.split('?')[1]}`.substr(1).match(reg);
      // 返回参数值
      return result ? decodeURIComponent(result[2]) : null;
    },

    // 判断字符串是否为空|或者仅为空格
    isEmptyString(val) {
      if (!val) return true;
      const nullReg = '^[ ]+$';
      const re = new RegExp(nullReg);
      return re.test(val);
    },

    // 判断对象是否为空
    isEmptyObject(val) {
      return JSON.stringify(val) === '{}'
    },

    // 判断手机号码是否合法
    checkPhone(val) {
      const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      return phoneReg.test(val)
    },

    // 判断身份证号码是否合法
    isIdcard(val) {
      const idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return idcardReg.test(val)
    },

    // 判断邮箱是否合法
    isEmail(val) {
      const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return emailReg.test(val)
    },
    // 复制
    onCopy(data) {
      uni.setClipboardData({
        data,
        success () {
          uni.showToast({
            title: '复制成功', // 提示的内容,
            icon: 'success', // 图标,
            duration: 2000, // 延迟时间,
            mask: true, // 显示透明蒙层，防止触摸穿透,
            success: () => {},
          });
        }
      })
    },
    
    /**
     * 跳转登录
     */
    appToLogin() {
      console.log('跳转登录')
    }
  },
}
