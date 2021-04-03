var bmidata = require('../data/bmi.js');
var capacitydata = require('../data/capacity.js');
var pull_updata = require('../data/pull_up.js');
var race_1000data = require('../data/race_1000.js');
var race_50data = require('../data/race_50.js');
var race_800data = require('../data/race_800.js');
var sit_and_reachdata = require('../data/sit_and_reach.js');
var sit_updata = require('../data/situp.js');
var standing_long_jumpdata = require('../data/standing_long_jump.js');
var commondata = require('../data/common.js');
var calGrade = 0;
var sex = 0;
var grade = 0;
var height = 0;
var weight = 0;
var capacityVal = 0;
var sit_and_reachVal = 0;
var jumpVal = 0;
var race50Val = 0;
var otherVal = 0; // 引体向上或者仰卧起坐
var race1000Val = 0;
var race800Val = 0;
var BMI = 0;
// -------------------------------------------
var capacityGrade = 0;
var sit_and_reachGrade = 0;
var jumpGradeGrade = 0;
var race50Grade = 0;
var pull_upGrade = 0;
var race1000Grade = 0;
var sit_UpGrade = 0;
var race800Grade = 0;
var BMIGrade = 0;
//-----------------------------------------
var originGrade = []

// 初始化数据
var race_50 = new Array(2);
var sit_and_reach = new Array(2);
var standing_long_jump = new Array(2);
var race_long = new Array(2);
var other = new Array(2);
var capacity = new Array(2);
var bmi = new Array(2);
var bmigradesubsection, bmiscoresubsection;
var race_50weight, sit_and_reachweight, standing_long_jumpweight, race_longweight, otherweight, capacityweight, bmiweight;
var commonscore;
var max = 0,
    bmiunit, bmigrade;

race_50[0] = new Array(4);
race_50[1] = new Array(4);
sit_and_reach[0] = new Array(4);
sit_and_reach[1] = new Array(4);
standing_long_jump[0] = new Array(4);
standing_long_jump[1] = new Array(4);
race_long[0] = new Array(4);
race_long[1] = new Array(4);
other[0] = new Array(4);
other[1] = new Array(4);
capacity[0] = new Array(4);
capacity[1] = new Array(4);
bmi[0] = new Array(4);
bmi[1] = new Array(4);



