const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
  start() {}

  startGame() {
    cc.director.loadScene("game");
  }

  // update (dt) {}
}
