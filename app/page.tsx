'use client';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

const header = 'text-2xl font-bold mb-2';
const section = 'flex flex-col gap-4';

const SoundItem = ({
	audio_id,
	audio_title,
	playing,
	volume,
	toggle_audio,
	set_item_volume,
}: {
	audio_id: string;
	audio_title: string;
	playing: boolean;
	volume: number;
	toggle_audio: (audio_id: string) => void;
	set_item_volume: (audio_id: string, new_volume: number) => void;
}) => {
	return (
		<div className='flex flex-col sm:flex-row flex gap-4 sm:items-center'>
			<Button variant={'secondary'} className='w-full sm:w-56' onClick={() => toggle_audio(audio_id)}>
				{audio_title} {playing ? <PauseIcon /> : <PlayIcon />}
			</Button>
			<audio id={audio_id} src={`/${audio_id}.mp3`} loop></audio>
			{playing && (
				<div className='w-full sm:w-96 mb-4 sm:mb-0'>
					<Slider
						value={[volume || 0.75]}
						onValueChange={(v) => {
							set_item_volume(audio_id, v[0]);
						}}
						step={0.01}
						min={0}
						max={1}
					/>
				</div>
			)}
		</div>
	);
};

export default function Home() {
	const [playing, set_playing] = useState<Record<string, boolean>>({});

	const [volume, set_volume] = useState<Record<string, number>>({});

	// const [meander, set_meander] = useState(false);

	const [meander_initial_volumes, set_meander_initial_volumes] = useState<Record<string, number>>({});

	// const [meander_timers, set_meander_timers] = useState({});

	const toggle_audio = (audio_id: string) => {
		// Play the sound here


		const audio = document.getElementById(audio_id) as HTMLAudioElement;

		if (audio.paused) {
			if (!volume[audio_id]) manual_set_item_volume(audio_id, 0.5);
			set_playing({ ...playing, [audio_id]: true });
			audio.play();
		} else {
			set_playing({ ...playing, [audio_id]: false });
			audio.pause();
		}
	};

	const manual_set_item_volume = (audio_id: string, new_volume: number) => {
		set_meander_initial_volumes({ ...meander_initial_volumes, [audio_id]: new_volume });
		set_item_volume(audio_id, new_volume);
	};

	const set_item_volume = (audio_id: string, new_volume: number) => {
		set_volume({ ...volume, [audio_id]: new_volume });

		const audio = document.getElementById(audio_id) as HTMLAudioElement;
		audio.volume = new_volume;
	};

	// If meander[audio_id] is true, it will stop meandering, clear any timers, and set meander to false
	// If an item is meandering, the volume will over time change by meander_initial_volumes[audio_id] +/- 0.35 gradually every 2 seconds
	// Volume will not go over 1 or under 0

	// const meander_volume = () => {
	// 	if (meander) {
	// 		set_meander(false);

	// 		for (const audio_id in meander_timers) {
	// 			// clearInterval(meander_timers[audio_id]);
	// 		}

	// 		set_meander_timers({});
	// 	}
	// 	else {
	// 		set_meander(true);

	// 		// For each audio item, create a new timer in meander_timers
	// 		// The timer will gradually over 5 seconds change the volume by meander_initial_volumes[audio_id] +/- 0.35
	// 		// Volume will not go over 1 or under 0

	// 		const mt: { [key: string]: NodeJS.Timer } = {};

	// 		for (const audio_id in meander_initial_volumes) {
	// 			const timer = setInterval(() => {
	// 				const audio = document.getElementById(audio_id) as HTMLAudioElement;
	// 				const current_volume = audio.volume;
	// 				const new_volume = Math.min(Math.max(current_volume + Math.random() * 0.7 - 0.35, 0), 1);
	// 				set_item_volume(audio_id, new_volume);
	// 			}, 2000);

	// 			mt[audio_id] = timer;
	// 		}

	// 		set_meander_timers(mt);
	// 	}
	// };

	const pause_all = () => {
		const temp_audio = { ...playing };

		for (const audio_id in playing) {
			const audio = document.getElementById(audio_id) as HTMLAudioElement;
			audio.pause();
			temp_audio[audio_id] = false;
		}

		set_playing(temp_audio);
	};

	const is_playing = (audio_id: string) => {
;

		const audio = typeof document !== 'undefined' && (document.getElementById(audio_id) as HTMLAudioElement);

		if (!audio) return false;

		return !audio?.paused;
	};

	return (
		<div className='grid grid-rows-[1fr_20px]  min-h-screen p-8 pt-15 pb-10 gap-8 sm:p-20 sm:pb-10 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col '>
				<h1 className='sm:text-4xl text-3xl font-bold'>sounds.gabech.com</h1>
				<p className='sm:mt-4 mt-2 text-lg sm:text-2xl'>Background music for your life</p>

				<div className='mt-4 flex gap-4'>
					<Button className='w-full sm:w-36' variant={'secondary'} onClick={pause_all}>
						Pause all
					</Button>

					{/* <Button className='w-48' variant={'secondary'} onClick={meander_volume}>
						{meander ? 'Stop meandering' : 'Start meandering'}
					</Button> */}
				</div>

				<div className='mt-8 flex flex-col gap-8'>
					<div className='flex flex-col '>
						<p className={header}>Nature</p>
						<div className={section}>
							<SoundItem
								audio_id='rain_audio'
								audio_title='Rain'
								playing={is_playing('rain_audio')}
								volume={volume['rain_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
							<SoundItem
								audio_id='thunder_audio'
								audio_title='Thunder'
								playing={is_playing('thunder_audio')}
								volume={volume['thunder_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>

							<SoundItem
								audio_id='fireplace_audio'
								audio_title='Fireplace'
								playing={is_playing('fireplace_audio')}
								volume={volume['fireplace_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>

							<SoundItem
								audio_id='crickets_audio'
								audio_title='Crickets'
								playing={is_playing('crickets_audio')}
								volume={volume['crickets_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
						</div>
					</div>

					<div>
						<p className={header}>City</p>
						<div className={section}>
							<SoundItem
								audio_id='nyc_subway_audio'
								audio_title='NYC Subway'
								playing={is_playing('nyc_subway_audio')}
								volume={volume['nyc_subway_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
							<SoundItem
								audio_id='yerevanskoe_metro_audio'
								audio_title='Yerevan Subway'
								playing={is_playing('yerevanskoe_metro_audio')}
								volume={volume['yerevanskoe_metro_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
							<SoundItem
								audio_id='yamanote_line_audio'
								audio_title='Yamanote Line'
								playing={is_playing('yamanote_line_audio')}
								volume={volume['yamanote_line_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
							<SoundItem
								audio_id='seoul_cafe_audio'
								audio_title='Seoul Cafe'
								playing={is_playing('seoul_cafe_audio')}
								volume={volume['seoul_cafe_audio']}
								toggle_audio={toggle_audio}
								set_item_volume={manual_set_item_volume}
							/>
						</div>
					</div>
				</div>
			</main>
			<footer className='flex flex-row gap-4 text-sm mt-6 sm:mt-0 items-center justify-center sm:items-start sm:justify-start'>
				<p className='text-sm'>
					Made by{' '}
					<a
						href='https://gabrielchantayan.com'
						target='_blank'
						className=' underline underline-offset-2 hover:underline-offset-4'>
						Gabe Chantayan
					</a>
				</p>
				<p className='font-bold'>•</p>
				<a
					href='https://github.com/gabrielchantayan/sons/blob/main/CHANGELOG.MD'
					target='_blank'
					className=' underline underline-offset-2 hover:underline-offset-4'>
					Changelog
				</a>
			</footer>
		</div>
	);
}
