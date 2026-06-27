import { Howl, Howler } from 'howler';

let bleepSound;
let synthSound;

export const initAudio = () => {
    // Note: Provide actual audio files in the public/audio/ directory 
    // for this to work correctly when the site is fully built.
    bleepSound = new Howl({
        src: ['/audio/bleep.mp3', '/audio/bleep.wav'],
        volume: 0.5,
    });

    synthSound = new Howl({
        src: ['/audio/synth-bg.mp3', '/audio/synth-bg.wav'],
        volume: 0.3,
        loop: true,
    });
};

export const playBleep = () => {
    if (bleepSound && Howler.mute() === false) {
        bleepSound.play();
    }
};

export const playSynth = () => {
    if (synthSound && !synthSound.playing() && Howler.mute() === false) {
        synthSound.play();
    }
};

export const stopSynth = () => {
    if (synthSound) {
        synthSound.stop();
    }
};

export const setMute = (isMuted) => {
    Howler.mute(isMuted);
    if (!isMuted && synthSound && !synthSound.playing()) {
        // Automatically start or restart the background synth if unmuted
        synthSound.play();
    }
};

export const toggleMute = () => {
    const isMuted = Howler.mute();
    setMute(!isMuted);
    return !isMuted;
};
