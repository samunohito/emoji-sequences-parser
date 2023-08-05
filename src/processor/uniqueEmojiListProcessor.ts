import {Processor, ProcessorParameter} from "./processor";
import {EmojiCode} from "../parser/emojiCode";
import {EmojiCodePoint} from "../parser/emojiCodePoint";
import {codePointKeyCaps} from "../const";
import {codePointToSurrogate, compareNumber} from "../utils";

/**
 * コードポイントの重複を排除した改行コード区切りの絵文字一覧を作成する。
 * なお、以下は絵文字として扱わず、出力には含まない。
 * - ZWJ
 * - 異体字セレクタ
 * - ASCIIコード範囲内の文字（キーキャップと結合されて使用されるものなど）
 */
export class UniqueEmojiListProcessor implements Processor {
  process(emojiSequences: EmojiCode[], params: ProcessorParameter): string {
    const codePointKeyCapsSet = new Set<string>(codePointKeyCaps)
    const codePointMap = new Map<number, EmojiCodePoint>()
    emojiSequences.forEach(emoji => {
      emoji.codePoints.forEach(codePoint => {
        if (!codePointMap.has(codePoint.dec) && !codePointKeyCapsSet.has(codePoint.hex)) {
          codePointMap.set(codePoint.dec, codePoint)
        }
      })
    })

    // mapのキーをもとに生成するのでvalue部分がundefinedになることは心配しなくてOk
    const sortedCodePoints = [...codePointMap.keys()].sort(compareNumber).map(i => codePointMap.get(i)!)
    const generator = this.selectOutputLineGenerator(params)
    return sortedCodePoints.map(i => generator(i)).join("\n")
  }

  private selectOutputLineGenerator(params: ProcessorParameter): (codePoint: EmojiCodePoint) => string {
    if (params.codePoint) {
      // コードポイント
      return (i) => i.hex
    }

    if (params.surrogatePair) {
      // サロゲートペア形式
      return (i) => codePointToSurrogate(i.dec).join(",")
    }

    // デフォルトは絵文字そのまま
    return (i) => String.fromCodePoint(i.dec)
  }
}
