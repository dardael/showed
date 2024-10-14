'use client';
import { Button, IconButton } from '@chakra-ui/react';
import { useState } from 'react';
import { GiSoundOff, GiSoundOn } from 'react-icons/gi';
import { getFile } from 'showed/controllers/image/imageController';

export function SoundPlayer({ soundId }: { soundId: string }) {
    const [mustPlaySound, setMustPlaySound] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    async function handleSound() {
        const mustPlay = !mustPlaySound;
        let currentAudio = audio;
        if (mustPlay && soundId && !audio) {
            const sound = (await getFile(soundId))?.filepath.replace(
                './public',
                ''
            );
            currentAudio = new Audio(sound);
            setAudio(currentAudio);
        }
        setMustPlaySound(mustPlay);
        if (!currentAudio) {
            return;
        }
        if (mustPlay) {
            currentAudio.play();
        } else {
            currentAudio.pause();
        }
    }
    return (
        <>
            {soundId && (
                <IconButton
                    isRound
                    aria-label='Lancer musique'
                    icon={mustPlaySound ? <GiSoundOn /> : <GiSoundOff />}
                    onClick={handleSound}
                    position={'absolute'}
                    bottom={'5px'}
                    right={'20px'}
                />
            )}
        </>
    );
}
