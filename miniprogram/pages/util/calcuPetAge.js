
function changeToSuiYue (age) {
    var sui = parseInt(age)
    var yue = Math.round((age - sui) * 12)
    if (sui == 0) {
      return yue + ' 个月'
    } else if (yue == 0) {
      return sui + ' 岁'
    } else {
      return sui + ' 岁 ' + yue + ' 个月'
    }
  }

module.exports = {
  catAge: function (hy) {
    var dy
    if (hy >= 21) {
      dy = (hy - 21) / 4 + 2;
    } else {
      dy = hy / 16;
    }

    var hdy = 0;
    if (hy >= 2) {
      hdy = 21 + ((hy - 2) * 4);
    } else {
      hdy = hy * 16;
    }
    var res = {}
    res.human2PetAge =changeToSuiYue(Math.round(dy * 100) / 100) ;
    res.pet2humanAge =changeToSuiYue(Math.round(hdy * 100) / 100) ;
    return res
  },
  dogAge: function (hy) {
    var dy
    if (hy >= 21) {
      dy = (hy - 21) / 4 + 2;
    } else {
      dy = hy / 10.5;
    }

    var hdy = 0;
    if (hy >= 2) {
      hdy = 21 + ((hy - 2) * 4);
    } else {
      hdy = hy * 10.5;
    }

    var res = {}
    res.human2PetAge =changeToSuiYue(Math.round(dy * 100) / 100) ;
    res.pet2humanAge =changeToSuiYue(Math.round(hdy * 100) / 100) ;
    return res
  },
  longMaoAge: function (age) {
    var human2PetAge=0,pet2humanAge=0
    //求  人===>pet
    if(age < 1){
      human2PetAge=0.1
    }else if(age==1){
      human2PetAge = 0.16
    }else if(age<22){
      human2PetAge = (age/2.25)/12
    }else {
      human2PetAge = (age-18)/3
    }

    //求 pet===>ren
    if(age < 1){
      pet2humanAge=age*12*2.25
    }else if(age==1){
      pet2humanAge = 22
    }else {
      pet2humanAge = age*3+22
    }

    var res = {}
    res.human2PetAge =changeToSuiYue(Math.round(human2PetAge * 100) / 100) ;
    res.pet2humanAge =changeToSuiYue(Math.round(pet2humanAge * 100) / 100) ;
    return res
  },
  cangShuAge: function (month,age) {
    
    var human2PetAge=0,pet2humanAge=0
    //求  人===>pet
  if(age<=3){
      human2PetAge =(age*7).toFixed(2) +' 日'
    }else if(age<=6){
      human2PetAge = '1 个月'
    }else if(age<=9){
      human2PetAge = '1 个月半'
    }else if(age<=12){
      human2PetAge = '2 个月'
    }else if(age<=20){
      human2PetAge = '3 个月'
    }else if(age<=24){
      human2PetAge = '5 个月'
    }else if(age<=28){
      human2PetAge = '6 个月'
    }else if(age<=32){
      human2PetAge = '9 个月'
    }else {
      human2PetAge =changeToSuiYue(Number((((age-36)/4+14) / 12).toFixed(2))) ;  
    }

    //求 pet===>ren
    if(age<1){
      if(month==1){
        pet2humanAge=6
      }else if(month==2){
        pet2humanAge=12
      }else if(month==3){
        pet2humanAge=20
      }else if(month==4){
        pet2humanAge=24
      }else if(month==5){
        pet2humanAge=26
      }else if(month==6){
        pet2humanAge=28
      }else if(month==7){
        pet2humanAge=29
      }else if(month==8){
        pet2humanAge=30
      }else if(month==9){
        pet2humanAge=31
      }else if(month==10){
        pet2humanAge=32
      }else if(month==11){
        pet2humanAge=33
      }
      
    }else if(age <=1.2){
      pet2humanAge = 34
    }else if(age >1.2){
      pet2humanAge = (age*12-14)*4+36
    }

    var res = {}
    res.human2PetAge =human2PetAge 
    res.pet2humanAge =changeToSuiYue(Math.round(pet2humanAge * 100) / 100) ;
    return res
  },
  tuZiAge: function (month,age) {
    
    var human2PetAge=0,pet2humanAge=0
    //求  人===>pet
  if(age<=2){
      human2PetAge ='1 个月'
    }else if(age<=5){
      human2PetAge = '2 个月'
    }else if(age<=7){
      human2PetAge = '3 个月'
    }else if(age<=13){
      human2PetAge = '6 个月'
    }else if(age<=20){
      human2PetAge = '1 岁'
    }else {
      human2PetAge =(parseInt(age) -20)/6+1
      human2PetAge= changeToSuiYue(Math.round(human2PetAge * 100) / 100)
    }

    //求 pet===>ren
    if(age<1){
      if(month==1){
        pet2humanAge=2
      }else if(month==2){
        pet2humanAge=5
      }else if(month==3){
        pet2humanAge=7
      }else if(month==4){
        pet2humanAge=9
      }else if(month==5){
        pet2humanAge=11
      }else if(month==6){
        pet2humanAge=13
      }else if(month==7){
        pet2humanAge=15
      }else if(month==8){
        pet2humanAge=17
      }else if(month==9){
        pet2humanAge=18
      }else if(month==10){
        pet2humanAge=19
      }else if(month==11){
        pet2humanAge=20
      }
      
    }else if(age ==1){
      pet2humanAge = 20
    }else if(age >1){
      pet2humanAge = (age-1)*6+20
    }

    var res = {}
    res.human2PetAge =human2PetAge 
    res.pet2humanAge =changeToSuiYue(Math.round(pet2humanAge * 100) / 100) ;
    return res
  },
}