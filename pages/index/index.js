import Block from './base/block.js';
import Play from "./base/play.js";
let play = new Play();
play.init();
let context = wx.createCanvasContext('firstCanvas');
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let block = new Block();
    block.drawRect(context);
    context.draw()
  },
  playGame: function (event) {
    let block = new Block();
    block.drawRect(context);
    play.play(event, context, block);
    context.draw();
  }
})