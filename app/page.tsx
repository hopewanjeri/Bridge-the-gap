"use client";
import Image from "next/image";
import {useEffect, useState} from "react";
import Carousel from "@/components/Carousel";

export default function Home() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [speechRecognition, setSpeechRecognition] = useState<any>(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = true;

            recognition.onresult = (event: SpeechRecognitionEvent) => {
                const currentTranscript = Array.from(event.results)
                    .map(result => result[0].transcript) // Accessing transcript directly from the first alternative
                    .join('');
                setTranscript(currentTranscript);
            };

            setSpeechRecognition(recognition);
        } else {
            console.error("Speech recognition is not supported in this browser.");
        }
    }, []);

    const handleStartListening = () => {
        if (speechRecognition) {
            speechRecognition.start();
            setIsListening(true);
        }
    };

    const handleStopListening = () => {
        if (speechRecognition) {
            speechRecognition.stop();
            setIsListening(false);
        }
    };


  return (
      <main className="h-screen w-screen overflow-hidden bg-gray-100">
          <div className="grid grid-cols-[2fr_1fr] h-full">
              {/* UI Section */}
              <div className="flex flex-col justify-evenly items-center p-10 space-y-4 bg-white drop-shadow-lg">
                  <div className="flex justify-center items-center">
                      <Image src="/logo.jpeg" width={150} height={100} alt="Logo"/>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800">Welcome to Bridge the Gap</h1>
                  <div>
                      {isListening ? (
                          <button onClick={handleStopListening}
                                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300 ease-in-out">Stop
                              Listening</button>
                      ) : (
                          <button onClick={handleStartListening}
                                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition duration-300 ease-in-out">Start
                              Listening</button>
                      )}
                  </div>

                  {/*Output*/}
                  <div className="w-full">
                      <h2 className="text-xl font-bold text-gray-800">Transcript</h2>
                      <div className="h-44 w-full border border-gray-300 overflow-auto p-4 text-gray-700">
                          <p>{transcript}</p>
                      </div>
                  </div>
              </div>

              {/* Carousel Section */}
              <div className="flex flex-col justify-center items-center bg-gray-200">
                  <Carousel/>
              </div>
          </div>
      </main>

  );
}
