import {EmojiCodePointType} from "./emojiCodePointType";
import {codePointVariationSelectorBegin, codePointVariationSelectorEnd, codePointZWJ} from "../const";

export interface EmojiCodePoint {
  type: EmojiCodePointType
  hex: string
  dec: number
}

export class EmojiCodePointFactory {
  private static codePointVariationSelectorBeginInt = parseInt(codePointVariationSelectorBegin, 16)
  private static codePointVariationSelectorEndInt = parseInt(codePointVariationSelectorEnd, 16)

  static fromCodePointDec(codePointDec: number): EmojiCodePoint {
    const codePointHex = codePointDec.toString(16).toUpperCase()
    return this.fromCodePoint(codePointDec, codePointHex)
  }

  static fromCodePointHex(codePointHex: string): EmojiCodePoint {
    const codePointDec = parseInt(codePointHex, 16)
    return this.fromCodePoint(codePointDec, codePointHex)
  }

  private static fromCodePoint(codePointDec: number, codePointHex: string): EmojiCodePoint {
    if (codePointHex === codePointZWJ) {
      // ZWJ
      return {
        type: EmojiCodePointType.Special,
        hex: codePointHex.toUpperCase(),
        dec: codePointDec
      }
    }

    if (this.codePointVariationSelectorBeginInt <= codePointDec && codePointDec <= this.codePointVariationSelectorEndInt) {
      // 異体字セレクタ
      return {
        type: EmojiCodePointType.Special,
        hex: codePointHex.toUpperCase(),
        dec: codePointDec
      }
    }

    return {
      type: EmojiCodePointType.Character,
      hex: codePointHex.toUpperCase(),
      dec: codePointDec
    }
  }
}
