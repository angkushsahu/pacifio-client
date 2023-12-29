export interface ShortenSentenceArgs {
   sentence: string;
   maxCharacters: number;
}

export interface ShortenSentenceReturnType {
   isLong: boolean;
   shortenedString: string;
}

export default function shortenSentence({ maxCharacters, sentence }: ShortenSentenceArgs): ShortenSentenceReturnType {
   let isLong = false;
   if (sentence.length > maxCharacters) isLong = true;
   if (!isLong) return { isLong, shortenedString: sentence };

   let shortenedString = sentence.substring(0, maxCharacters);

   return { isLong, shortenedString };
}
