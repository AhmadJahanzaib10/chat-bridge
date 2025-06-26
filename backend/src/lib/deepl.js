import * as deepl from 'deepl-node';

const authKey = process.env.DEEP_L; 
const translator = new deepl.Translator(authKey);

export async function translate(text,target_language) {
    try {
        const result = await translator.translateText(text, null, target_language);
        return result
    } catch (error) {
        console.error("Translation failed:", error);
    }
}

