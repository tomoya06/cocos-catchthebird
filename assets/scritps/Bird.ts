const { ccclass, property } = cc._decorator;

@ccclass
export default class BirdControl extends cc.Component {
  hp: number = 1;
  targetPos: cc.Vec2 = null;
  speed: number = 50;

  dieCallback: Function;
  escapeCallback: Function;

  start() {
    // this.fly();
  }

  fly() {
    this.targetPos = cc.v2(Math.random() * 220 - 110, 190);

    if (this.targetPos.x > this.node.x) {
      this.node.scaleX = -1;
    }

    let move = cc.moveTo(
      (this.targetPos.y - this.node.y) / this.speed,
      this.targetPos
    );
    let seq = cc.sequence([
      move,
      cc.callFunc(() => {
        this.escapeCallback?.();
      }),
    ]);

    this.node.runAction(seq);

    this.node.on(cc.Node.EventType.TOUCH_START, () => {
      if (this.hp <= 0) {
        return;
      }

      this.dieCallback?.();
      this.hp -= 1;
      this.node.stopAllActions();

      this.getComponent(cc.Animation).play("die");

      let moveDie = cc.moveTo(
        this.node.y / (this.speed * 2),
        cc.v2(this.node.x, 0)
      );
      let dieSeq = cc.sequence([
        moveDie,
        cc.callFunc(() => {
          this.node.destroy();
        }),
      ]);
      this.node.runAction(dieSeq);
    });
  }

  // update (dt) {}
}
