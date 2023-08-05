import {EmojiCode} from "../parser/emojiCode";

export interface Processor {
  process(emojiSequences: EmojiCode[], params: ProcessorParameter): string
}

export interface ProcessorParameter {
  emoji: boolean
  codePoint: boolean
  surrogatePair: boolean
  javaScript: boolean
  java: boolean
}
