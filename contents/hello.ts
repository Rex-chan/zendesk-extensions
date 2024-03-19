export {}
const now = new Date();

// 获取当前的小时、分钟和秒
const currentHour = now.getHours();
const currentMinute = now.getMinutes();
const currentSecond = now.getSeconds();

// 输出当前的小时、分钟和秒
console.log(`Current time: ${currentHour}:${currentMinute}:${currentSecond}`);
