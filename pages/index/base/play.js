export default class Play{
  myScore = [];
  computerScore = [];
  max = 0;
  //机器坐标
  u = 0; 
  v = 0;
  me = true;
  //over
  over = false;
  //winer
  winner = '';
  //棋子位置数组
  pointArr = [];
  //赢法数组
  wins = [];
  //赢法总数
  count = 0;
  myWin = [];
  computerWin = [];
  init(){
    for (let i = 0; i < 16; i++) {
      this.wins[i] = [];
      for (let j = 0; j < 16; j++) {
        this.wins[i][j] = [];
      }
    }
    for (let i = 0; i < 16; i++) {
      this.myScore[i] = [];
      this.computerScore[i] = [];
      for (let j = 0; j < 16; j++) {
        this.myScore[i][j] = 0;
        this.computerScore[i][j] = 0;
      }
    }
    //横线赢法
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 12; j++) {
        for (let k = 0; k < 5; k++) {
          this.wins[i][j + k][this.count] = true;
        }
        this.count++;
      }
    }
    //竖线赢法
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 12; j++) {
        for (let k = 0; k < 5; k++) {
          this.wins[j + k][i][this.count] = true;
        }
        this.count++;
      }
    }
    //正斜线赢法
    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 12; j++) {
        for (let k = 0; k < 5; k++) {
          this.wins[i + k][j + k][this.count] = true;
        }
        this.count++;
      }
    }
    //反斜线赢法
    for (var i = 0; i < 12; i++) {
      for (var j = 0; j < 12; j++) {
        for (var k = 0; k < 5; k++) {
          this.wins[i + k][15 - j - k][this.count] = true;
        }
        this.count++;
      }
    }  
    for (let i = 0; i < this.count; i++) {
      this.myWin[i] = 0;
      this.computerWin[i] = 0;
    }
  }
  play(e, ctx,block){
    let px = e.detail.x - 10;
    let py = e.detail.y - 90;
    let x = Math.floor(px / 25);
    let y = Math.floor(py / 25);
    if (this.over == true){
      this.chessSuccess(ctx);
      if (px >= 130 && px < 250 && py > 438 && py < 468){
        this.restart(ctx,block);
      }
      return;
    } 
    if(x > 15 || y > 15 || px < 0 || py < 0 || this.over==true){
      this.chess(ctx);
      return;
    }
    if (this.pointArr.find(function (value, index,arr){
        if(value.x == x && value.y == y){
          return true;
        }else{
          return false;
        }
    })){
      this.chess(ctx);
      return;
    }else{
      if (this.me) {
        this.pointArr.push({ x, y ,z:1});
      }
    }
    this.chess(ctx);
    if(this.me){
      for (let k = 0; k < this.count; k++) {
        if(this.wins[x][y][k]){
          this.myWin[k]++;
          this.computerWin[k] = 6;
          if(this.myWin[k] == 5){
            this.winner = '你赢了！';
            this.chessSuccess(ctx);
            this.over = true;
          }
        }
      }
      if (this.over == false) {
        this.me = !this.me;
        this.computerAI(ctx);
      }
    }
    if (this.over == false) {
      this.me = !this.me;
    }
  }
  computerAI(ctx) {
    let obj = this.compoter();
    while (obj.x == this.u && obj.y == this.v) {
      obj = this.compoter();
    }
    this.u = obj.x;
    this.v = obj.y;
    if (this.pointArr.find(function (value, index, arr) {
      if (value.x == obj.x && value.y == obj.y) {
        return true;
      } else {
        return false;
      }
    })) { } else {
      this.pointArr.push(obj);
    }
    this.chess(ctx);
    for (let k = 0; k < this.count; k++) {
      if (this.wins[this.u][this.v][k]) {
        this.computerWin[k]++;
        this.myWin[k] = 6;
        if (this.computerWin[k] == 5) {
          this.winner = '电脑赢了！';
          this.chessSuccess(ctx);
          this.over = true;
        }
      }
    }
  }
  compoter(){
    let x = this.u;
    let y = this.v;
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        if (this.pointArr.find(function (value, index, arr) {
          if (value.x == i && value.y == j) {
            return true;
          } else {
            return false;
          }
        })) { } else {
          for (let k = 0; k < this.count; k++) {
            if (this.wins[i][j][k]) {
              if (this.myWin[k] == 1) {
                this.myScore[i][j] += 200;
              } else if (this.myWin[k] == 2) {
                this.myScore[i][j] += 400;
              } else if (this.myWin[k] == 3) {
                this.myScore[i][j] += 2000;
              } else if (this.myWin[k] == 4) {
                this.myScore[i][j] += 10000;
              }

              if (this.computerWin[k] == 1) {
                this.computerScore[i][j] += 220;
              } else if (this.computerWin[k] == 2) {
                this.computerScore[i][j] += 420;
              } else if (this.computerWin[k] == 3) {
                this.computerScore[i][j] += 2100;
              } else if (this.computerWin[k] == 4) {
                this.computerScore[i][j] += 20000;
              }
            }
          }
          if (this.myScore[i][j] > this.max) {
            this.max = this.myScore[i][j];
            x = i;
            y = j;
          } else if (this.myScore[i][j] == this.max) {
            if (this.computerScore[i][j] > this.computerScore[x][y]) {
              x = i;
              y = j;
            }
          }
          if (this.computerScore[i][j] > this.max) {
            this.max = this.computerScore[i][j];
            x = i;
            y = j;
          } else if (this.computerScore[i][j] == this.max) {
            if (this.myScore[i][j] > this.myScore[x][y]) {
              x = i;
              y = j;
            }
          }
        }
      }
    }
    return {x,y,z:0};
  }
  chess(ctx) {
    for (let i = 0; i < this.pointArr.length; i++) {
      if (this.pointArr[i].z == 1) {
        ctx.setFillStyle('#000');
      } else {
        ctx.setFillStyle('#ccc');
      }
      ctx.beginPath();
      ctx.arc(this.pointArr[i].x * 25 + 20, this.pointArr[i].y * 25 + 100, 10, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fill();
    }
  }
  chessSuccess(ctx){
    this.chess(ctx);
    //新游戏
    ctx.strokeRect(140, 528, 120, 30);
    ctx.setFillStyle('#444');
    ctx.font = '20px Arial';
    ctx.fillText(this.winner, 160, 510);
    ctx.fillText('再来一局', 160, 550);
  }
  restart(ctx,block){
    this.max = 0;
    this.u = 0;
    this.v = 0;
    this.me = true;
    this.over = false;
    this.winner = '';
    this.pointArr = [];
    this.myWin = [];
    this.computerWin = [];
    this.init()
    block.drawRect(ctx);
  }
}