for (var i = race_50data.race_50Data["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    race_50[1][i] = race_50data.race_50Data["performance"]["female"]["university"][i];
}
for (var i = race_50data.race_50Data["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    race_50[0][i] = race_50data.race_50Data["performance"]["male"]["university"][i];
}
race_50weight = race_50data.race_50Data["weight"];


for (var i = sit_and_reachdata.sit_and_reachData["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    sit_and_reach[1][i] = sit_and_reachdata.sit_and_reachData["performance"]["female"]["university"][i];
}
for (var i = sit_and_reachdata.sit_and_reachData["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    sit_and_reach[0][i] = sit_and_reachdata.sit_and_reachData["performance"]["male"]["university"][i];
}
sit_and_reachweight = sit_and_reachdata.sit_and_reachData["weight"];

for (var i = standing_long_jumpdata.standing_long_jumpData["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    standing_long_jump[1][i] = standing_long_jumpdata.standing_long_jumpData["performance"]["female"]["university"][i];
}
for (var i = standing_long_jumpdata.standing_long_jumpData["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    standing_long_jump[0][i] = standing_long_jumpdata.standing_long_jumpData["performance"]["male"]["university"][i];
}
standing_long_jumpweight = standing_long_jumpdata.standing_long_jumpData["weight"];


for (var i = race_800data.race_800Data["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    race_long[1][i] = race_800data.race_800Data["performance"]["female"]["university"][i];
}
for (var i = race_1000data.race_1000Data["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    race_long[0][i] = race_1000data.race_1000Data["performance"]["male"]["university"][i];
}
race_longweight = race_1000data.race_1000Data["weight"];


for (var i = sit_updata.sit_upData["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    other[1][i] = sit_updata.sit_upData["performance"]["female"]["university"][i];
}
for (var i = pull_updata.pull_upData["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    other[0][i] = pull_updata.pull_upData["performance"]["male"]["university"][i];
}
otherweight = pull_updata.pull_upData["weight"];


for (var i = capacitydata.capacityData["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    capacity[1][i] = capacitydata.capacityData["performance"]["female"]["university"][i];
}
for (var i = capacitydata.capacityData["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    capacity[0][i] = capacitydata.capacityData["performance"]["male"]["university"][i];
}
capacityweight = capacitydata.capacityData["weight"];


for (var i = bmidata.bmiData["performance"]["female"]["university"].length - 1; i >= 0; i--) {
    bmi[1][i] = bmidata.bmiData["performance"]["female"]["university"][i];
}
for (var i = bmidata.bmiData["performance"]["male"]["university"].length - 1; i >= 0; i--) {
    bmi[0][i] = bmidata.bmiData["performance"]["male"]["university"][i];
}
bmiscoresubsection = bmidata.bmiData["score"];
bmigradesubsection = bmidata.bmiData["grade"];
bmiweight = bmidata.bmiData["weight"];
commonscore = commondata.commonData["score"];




// constructor
function cal(sex, grade, heightIn, weightIn, capacityIn, sit_reach,
    jump, race50, alterVar1, alterVar2) {
    this.sex = sex;
    this.grade = grade;
    this.height = heightIn;
    this.weight = weightIn;
    this.capacityVal = capacityIn;
    this.sit_and_reachVal = sit_reach;
    this.jumpVal = jump;
    this.race50Val = race50;
    this.longRaceVal = alterVar2;
    this.otherVal = alterVar1;

    // 计算成绩
    this.getCalGrade = function () {
        console.log(race_50);
        console.log(sit_and_reach);
        console.log(standing_long_jump);
        console.log(capacity);
        console.log(bmi);
        console.log('输入数据：');
        console.log("性别--------" + this.sex);
        console.log("50m-----" + this.race50Val);
        console.log("年级-------" + this.grade);
        console.log("坐立前去-------" + this.sit_and_reachVal);
        console.log("跳远-------" + this.jumpVal);
        console.log("长跑----------" + this.longRaceVal);
        console.log("肺活量----------" + this.capacityVal);
        console.log("身高----------------" + this.height);
        console.log("体重----------------" + this.weight);
        console.log("引体向上/仰卧起坐-----" + this.otherVal);
        var max = 0;
        // 计算50m
        for (var i = 0; i <= race_50[this.sex][this.grade].length - 2; i++) {
            if (parseFloat(this.race50Val) == 0) {
                break;
            }
            if (parseFloat(this.race50Val) > parseFloat(race_50[this.sex][this.grade][i]) && parseFloat(this.race50Val) <= parseFloat(race_50[this.sex][this.grade][i + 1])) {
                max += parseFloat(commonscore[i + 1]) * parseFloat(race_50weight);
                console.log("50m" + parseFloat(commonscore[i + 1]) * parseFloat(race_50weight));
                console.log("未加权分数：" + parseFloat(commonscore[i + 1]));
                originGrade.push(parseFloat(commonscore[i + 1]))
                break;
            } else if (parseFloat(this.race50Val) <= race_50[this.sex][this.grade][0]) {
                max += parseFloat(commonscore[0]) * parseFloat(race_50weight);
                console.log("50m" + parseFloat(commonscore[0]) * parseFloat(race_50weight));
                console.log("50m未加权分数：" + parseFloat(commonscore[0]));
                originGrade.push(parseFloat(commonscore[0]))
                break;
            } else if (parseFloat(this.race50Val) > race_50[this.sex][this.grade][race_50[this.sex][this.grade].length - 1]) {
                console.log("50m" + 0);
                originGrade.push(0)
                break;
            }
        }
        //console.log("max:" + max);

        for (var i = 0; i <= sit_and_reach[this.sex][this.grade].length - 2; i++) {
            if (parseFloat(this.sit_and_reachVal) == 0) {
                break;
            }
            if (parseFloat(this.sit_and_reachVal) < parseFloat(sit_and_reach[this.sex][this.grade][i]) && parseFloat(this.sit_and_reachVal) >= parseFloat(sit_and_reach[this.sex][this.grade][i + 1])) {
                max += parseFloat(commonscore[i + 1]) * parseFloat(sit_and_reachweight);
                console.log("坐体前屈" + parseFloat(commonscore[i + 1]) * parseFloat(sit_and_reachweight));
                console.log("未加权分数：" + parseFloat(commonscore[i + 1]));
                originGrade.push(parseFloat(commonscore[i + 1]))
                break;
            } else if (parseFloat(this.sit_and_reachVal) >= sit_and_reach[this.sex][this.grade][0]) {
                max += parseFloat(commonscore[0]) * parseFloat(sit_and_reachweight);
                console.log("坐体前屈" + parseFloat(commonscore[0]) * parseFloat(sit_and_reachweight));
                console.log("未加权分数：" + parseFloat(commonscore[0]));
                originGrade.push(parseFloat(commonscore[0]))
                break;
            } else if (parseFloat(this.sit_and_reachVal) < sit_and_reach[this.sex][this.grade][sit_and_reach[this.sex][this.grade].length - 1]) {
                console.log("坐体前屈" + '0');
                originGrade.push(0)
                break;
            }
        }
        //console.log("max:" + max);

        for (var i = 0; i <= standing_long_jump[this.sex][this.grade].length - 2; i++) {
            if (parseFloat(this.jumpVal) < parseFloat(standing_long_jump[this.sex][this.grade][i]) && parseFloat(this.jumpVal) >= parseFloat(standing_long_jump[this.sex][this.grade][i + 1])) {
                max += parseFloat(commonscore[i]) * parseFloat(standing_long_jumpweight);
                console.log("跳远" + parseFloat(commonscore[i]) * parseFloat(standing_long_jumpweight));
                console.log("未加权分数：" + parseFloat(commonscore[i]));
                originGrade.push(parseFloat(commonscore[i]))
                break;
            } else if (parseFloat(this.jumpVal) >= standing_long_jump[this.sex][this.grade][0]) {
                max += parseFloat(commonscore[0]) * parseFloat(standing_long_jumpweight);
                console.log("跳远" + parseFloat(commonscore[0]) * parseFloat(standing_long_jumpweight));
                console.log("未加权分数：" + parseFloat(commonscore[0]));
                originGrade.push(parseFloat(commonscore[0]))
                break;
            } else if (parseFloat(this.jumpVal) < standing_long_jump[this.sex][this.grade][standing_long_jump[this.sex][this.grade].length - 1]) {
                console.log("跳远" + 0);
                originGrade.push(0)
                break;
            }
        }
        //console.log("max:" + max);

        for (var i = 0; i <= race_long[this.sex][this.grade].length - 2; i++) {
            if (parseFloat(this.longRaceVal) == 0) {
                break;
            }
            if (parseFloat(this.longRaceVal) > parseFloat(race_long[this.sex][this.grade][i]) && parseFloat(this.longRaceVal) <= parseFloat(race_long[this.sex][this.grade][i + 1])) {
                max += parseFloat(commonscore[i + 1]) * parseFloat(race_longweight);
                console.log("长跑" + parseFloat(commonscore[i + 1]) * parseFloat(race_longweight));
                console.log("未加权分数：" + parseFloat(commonscore[i + 1]));
                originGrade.push(parseFloat(commonscore[i + 1]))
                break;
            } else if (parseFloat(this.longRaceVal) <= race_long[this.sex][this.grade][0]) {
                max += parseFloat(commonscore[0]) * parseFloat(race_longweight);
                console.log("长跑" + parseFloat(commonscore[0]) * parseFloat(race_longweight));
                console.log("未加权分数：" + parseFloat(commonscore[0]));
                originGrade.push(parseFloat(commonscore[0]))
                break;
            } else if (parseFloat(this.longRaceVal) > race_long[this.sex][this.grade][race_long[this.sex][this.grade].length - 1]) {
                console.log("长跑" + 0);
                originGrade.push(0)
                break;
            }
        }

        // console.log("max:" + max);
        for (var i = 0; i <= capacity[this.sex][this.grade].length - 2; i++) {
            if ((parseFloat(this.capacityVal) < parseFloat(capacity[this.sex][this.grade][i])) && (parseFloat(this.capacityVal) >= parseFloat(capacity[this.sex][this.grade][i + 1]))) {
                max += parseFloat(commonscore[i + 1]) * parseFloat(capacityweight);
                console.log("肺活量" + parseFloat(commonscore[i + 1]) * parseFloat(capacityweight));
                originGrade.push(parseFloat(commonscore[i + 1]))
                console.log("未加权分数：" + parseFloat(commonscore[i + 1]));
                break;
            } else if (parseFloat(this.capacityVal) >= capacity[this.sex][this.grade][0]) {
                max += parseFloat(commonscore[0]) * parseFloat(capacityweight);
                console.log("肺活量" + parseFloat(commonscore[0]) * parseFloat(capacityweight));
                console.log("未加权分数：" + parseFloat(commonscore[0]));
                originGrade.push(parseFloat(commonscore[0]))
                break;
            } else if (parseFloat(this.capacityVal) < capacity[this.sex][this.grade][capacity[this.sex][this.grade].length - 1]) {
                console.log("肺活量" + 0);
                originGrade.push(0)
                break;
            }
        }

        //console.log("max:" + max);
        if (this.sex == 0) {
            console.log("男");
            for (var i = 0; i <= other[this.sex][this.grade].length - 2; i++) {
                if (parseFloat(this.otherVal) == parseFloat(other[this.sex][this.grade][i])) {
                    max += parseFloat(commonscore[i]) * parseFloat(otherweight);
                    console.log("引体向上/仰卧起坐" + parseFloat(commonscore[i]) * parseFloat(otherweight));
                    originGrade.push(parseFloat(commonscore[i]))
                    console.log("未加权分数：" + parseFloat(commonscore[i]));
                    break;
                } else if (parseFloat(this.otherVal) >= other[this.sex][this.grade][0]) {
                    max += parseFloat(commonscore[0]) * parseFloat(otherweight);
                    console.log("引体向上/仰卧起坐" + parseFloat(commonscore[0]) * parseFloat(otherweight));
                    console.log("未加权分数：" + parseFloat(commonscore[0]));
                    originGrade.push(parseFloat(commonscore[0]))
                    break;
                } else if (parseFloat(this.otherVal) < other[this.sex][this.grade][other[this.sex][this.grade].length - 1]) {
                    console.log("引体向上/仰卧起坐" + 0);
                    originGrade.push(0)
                    break;
                }
            }
        } else {
            console.log("女");
            for (var i = 0; i <= other[this.sex][this.grade].length - 2; i++) {

                if (parseFloat(this.otherVal) <= parseFloat(other[this.sex][this.grade][i]) && parseFloat(this.otherVal) >= parseFloat(other[this.sex][this.grade][i + 1])) {
                    max += parseFloat(commonscore[i]) * parseFloat(otherweight);
                    console.log("引体向上/仰卧起坐" + parseFloat(commonscore[i]) * parseFloat(otherweight));
                    originGrade.push(parseFloat(commonscore[i]))
                    console.log("未加权分数：" + parseFloat(commonscore[i]));
                    break;
                } else if (parseFloat(this.otherVal) >= other[this.sex][this.grade][0]) {
                    max += parseFloat(commonscore[0]) * parseFloat(otherweight);
                    console.log("引体向上/仰卧起坐" + parseFloat(commonscore[0]) * parseFloat(otherweight));
                    console.log("未加权分数：" + parseFloat(commonscore[0]));
                    originGrade.push(parseFloat(commonscore[0]))
                    break;
                } else if (parseFloat(this.otherVal) < other[this.sex][this.grade][other[this.sex][this.grade].length - 1]) {
                    console.log("引体向上/仰卧起坐" + 0);
                    originGrade.push(0)
                    break;
                }
            }
        }
        // BMI指数
        if (this.height == 0) {
            bmiunit = 0;
        } else {
            bmiunit = this.weight / Math.pow(this.height / 100, 2);
        }
        console.log("BMI" + bmiunit);
        for (var i = 0; i <= bmi[this.sex][this.grade].length - 2; i++) {
            if (parseFloat(bmiunit) == 0) {
                break;
            }
            if (parseFloat(bmiunit) >= parseFloat(bmi[this.sex][this.grade][i][0]) && parseFloat(bmiunit) <= parseFloat(bmi[this.sex][this.grade][i][1])) {
                bmigrade = bmiscoresubsection[i];
                max += bmigrade * bmiweight;
                console.log(bmigrade * bmiweight);
                break;
            }
        }
        console.log(max);
        console.log(originGrade + '');
        if (max >= 100) {
            max = 100
        }
        var calGrade = {
            "calGrade": max,
            "bmiunit": bmiunit.toFixed(1),
            'originGrade': originGrade
        };
        return calGrade;
    }
}

module.exports = cal;