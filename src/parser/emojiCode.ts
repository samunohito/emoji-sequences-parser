import {EmojiCodeType} from "./emojiCodeType";
import {EmojiCodePoint, EmojiCodePointFactory} from "./emojiCodePoint";

export interface EmojiCode {
  type: EmojiCodeType
  text: string
  codePoints: EmojiCodePoint[]
}

export class EmojiCodeFactory {
  static fromCodePointDec(codePointDec: number): EmojiCode {
    return {
      type: EmojiCodeType.Single,
      text: String.fromCodePoint(codePointDec),
      codePoints: [EmojiCodePointFactory.fromCodePointDec(codePointDec)]
    }
  }

  static fromCodePointHex(codePointHex: string): EmojiCode {
    return {
      type: EmojiCodeType.Single,
      text: String.fromCodePoint(parseInt(codePointHex, 16)),
      codePoints: [EmojiCodePointFactory.fromCodePointHex(codePointHex)]
    }
  }

  static fromCodePointHexes(codePointHexes: string[]): EmojiCode[] {
    switch (codePointHexes.length) {
      case 0:
        return []
      case 1:
        return [
          this.fromCodePointHex(codePointHexes[0])
        ]
      default:
        const joinedText = codePointHexes.reduce(
          (acc, codePointHex) => acc + String.fromCodePoint(parseInt(codePointHex, 16)),
          ""
        )
        return [
          {
            type: EmojiCodeType.Combination,
            text: joinedText,
            codePoints: codePointHexes.map(i => EmojiCodePointFactory.fromCodePointHex(i))
          }
        ]
    }
  }
}



