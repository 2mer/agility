import { Howl } from 'howler';

const soundFiles = ['click', 'damage', 'taskComplete', 'tick'] as const;

export const sounds = Object.fromEntries(soundFiles.map(s => [s, new Howl({
	src: 'sounds/' + s + '.wav'
})])) as { [key in typeof soundFiles[number]]: Howl }

