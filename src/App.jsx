import React, { useState, useRef, useEffect } from 'react'
import Toggle from './Toggle';
function App() {

  const [sound, setSound] = useState("sound track name")
  const [powerOn, setPowerOn] = useState(true)
  const [volume, setVolume] = useState(1)
  const datas = [
    {
      key: 'Q',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3",
      name: "Heater_1"
    },
    {
      key: 'W',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3",
      name: "Heater_2"
    },
    {
      key: 'E',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3",
      name: "Heater_3"
    },
    {
      key: 'A',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3",
      name: "Heater_4"
    },
    {
      key: 'S',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3",
      name: "Clap"
    },
    {
      key: 'D',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3",
      name: "Open-HH"
    },
    {
      key: 'Z',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3",
      name: "Kick-n'-Hat"
    },
    {
      key: 'X',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3",
      name: "Kick"
    },
    {
      key: 'C',
      url: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3",
      name: "Closed-HH"
    }
  ]
  const audioSrc = useRef({})

  


  useEffect(() => {
    function handleKeys(event) {

      const currentKey = datas.find(data => event.key.toUpperCase() === data.key)


      playAudio(currentKey.key)

    }
    window.addEventListener('keydown', handleKeys);
    return () => {
      window.removeEventListener('keydown', handleKeys);
    };
  }, [])


  const playAudio = async (key) => {

    const data = datas.find(d => d.key === key)


    if (data) {
      setSound(data.name);
      const audio = audioSrc.current[key];
      if (audio) {
        audio.currentTime = 0;
        try {
          await audio.play();
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
    }


  };

  const handlePowerToggle = (isOn) => {
    console.log('Power is now', isOn ? 'ON' : 'OFF');
      setPowerOn(isOn);
      console.log('Power is now', isOn ? 'ON' : 'OFF');
      Object.values(audioSrc.current).forEach(audio => {
        if (audio) {
          audio.muted = !isOn;
        }
      })
    
  }
  
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
    Object.values(audioSrc.current).forEach(audio => {
      if (audio) {
        audio.volume = event.target.value;
      }
    })
  }

  
  return (
    <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center" >
      <div className=" flex flex-row rounded-e-mdxl h-[50vh] w-[60vw] bg-gray-600" id='drum-machine'>

        <div className="flex flex-wrap gap-4 p-4 h-[100%] w-[60%]">
          {
            datas.map(data => {


              return (
                <button key={data.key} id='audio' className='bg-blue-500 rounded-lg text-white p-2  w-1/4 drum-pad' onClick={() => playAudio(data.key)}>{data.key}
                  <audio ref={el => audioSrc.current[data.key] = el} key={data.key} className='clip' id={data.key} src={data.url} ></audio>

                </button>
              )
            })
          }
        </div>
        <div className="flex flex-col justify-evenly items-center  h-[100%] w-[40%]">


          <Toggle forId="power" title="Power" toggleLog={handlePowerToggle} />

          <p id='display' className='h-8 w-19 bg-gray-50'>{sound}</p>

          <input className='w-[80%] cursor-pointer' type="range" min="0" max="1" step="0.01" onChange={handleVolumeChange} value={volume} />

          <Toggle forId="bank" title="Bank" />

        </div>

      </div>~
    </div>
  )
}

export default App
