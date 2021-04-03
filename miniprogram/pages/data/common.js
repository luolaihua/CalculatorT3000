var commonData = {
    "score": [100, 95, 90, 85, 80, 78, 76, 74, 72, 70, 68, 66, 64, 62, 60, 50, 40, 30, 20, 10],
    "grade": {
        "优秀": [90, "max"],
        "良好": [80, 85],
        "及格": [60, 78],
        "不及格": ["min", 50]
    },
    "lowerIsBetter": false,
    "userInput": true
}

// 定义数据出口  
module.exports = {
    commonData: commonData
}  