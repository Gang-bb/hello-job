<template>
	<view>
		<movable-area class="movableArea">
			<movable-view :x="x" :y="y" direction="all" class="movableView" @change="onChange">
        <slot>
          <view class="drag-button-box" @click="backHome">
						<u-icon name="home" size="50" color="#F56718"></u-icon>
            <!-- <image :src="icon" mode="aspectFit"></image>返回 -->
          </view>
        </slot>
      </movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		name:"drag-button",
    props: {
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },
    },
		data() {
			return {
				scale: 2,
				old: {
					x: 0,
					y: 0,
					scale: 2
				}
			};
		},
    methods: {
      onChange: function(e) {
      	this.old.x = e.detail.x
      	this.old.y = e.detail.y
      },
      backHome(){
        uni.redirectTo({
          url:'/pages/index/index'
        })
      }
    }
	}
</script>

<style lang="scss" scoped>
  // 悬浮按钮
  /* uni-movable-view {
  	display: inline-block;
  	width: 10px;
  	height: 10px;
  	top: 18%;
  	left: -38rpx;
  	position: absolute;
  	cursor: grab;
  } */

  .movableArea {
  	z-index: 999;
  	position: fixed;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	pointer-events: none; //设置area元素不可点击，则事件便会下移至页面下层元素

  }

  .movableView {
  	pointer-events: auto; //可以点击
  	width: 100rpx;
  	height: 100rpx;

  }

  .drag-button-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    text-align: center;
    background-color: #fff;
    font-size: 20rpx;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #3255EC;
    box-shadow: 0px 0px 20px 0px rgba(170, 170, 170, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    image {
      display: block;
      width: 46rpx;
      height: 46rpx;
      margin-bottom: 7rpx;
    }

  }
  // 分析按钮
  .analyze-btn {
  	// width: 106rpx;
  	// height: 106rpx;
  	// border-radius: 50%;
  	// background-color: #F18D00;

  	display: flex;
  	flex-direction: column;
  	justify-content: center;
  	align-items: center;

  	position: fixed;
  	top: 50%;
  	left: 50%;
  	padding: 20rpx;

  }
  .btn-text {
  	font-size: 24rpx;
  	color: #fff;
  }
  button::after {
  	border: none;
  }
</style>
