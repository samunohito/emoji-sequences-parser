import {readFile} from "fs";
import {EmojiCode, EmojiCodeFactory} from "./emojiCode";

export async function parseSequences(inputPath: string, encoding: BufferEncoding = 'utf8'): Promise<EmojiCode[]> {
  return new Promise((resolve, reject) => {
    readFile(inputPath, encoding, (err, data) => {
      if (err) {
        reject(err)
        return
      }

      const parsedData = data.split("\n")
        .filter(i => i.length >= 1 && !i.startsWith("#"))
        .map(i => i.split(";"))
        .filter(i => i.length >= 1)
        .map(i => i[0].trim())
        .flatMap(i => parseLine(i))

      resolve(parsedData)
    })
  })
}

function parseLine(src: string): EmojiCode[] {
  if (src.indexOf("..") >= 0) {
    // from..to形式でコード同士が並んで定義されている時
    const separated = src.split("..")
    if (separated.length <= 1) {
      return []
    }

    const startIdx = parseInt(separated[0], 16)
    const finishIdx = parseInt(separated[1], 16)
    const result = Array<EmojiCode>()
    for (let i = startIdx; i <= finishIdx; i++) {
      result.push(EmojiCodeFactory.fromCodePointDec(i))
    }

    return result
  }

  if (src.indexOf(" ") >= 0) {
    // 異体字セレクタ、ZWJ（U+200D）、ZWNJ（U+200C）などにより複数文字を組み合わせて1文字を表す場合の処理
    const separated = src.split(" ").map(i => i.toUpperCase())
    if (separated.length <= 1) {
      return []
    }

    return EmojiCodeFactory.fromCodePointHexes(separated)
  }

  return [EmojiCodeFactory.fromCodePointHex(src)]
}

