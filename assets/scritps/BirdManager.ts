import BirdControl from "./Bird";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BirdManager extends cc.Component {
  @property(cc.Prefab)
  birdPre: cc.Prefab;

  @property(cc.Label)
  scoreLabel: cc.Label;

  @property(cc.Label)
  finalScoreLable: cc.Label;

  @property(cc.Node)
  gameOverLayout: cc.Node;

  @property(cc.Node)
  gamingLayout: cc.Node;

  time: number = 1;

  speed: number = 50;

  private _score: number = 0;
  public get score(): number {
    return this._score;
  }
  public set score(value: number) {
    this._score = value;
    this.scoreLabel.string = `分数：${this._score}`;
    this.finalScoreLable.string = `${this._score}`;
  }

  start() {
    this.gameOverLayout.active = false;
    this.gamingLayout.active = true;

    this.node.runAction(
      cc.repeatForever(
        cc.sequence([
          cc.callFunc(() => {
            let bird = cc.instantiate(this.birdPre);
            bird.setParent(this.node);

            bird.x = Math.random() * 220 - 110;
            bird.y = this.node.y;

            bird.getComponent(BirdControl).speed = this.speed;
            bird.getComponent(BirdControl).escapeCallback = () => {
              this.node.destroyAllChildren();
              this.node.stopAllActions();

              this.gameOverLayout.active = true;
              this.gamingLayout.active = false;
            };

            bird.getComponent(BirdControl).dieCallback = () => {
              this.score += 100;

              if (this.score % 1000 === 0) {
                this.speed += 20;
              }
            };

            // start flying
            bird.getComponent(BirdControl).fly();
          }),
          cc.delayTime(this.time),
        ])
      )
    );
  }

  gotoHome() {
    cc.director.loadScene("home");
  }
}
