import {parseSequences} from "./parser/emojiSequenceParser";
import yargs from "yargs";
import {Processor} from "./processor/processor";
import {UniqueEmojiListProcessor} from "./processor/uniqueEmojiListProcessor";
import {EmojiRegexPatternProcessor} from "./processor/emojiRegexPatternProcessor";

async function main() {
  const args = yargs
    .option({
      // 読み取った絵文字を加工するロジックを選択するパラメータ郡
      uniqueEmojiList: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
      emojiRegexPattern: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
    })
    .option({
      // ロジックにて使用されるパラメータ郡
      emoji: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
      codePoint: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
      surrogatePair: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
      javaScript: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
      java: {
        type: "boolean",
        describe: "",
        demandOption: false,
        default: false,
      },
    })
    .parseSync()

  const processor = processorSelector(args)
  if (!processor) {
    yargs.showHelp()
    return
  }

  const emojiSequences = await parseSequences("lib/emoji-sequences.txt")
  const emojiZWJSequences = await parseSequences("lib/emoji-zwj-sequences.txt")
  const result = processor.process([...emojiSequences, ...emojiZWJSequences], args)

  console.log(result)
}

interface ProcessorSelector {
  uniqueEmojiList: boolean
  emojiRegexPattern: boolean
}

function processorSelector(params: ProcessorSelector): Processor | undefined {
  if (params.uniqueEmojiList) {
    return new UniqueEmojiListProcessor()
  }
  if (params.emojiRegexPattern) {
    return new EmojiRegexPatternProcessor()
  }

  return undefined
}

main()
