'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import sounds from './sounds';
import { Howl, Howler } from 'howler';


const version = '8.0';

const header = 'text-2xl font-bold mb-1 font-[family-name:var(--font-pp-editorial-new-ultralight)]';
const section = 'flex flex-col gap-4 sm:gap-2';



export default function Home() {
	const [playing, set_playing] = useState<Record<string, boolean>>({});

	const [volume, set_volume] = useState<Record<string, number>>({});

	const [meander_initial_volumes, set_meander_initial_volumes] = useState<Record<string, number>>({});

	const [master_volume, set_master_volume] = useState(0.95);

	const SoundItem = ({
		audio_id,
		audio_title,
		volume,
		toggle_audio,
		set_item_volume,
	}: {
		audio_id: string;
		audio_title: string;
		volume: number;
		toggle_audio: (audio_id: string) => void;
		set_item_volume: (audio_id: string, new_volume: number) => void;
	}) => {
		return (
			<div className='flex flex-col sm:flex-row flex gap-4 sm:items-center'>
				<Button
					variant={'glass'}
					className={`w-full sm:w-56 ${is_playing(audio_id) ? 'bg-white/70' : ''}`}
					onClick={() => toggle_audio(audio_id)}
					data-umami-event={`"${audio_title}" ${is_playing(audio_id) ? 'paused' : 'played'}`}>
					{audio_title} {is_playing(audio_id) ? <PauseIcon /> : <PlayIcon />}
				</Button>
				<div
					className={`transition-all ${
						is_playing(audio_id) ? 'w-full sm:w-96 opacity-100  duration-150' : 'w-0 opacity-0 duration-150'
					} mb-4 sm:mb-0  ease-in-out`}>
					<Slider
						value={[volume || 0.75]}
						onValueChange={(v) => {
							set_item_volume(audio_id, v[0]);
						}}
						step={0.01}
						min={0}
						max={1}
						data-umami-event={`"${audio_title}" volume changed`}
					/>
				</div>
			</div>
		);
	};

	const toggle_audio = (audio_id: string) => {


		// Play the sound here
		if (snds[audio_id].playing()) {
			set_playing({ ...playing, [audio_id]: false });
			snds[audio_id].pause();
		} else {

			// if (!volume[audio_id]) manual_set_item_volume(audio_id, 0.5);
			set_playing({ ...playing, [audio_id]: true });
			snds[audio_id].play();

			
		}
	};

	const manual_set_item_volume = (audio_id: string, new_volume: number) => {
		set_meander_initial_volumes({ ...meander_initial_volumes, [audio_id]: new_volume });
		set_item_volume(audio_id, new_volume);
	};

	const set_item_volume = (audio_id: string, new_volume: number) => {
		set_volume({ ...volume, [audio_id]: new_volume });

		snds[audio_id].volume(new_volume);
	};


	const pause_all = () => {
		const tmp_playing: Record<string, boolean> = {};
		Object.keys(snds).forEach((audio_id) => {
			snds[audio_id]?.pause();
			tmp_playing[audio_id] = false;
		});

		set_playing(tmp_playing);
	};

	const is_playing = (audio_id: string) => {
		return playing[audio_id] || false;
	};
	


	const [snds, setSnds] = useState<Record<string, Howl>>({});

	useEffect(() => {
		const temp_snds: Record<string, Howl> = {};

		for (const category of sounds) {
			for (const sound of category.sounds) {
				temp_snds[sound.audio_id] = new Howl({
					src: [`${sound.audio_id}.ogg`, `${sound.audio_id}.mp3`],
					loop: true,
					volume: 0.5,
					html5: true,
					onloaderror: (e, id) => {
						console.log(`Failed to load ${sound.audio_id} ${e} ${id}`);
					},
					onplayerror: (e) => {
						console.log(`Failed to play ${sound.audio_id} ${e}`);
					}
				});

				set_playing({ ...playing, [sound.audio_id]: false });
				temp_snds[sound.audio_id].pause();
			}
		}

		setSnds(temp_snds);
	}, [sounds]);



	return (
		<div className='grid grid-rows-[1fr_20px]  min-h-screen p-8 pt-15 pb-10 gap-12 sm:p-20 sm:pb-10 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col '>
				<h1 className='sm:text-6xl text-3xl font-bold font-[family-name:var(--font-pp-editorial-new-ultralight)]'>
					sounds.gabech.com
				</h1>
				<p className='sm:mt-1 mt-2 text-lg sm:text-2xl'>Background music for your life</p>

				{/* Master volume */}
				<div className='mt-4 flex flex-col gap-2 w-full sm:w-96 bg-white/40 hover:bg-white/[0.63] hover:shadow-lg shadow-md backdrop-blur-sm border border-black/30 rounded-md p-4 pt-3 active:shadow-md transition-all duration-150 ease-in-out'>
					<p className='text-sm font-[400] mt-0'>Master volume</p>
					<Slider
						value={[master_volume]}
						onValueChange={(v) => {
							set_master_volume(v[0]);
							Howler.volume(v[0]);
						}}
						step={0.01}
						min={0}
						max={1}
						data-umami-event='Changed master volume'
					/>
				</div>
					
				{/* Pause all */}
				<div className='mt-4 flex gap-4'>
					<Button
						className='w-full sm:w-36'
						variant={'glass'}
						onClick={pause_all}
						data-umami-event='Paused all sounds'>
						Pause all
					</Button>
				</div>

				{/* Sounds */}
				{sounds.map((category) => {
					return (
						<div key={category.name} className='mt-8 flex flex-col'>
							<p className={header}>{category.name}</p>
							<div className={section}>
								{category.sounds.map((sound) => {
									return (
										<SoundItem
											key={sound.audio_id}
											audio_id={sound.audio_id}
											audio_title={sound.name}
											volume={volume[sound.audio_id]}
											toggle_audio={toggle_audio}
											set_item_volume={manual_set_item_volume}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</main>
			<footer className='flex flex-row gap-4 text-sm mt-6 sm:mt-0 items-center justify-center sm:items-start sm:justify-start'>
				<p className='text-sm'>
					Made by{' '}
					<a
						href='https://gabrielchantayan.com'
						target='_blank'
						className=' underline underline-offset-2 hover:underline-offset-4 transition-all duration-250 ease-in-out'
						data-umami-event='Clicked portfolio link'>
						Gabe Chantayan
					</a>
					{' with ❤️'}
				</p>
				<p className='font-bold'>•</p>
				<a
					href='https://github.com/gabrielchantayan/sons/blob/main/CHANGELOG.MD'
					target='_blank'
					className=' underline underline-offset-2 hover:underline-offset-4 transition-all duration-250 ease-in-out'
					data-umami-event='Viewed changelog'>
					Changelog {`(v${version})`}
				</a>
			</footer>
		</div>
	);
}
