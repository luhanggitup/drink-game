// 记录要抽奖的所有的值
var items = [
  "罚1杯",
  "左1喝",
  "左交杯",
  "罚2杯",
  "右1喝",
  "罚3杯",
  "右2喝",
  "右交杯",
  "左2喝",
  "monica喝",
];
var colors = ["#f26395", "#62efab", "#ef7658", "#ffe868", "#80e3f7", "#d781f9"];
var divItems = document.getElementById("items");
var containerSize = 500; // 容器宽高
var itemSize = 80; // 每一项的宽高
var divPointer = document.querySelector(".pointer");
var btn = document.querySelector(".btn");
/**
 * 产生一个最小值到最大值之间的随机数
 * @param {*} min
 * @param {*} max 取不到
 */
function getRandom(min, max) {
  // Math.random()  0~1
  // Math.random() * (max - min)   0~(max-min)
  // Math.floor(Math.random() * (max - min))     0~(max-min)  不包含小数
  // Math.floor(Math.random() * (max - min))+min   min ~ max 不包含小数
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 根据目前提供的数据，创建相应的元素，放置到页面中
 */
function createItems() {
  var centerPoint = {
    // 中心点坐标
    x: containerSize / 2,
    y: containerSize / 2,
  };
  var r = containerSize / 2 - itemSize / 2; // 排列圆圈的半径
  var pieceRadian = (2 * Math.PI) / items.length; // 每一份偏移的弧度
  for (var i = 0; i < items.length; i++) {
    var div = document.createElement("div"); // 创建一个div
    div.innerText = items[i];
    div.className = "item";
    // 设置元素位置
    // 计算元素偏移的弧度
    var radian = i * pieceRadian;
    var x = Math.sin(radian) * r + centerPoint.x; // 元素的横坐标
    var y = -Math.cos(radian) * r + centerPoint.y; // 元素的纵坐标
    div.style.left = x + "px";
    div.style.top = y + "px";
    // 设置背景颜色
    div.style.background = colors[i % colors.length];

    divItems.appendChild(div);
  }
}

createItems();
var isRolling = false; // 目前是否正在旋转中
var curDegree = 0; // 当前的角度
divPointer.addEventListener("transitionend", function () {
  btn.innerText = "开始";
  // 过渡效果结束后会运行
  isRolling = false;
  // 让角度回归到360度以内 效果完全一样的角度

  var sameDegree = curDegree % 360;
  divPointer.style.transform = "rotate(" + sameDegree + "deg)";
  // 去除过渡效果
  divPointer.style.transition = "none";
});
/**
 * 开始转， 随机
 */
function startRoll() {
  if (isRolling) {
    // 目前正在旋转
    return;
  }
  console.log("开始旋转");
  isRolling = true;
  // 得到一个旋转的角度
  var pieceDegree = 360 / items.length; //每一份的角度
  var index = getRandom(0, items.length); //随机产生一个到达的下标
  var deg = pieceDegree * index;
  var circles = getRandom(5, 12); // 随机产生一个圈数
  deg += circles * 360;
  curDegree = deg; // 记录转动到的目标角度
  divPointer.style.transition = "5s";
  divPointer.style.transform = "rotate(" + deg + "deg)";

  btn.innerText = "...";
}

btn.onclick = function () {
  startRoll();
};
