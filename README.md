# emoji-sequences-parser

This is a utility software that reads "emoji-sequences.txt" and "emoji-zwj-sequences.txt" provided by Unicode® Inc.,
processes them into a format that can be easily utilized from programs, and outputs the results.

## Installation

#### 1. Clone this repository from GitHub and execute `npm install` and `npm build`

```shell
# clone from github
git clone https://github.com/samunohito/emoji-sequences-parser
cd emoji-sequences-parser

# init npm modules
npm install

# build
npm build
```

#### 2. Download the following files from the Unicode® Inc. website

Distribution location: https://www.unicode.org/Public/emoji/latest/

emoji-sequences.txt
emoji-zwj-sequences.txt

#### 3. Store the downloaded text files in the lib directory created at build time

## Usage

The "emoji-sequences.txt" and "emoji-zwj-sequences.txt" files are processed according to the following patterns and
printed to standard output.

### Creating a list of emojis

Create a list of emojis from the contents of "emoji-sequences.txt".
Not all emojis are listed in the "emoji-sequences.txt", and many are abbreviated in the `from..to` format such
as `1F3CF..1F3D3`.
This feature restores emojis abbreviated in the `from..to` format and outputs a complete list of emojis.

```shell
# Output a list of emojis
npm run run:uniqueEmojiList

# Output emojis as code points
npm run run:uniqueEmojiListCodePoint

# Output emojis converted to surrogate pairs from code points
npm run run:uniqueEmojiListSurrogatePair
```

### Creating regular expression patterns

Create regular expression patterns from the contents of "emoji-sequences.txt" and "emoji-zwj-sequences.txt".
While supplementing places that are abbreviated in the `from..to` format like "Creating a list of emojis", it generates
regular expression patterns that can detect most of the emojis listed in each text file.

```shell
# Output regular expression pattern (for JavaScript)
# When using in JavaScript, it is necessary to always add the u flag.
npm run run:emojiRegexPatternJs

# Output regular expression pattern (for Java)
# There is no difference from the javascript version at the moment, but some differences may occur in the future.
npm run run:emojiRegexPatternJava
```

## Contributing

Bug reports and proposals for new features are accepted through GitHub issues.
Pull requests are also welcomed. No detailed rules have been decided yet, but there is a possibility that rules may be
added later.

## License

MIT License applies.
