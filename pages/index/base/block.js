class Block{
  constructor(){
    this.row = 16;
    this.col = 16;
  } 
  drawRect(ctx){
    //背景
    ctx.setFillStyle('#fff');
    ctx.fillRect(0,0,500,650);
    //标题
    ctx.setFillStyle('#000');
    ctx.font = '30px Arial';
    ctx.strokeText('一个五子棋', 140, 60)
    //棋盘
    for(let i=0;i < this.row;i++){
          ctx.beginPath();
          ctx.setLineWidth(1)
          ctx.moveTo(25 * i + 20 , 100);
          ctx.lineTo(25 * i + 20 , 475); 
          ctx.closePath();
          ctx.setStrokeStyle('#666');
          ctx.stroke();
          ctx.beginPath();
          ctx.setLineWidth(1)
          ctx.moveTo(20 , 25 * i + 100);
          ctx.lineTo(395, 25 * i + 100);
          ctx.closePath();
          ctx.setStrokeStyle('#666');
          ctx.stroke();
    }
  }
}
export default Block;