<template>
	<div class="pie">
	  <div class="pie-inner">
	  {{num}}%
	  </div>
	</div>
</template>

<script>
	export default {
		props:{
			percent: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				num: '50%'
			}
		},
		computed: {
		    delay () {
		      return `-${this.num}s`
		    }
		},
		created() {
			this.startAnimate(10, '100%', 1000)
		},
		methods: {
			startAnimate (step, limit, speed) {
			  setTimeout(() => {
			  // num 为百分比
			    if (this.num < limit) {
			      this.num += step
			      this.startAnimate(step, limit, speed)
			    } else {
			      this.num = limit
			    }
			  }, speed)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pie {
	  display: inline-block;
	  position: relative;
	  width: 150px;
	  height: 150px;
	  margin-top: 40px;
	  border-radius: 50%;
	  background: #ccc;
	  background-image: linear-gradient(to right, transparent 50%, #4479FD 0);
	  color: transparent;
	  text-align: center;
	}
	.pie::before {
	  content: '';
	  position: absolute;
	  top: 0; left: 50%;
	  width: 50%; height: 100%;
	  border-radius: 0 100% 100% 0 / 50%;
	  background-color: inherit;
	  transform-origin: left;
	  animation: spin 5s linear, bg 10s step-end;
	}
	@keyframes spin {
	  to { transform: rotate(.5turn); }
	}
	@keyframes bg {
	  50% { background: #4479FD; }
	}   
</style>
