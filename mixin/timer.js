/**
 * @author Hele ccc
 * @description mpv常用业务函数，如倒计时
 * @description npm i dayjs/yarn add dayjs
 */


import dayjs from 'dayjs';

export default class Common {
  /**
   *
   * @param {结束时间} end
   * @param {开始时间（现在时间）} start
   * @param {0天，1小时，2分钟，3秒，4毫秒} index
   */
  static splitTime(end, start, index) {
    const endTime = dayjs(end).add(15, 'minute')
    const startTime = dayjs(start)
    const differ = endTime.diff(startTime, 'millisecond')
    if (differ < 0) return 0
    const differArr = []
    // console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccc');

    differArr[0] = Math.floor(differ / (1000 * 60 * 60 * 24))
    differArr[1] = Math.floor((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    differArr[2] = Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60))
    differArr[3] = Math.floor((differ % (1000 * 60)) / 1000)
    differArr[4] = Math.floor((differ % 1000) / 10)
    // console.log(differArr);
    return differArr[index]
  }
  static splitTime2(end, start, index) {
    const endTime = dayjs(end).add(3, 'day')
    const startTime = dayjs(start)
    const differ = endTime.diff(startTime, 'millisecond')
    if (differ < 0) return 0
    const differArr = []
    // console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccc');

    differArr[0] = Math.floor(differ / (1000 * 60 * 60 * 24))
    differArr[1] = Math.floor((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    differArr[2] = Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60))
    differArr[3] = Math.floor((differ % (1000 * 60)) / 1000)
    differArr[4] = Math.floor((differ % 1000) / 10)
    // console.log(differArr);
    return differArr[index]
  }
  static splitTime3(end, start, index) {
    const endTime = dayjs(end).subtract(3, 'hour')
    const startTime = dayjs(start)
    const differ = endTime.diff(startTime, 'millisecond')
    if (differ < 0) return 0
    const differArr = []
    // console.log('cccccccccccccccccccccccccccccccccccccccccccccccccccccccc');

    differArr[0] = Math.floor(differ / (1000 * 60 * 60 * 24))
    differArr[1] = Math.floor((differ % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    differArr[2] = Math.floor((differ % (1000 * 60 * 60)) / (1000 * 60))
    differArr[3] = Math.floor((differ % (1000 * 60)) / 1000)
    differArr[4] = Math.floor((differ % 1000) / 10)
    // console.log(differArr);
    return differArr[index]
  }
}
