import GroqCreator from "./GroqCreator";

// const API_ENDPOINT = "https://api.groq.com/openai/v1/audio/transcriptions";
const MODEL_ID = "distil-whisper-large-v3-en";

/* Accepts mp3, mp4, mpeg, mpga, m4a, wav, webm with max file size 25 MB*/
export async function stt(
    fileOrAudioBlob: File | Blob
): Promise<string | null> {
    if (fileOrAudioBlob instanceof File) {
        return whisperStt(fileOrAudioBlob);
    }

    return whisperStt(
        new File([fileOrAudioBlob], "audio.wav", { type: "audio/wav" })
    );
}

async function whisperStt(file: File): Promise<string | null> {
    const groq = GroqCreator();

    const transcription = await groq.audio.transcriptions.create({
        file: file,
        model: MODEL_ID,
    });

    return transcription.text.trim();
}
