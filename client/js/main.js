export var gameID = "bombercats";
import { LanguageSelector } from './languageSelector'
export var lang = 2;
import { AudioItem } from './menuItem';
import { Menu } from './menu';
import { so } from './soundObject';
import { speech } from './tts';
import { NumberSpeaker } from './numberSpeaker';
import { Game } from './game';
export var version = "1.0";
export var version2 = "";


export var ttsVoice;
export var ttsRate = 1;
import $ from 'jquery';
export var sl;
document.addEventListener('DOMContentLoaded', () => {
	document.getElementById("app").focus();
	let langs = new LanguageSelector("langSelect", (result) => {
		lang = result;
		sl = "speaker_" + lang + "_"
		vo.prepend = "speaker_" + lang + "_num_";
		vo.and = false;
		if (lang == 2) vo.and = true;
		setup()
	})
})

export async function speak(what) {
	let snd = so.create(sl + what);
	await snd.playSync();
	snd.destroy();
}
export var vo = new NumberSpeaker();
vo.prepend = "speaker_" + lang + "_num_";
vo.and = false;
if (lang == 2) vo.and = true;
export async function setup() {
	//the below is an example of a new version notifier. The version2 variable can be used and compared inside a menu or wherever, and would contain the new version of your game based on what your server returns.
	let prom = new Promise((resolve, reject) => {
		try {
			fetch('http://oriolgomez.com/versions.php?gameVersionRequest=' + gameID)
				.then(event => event.text()) //convert http response into text
				.then(data => {
					version2 = data;
					resolve(data); //resolve promise let go.
				});
		} catch {
			console.log("can't get version.");
		}
	});
	console.log("Success!");
	let items = [];
	items.push(new AudioItem("s", sl + "menu_startgame"));
	items.push(new AudioItem("a", sl + "menu_startcoward"));
	let music = so.create("menu_music");
	music.loop = true;
	music.volume = 0.5;
	music.play();

	let mainMenu = new Menu(sl + "menu_intro", items);
	let o = await mainMenu.runSync();
	await music.fade(800);
	music.destroy();
	if (o == "s") {
		startGame(1);
	}
	if (o == "a") {
		startGame(2);
	}
}
function startGame(md) {
	let game = new Game();
	game.start(md);
}
