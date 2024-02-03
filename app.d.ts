declare global {
    interface Window {
        SpeechRecognition: typeof SpeechRecognition;
        webkitSpeechRecognition: typeof SpeechRecognition;
    }

    // This represents a single result alternative, which contains the actual transcript.
    interface SpeechRecognitionAlternative {
        transcript: string;
        confidence: number;
    }

    // A SpeechRecognitionResult contains multiple alternatives.
    interface SpeechRecognitionResult {
        [index: number]: SpeechRecognitionAlternative;
        length: number;
        item(index: number): SpeechRecognitionAlternative;
        isFinal: boolean;
    }

    // The list of results in a recognition event.
    interface SpeechRecognitionResultList {
        [index: number]: SpeechRecognitionResult;
        length: number;
        item(index: number): SpeechRecognitionResult;
    }

    interface SpeechRecognitionEvent {
        results: SpeechRecognitionResultList;
    }
}

export {};
