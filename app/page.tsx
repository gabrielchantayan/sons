'use client';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";




export default function Home() {

const [playing, set_playing] = useState<Record<string, boolean>>({});

const [volume, set_volume] = useState<Record<string, number>>({});

const [meander, set_meander] = useState<Record<string, boolean>>({});

  const toggle_audio = (audio_id: string) => {
    // Play the sound here
    const audio = document.getElementById(audio_id) as HTMLAudioElement;

    if (audio.paused) {
      set_playing({ ...playing, [audio_id]: true })
      audio.play();
    } else {
      set_playing({ ...playing, [audio_id]: false })
      audio.pause();
    }

  }


  const set_item_volume = (audio_id: string, new_volume: number) => {

    set_volume({ ...volume, [audio_id]: new_volume })

    const audio = document.getElementById(audio_id) as HTMLAudioElement;
    audio.volume = new_volume;
  }


  const meander_volume = (audio_id: string) => {

    if (meander[audio_id]) {
      set_meander({ ...meander, [audio_id]: false })
    }

    else {
		set_meander({ ...meander, [audio_id]: true });
    // If an item is meandering, the volume will over time change by +/- 0.4 every 10 seconds
    let current_volume = volume[audio_id];
    const interval_id = setInterval(() => {
      const new_volume = current_volume + (Math.random() - 0.5) * 0.008;
      current_volume = new_volume;
      const audio = document.getElementById(audio_id) as HTMLAudioElement;
      audio.volume = current_volume;
    }, 1000 / 60); // 60 times per second
    return () => clearInterval(interval_id);
	}
  }

//   const SoundItem = ({ audio_name, audio_id, audio_url } : { audio_name: string, audio_id: string, audio_url: string }) => {

// return(<div className='mt-8 flex gap-4'>
// 	<p>{audio_name}</p>

// 	<p>{volume[audio_id]}</p>

// 	<Button onClick={() => toggle_audio(audio_id)}>{playing[audio_id] ? 'Stop' : 'Play'}</Button>
// 	<audio id={audio_id} src={`/${audio_url}.mp3`} loop></audio>
// 	<div className='w-96'>
// 		{' '}
// 		<Slider
// 			defaultValue={[1]}
// 			onValueChange={(v) => {
// 				set_item_volume(audio_id, v[0]);
// 			}}
// 			step={0.01}
// 			min={0}
// 			max={1}
// 		/>
// 	</div>

// 	<Button onClick={() => meander_volume(audio_id)}>{meander[audio_id] ? 'Stop' : 'Meander'}</Button>
// </div>)}


  return (
		<div className='grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col '>
				<h1 className='text-4xl font-bold'>Sons</h1>
				<p className='mt-4 text-2xl'>A music app for your ears</p>

				<div className='mt-8 flex gap-4'>
					<p>Subway</p>

					<p>{volume['subway']}</p>

					<Button onClick={() => toggle_audio('subway')}>{playing['subway'] ? 'Stop' : 'Play'}</Button>
					<audio id='subway' src='/subway.mp3' loop></audio>
					<div className='w-96'>
						{' '}
						<Slider
							defaultValue={[1]}
							onValueChange={(v) => {
								set_item_volume('subway', v[0]);
							}}
							step={0.01}
							min={0}
							max={1}
						/>
					</div>

					<Button onClick={() => meander_volume('subway')}>{meander['subway'] ? 'Stop' : 'Meander'}</Button>
				</div>

				<div className='mt-8 flex gap-4'>
					<p>Rain</p>

					<p>{volume['rain']}</p>

					<Button onClick={() => toggle_audio('rain')}>{playing['rain'] ? 'Stop' : 'Play'}</Button>
					<audio id='rain' src='/rain.mp3' loop></audio>
					<div className='w-96'>
						{' '}
						<Slider
							defaultValue={[1]}
							onValueChange={(v) => {
								set_item_volume('rain', v[0]);
							}}
							step={0.01}
							min={0}
							max={1}
						/>
					</div>
				</div>

				<div className='mt-8 flex gap-4'>
					<p>Thunder</p>

					<p>{volume['thunder']}</p>

					<Button onClick={() => toggle_audio('thunder')}>{playing['thunder'] ? 'Stop' : 'Play'}</Button>
					<audio id='thunder' src='/thunder.mp3' loop></audio>
					<div className='w-96'>
						{' '}
						<Slider
							defaultValue={[1]}
							onValueChange={(v) => {
								set_item_volume('thunder', v[0]);
							}}
							step={0.01}
							min={0}
							max={1}
						/>
					</div>
				</div>

				<div className='mt-8 flex gap-4'>
					<p>Seoul Cafe</p>

					<p>{volume['seoul_cafe']}</p>

					<Button onClick={() => toggle_audio('seoul_cafe')}>{playing['seoul_cafe'] ? 'Stop' : 'Play'}</Button>
					<audio id='seoul_cafe' src='/seoul_cafe.mp3' loop></audio>
					<div className='w-96'>
						{' '}
						<Slider
							defaultValue={[1]}
							onValueChange={(v) => {
								set_item_volume('seoul_cafe', v[0]);
							}}
							step={0.01}
							min={0}
							max={1}
						/>
					</div>
				</div>

				<div className='mt-8 flex gap-4'>
					<p>Fireplace</p>

					<p>{volume['fireplace']}</p>

					<Button onClick={() => toggle_audio('fireplace')}>{playing['fireplace'] ? 'Stop' : 'Play'}</Button>
					<audio id='fireplace' src='/fireplace.mp3' loop></audio>
					<div className='w-96'>
						{' '}
						<Slider
							defaultValue={[1]}
							onValueChange={(v) => {
								set_item_volume('fireplace', v[0]);
							}}
							step={0.01}
							min={0}
							max={1}
						/>
					</div>
				</div>

				{/* <SoundItem audio_name="Seoul Cafe" audio_id="seoul_cafe" audio_url="seoul_cafe" /> */}
			</main>
		</div>
  );
}
