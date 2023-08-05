import {Processor, ProcessorParameter} from "./processor";
import {EmojiCode} from "../parser/emojiCode";
import {EmojiCodePointType} from "../parser/emojiCodePointType";
import {codePointToSurrogate, compareNumber} from "../utils";
import {EmojiCodeType} from "../parser/emojiCodeType";

/**
 * 絵文字を正規表現で検出するためのパターンを生成する。
 * ZWJ、異体字セレクタを含むが、ASCIIコード範囲内のものは含まない（キーキャップと結合されて使用される文字など）
 */
export class EmojiRegexPatternProcessor implements Processor {
  process(emojiSequences: EmojiCode[], params: ProcessorParameter): string {
    const singleResult = this.processSingleCodePoints(emojiSequences, params)
    const combinationResult = this.processCombinationCodePoints(emojiSequences, params)
    return "(" + singleResult + "|" + combinationResult + ")"
  }

  private processSingleCodePoints(emojiSequences: EmojiCode[], params: ProcessorParameter): string {
    // ZWJや異体字セレクタなどに依らず、単独で絵文字として成立するものを抽出してユニークにする
    const codePoints = [
      ...new Set<number>(
        emojiSequences
          .filter(i => i.type === EmojiCodeType.Single)
          .flatMap(i => i.codePoints)
          .filter(i => i.type === EmojiCodePointType.Character)
          .map(i => i.dec)
      )
    ].sort(compareNumber)

    const sequentialNumberChunks: { from: number, to: number }[] = []
    let seqStartAt = 0
    for (let i = 1; i < codePoints.length; i++) {
      const prev = codePoints[i - 1]
      const current = codePoints[i]
      if (prev + 1 === current) {
        // 数値が連続している
      } else {
        // 数値が連続しておらず途切れたら、連続していた範囲をリストに記録しておく
        sequentialNumberChunks.push({from: codePoints[seqStartAt], to: prev})
        seqStartAt = i
      }
    }

    const generator = this.selectCodePointStringGenerator(params)
    const result = sequentialNumberChunks.reduce(
      (acc, it) => (it.from === it.to)
        ? acc + generator(it.from)
        : acc + generator(it.from) + "-" + generator(it.to),
      ""
    )

    return "[" + result + "]"
  }

  private processCombinationCodePoints(emojiSequences: EmojiCode[], params: ProcessorParameter): string {
    const combinationCodePoints = emojiSequences.filter(i => i.type === EmojiCodeType.Combination)
    const generator = this.selectOutputLineGenerator(params)
    const regexPatterns = [...new Set(combinationCodePoints.map(i => generator(i)))].sort()
    return "(" + regexPatterns.join("|") + ")"
  }

  private selectOutputLineGenerator(params: ProcessorParameter): (code: EmojiCode) => string {
    const codePointGenerator = this.selectCodePointStringGenerator(params)

    if (params.java) {
      // java
      return (i) => i.codePoints.map(j => codePointGenerator(j.dec)).join("")
    }

    // デフォルトはJavaScript
    return (i) => i.codePoints.map(j => codePointGenerator(j.dec)).join("")
  }

  private selectCodePointStringGenerator(params: ProcessorParameter): (codePoint: number) => string {
    if (params.java) {
      // java
      return (i) => codePointToSurrogate(i).map(j => "\\u" + j).join("")
    }

    // デフォルトはJavaScript
    return (i) => codePointToSurrogate(i).map(j => "\\u" + j).join("")
  }
}
