import {speech} from './tts';
import {sl} from './main';
import {AudioItem} from './menuItem';

import {utils} from './utilities';
import {speak,setup,lang,vo} from './main';

import Timer from './timer';
import {ScrollingText} from './scrollingText';
import {KeyboardInput} from './input.js';
import {KeyEvent} from './keycodes.js';
import {so} from './soundObject';
import {Menu} from './menu';
class Game {
	constructor() {
		this.lives=0;
		this.score=0;
		this.level=0;
		this.playing=false;
		this.lastscore=0;
		this.lastdiff=0;
		this.lastlevel=0;
				this.safe=so.create("g_save");
				}
start(md) {
	this.round=0;
	this.cats=0;
		this.rsc=0;
	this.oldround=0;
	this.csnd=8;
	this.alive=false;
		this.catrev=so.create("g_catreverb");
	this.lives=0;
	this.catsmirk=so.create("g_catsmirk");
this.maxround=3;
this.alive=true;
this.rsc=0;
this.score=0;
this.round=0;
this.playing=true;
this.mode=md;
this.gameLoop();
		}
async speakstats() {
		if (this.score>=0) await speak("yfs");
	if (this.score<0) await speak("nyfs");
		await vo.speakWait(this.score);
	await speak("points");
	}
	async gameLoop() {
		await utils.sleep(16);
		this.cats=1;
		this.round++;
		this.rsc=0;
		if (this.round<=this.maxround) {
			this.alive=true;
		}
		else {
						this.alive=false;
							await this.speakstats();
							setup();
return;
		}
		while(this.alive) {
			await speak("round");
			await vo.speakWait(this.round);
			this.cats=1;
			let opt="";
			while(true) {
				this.cats++;
				if (this.cats<1) this.cats=2;
				this.rcat=utils.randomInt(1,this.cats);
				await speak("total");
				await vo.speakWait(this.cats);
				const items=[];
				for (let i=1;i<=this.cats;i++) {
					items.push(new AudioItem(i,"g_cat_"+utils.randomInt(1,this.csnd)));
				}
				if (this.rsc>0) 				items.push(new AudioItem("esc",sl+"next"));
				let cam=new Menu(sl+"choose",items);
				cam.silent=true;
				opt=await cam.runSync();
				if (opt=="esc") {
this.safe.play();
					await utils.sleep(800);
					await speak("saved");
					await vo.speakWait(this.rsc);
					this.score+=this.rsc;
					await speak("points");
					this.gameLoop();
break;
				}
				else {
					await this.catrev.playSync();					
					let chosencat=Number(opt);
					if (chosencat!=this.rcat) {
						console.log(this.mode);
						if (this.mode==1 || (this.mode==2 && this.lives<=0)) {
let bad=so.create("g_bad"+utils.randomInt(1,2));
bad.play();
await utils.sleep(800);
await speak("curse"+utils.randomInt(1,5));
await this.catsmirk.playSync();
if (this.rsc>0) {
	await speak("lose");
	await vo.speakWait(this.rsc);
	await speak("points");
}
this.rsc=0;
this.alive=false;
this.gameLoop();
break;
						}
						else {
							this.lives--;
							this.cats--;
							let llife=so.create("g_llife");
							llife.play();
							await utils.sleep(1100);
							await speak("lost"+utils.randomInt(1,3));
							await this.catsmirk.playSync();
							await speak("lives");
							await vo.speakWait(this.lives);
							
													}
					}
					else {
						this.rsc+=this.cats*2;
						let good=so.create("g_good"+utils.randomInt(1,4));
good.play();
						this.lives++;
						await utils.sleep(800);
						if (this.cats%4==0) {
							this.maxround++;
						let extend=so.create("g_extend");
						extend.play();
await utils.sleep(350);
						await speak("extend");
						this.rsc+=this.cats*5;
						this.lives+=2;
						}
												await speak("yay"+utils.randomInt(1,5));
						await utils.sleep(utils.randomInt(300,600));
						await speak("toget");
						await vo.speakWait(this.rsc);
					}
				}
			}
			this.alive=false;
			await utils.sleep(5);
		}
	
	}
}
export {Game}