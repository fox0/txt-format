import * as wiki from './wikificator';
import Eyo from 'eyo-kernel';

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

export function processText(text: string): string {
    // console.log('processText');

    // python3 autoformat.py --pre |
    text = processTextPre(text);
    // js wikificator.js |
    text = wiki.processText(text);
    // js node_modules/eyo/bin/cli.js --stdin |
    text = safeEyo.restore(text);
    // python3 autoformat.py --post
    text = processTextPost(text);

    return text;
}

function processTextPre(text: string): string {
    // console.log('processTextPre');

    function r(r1: string | RegExp, r2: any) {
        text = text.replace(r1, r2);
    }

	// r(/(\| *Координаты (?:истока|устья) *= *)(\d+(?:\.\d+)?)[,/] ?(\d+(?:\.\d+)?(?=\s))/g, function (s: string, m1: any, m2: any, m3: any) {
	// 	return m1 + (+parseFloat(m2).toFixed(4)) + '/' + (+parseFloat(m3).toFixed(4));
	// });

    // TODO
    return text;
}

function processTextPost(text: string): string {
    // console.log('processTextPost');

    function r(r1: string | RegExp, r2: any) {
        text = text.replace(r1, r2);
    }

    // TODO
    return text;
}
