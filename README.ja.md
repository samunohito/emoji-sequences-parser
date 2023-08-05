# emoji-sequences-parser

Unicode® Inc.から提供される「emoji-sequences.txt」と「emoji-zwj-sequences.txt」を読み込み、
プログラムなどから活用しやすい形に加工して出力するユーティリティソフトウェアです。

## Installation

#### 1. GitHubからこのリポジトリをcloneし、`npm install`および`npm build`を実行します

```shell
# clone from github
git clone https://github.com/samunohito/emoji-sequences-parser
cd emoji-sequences-parser

# init npm modules
npm install

# build
npm build
```

#### 2. Unicode® Inc.のサイトから以下のファイルをダウンロードします

配布場所：https://www.unicode.org/Public/emoji/latest/

- emoji-sequences.txt
- emoji-zwj-sequences.txt

#### 3.　ビルド時に出来たlibディレクトリの中にダウンロードしたテキストファイルを格納します

## Usage

「emoji-sequences.txt」と「emoji-zwj-sequences.txt」を下記のパターンで加工し、標準出力に印字します。

### 絵文字一覧の作成

「emoji-sequences.txt」の内容から絵文字一覧を作成します。
「emoji-sequences.txt」には全ての絵文字が載っているわけではなく、`1F3CF..1F3D3`のように`from..to`形式で略された表現となっているものも多数あります。
この昨日は、`from..to`形式で略されてしまった絵文字を復元し、完全な絵文字一覧を出力します。

```shell
# 絵文字の一覧を出力
npm run run:uniqueEmojiList

# 絵文字をコードポイント化して出力
npm run run:uniqueEmojiListCodePoint

# 絵文字のコードポイントをサロゲートペアに変換して出力
npm run run:uniqueEmojiListSurrogatePair
```

### 正規表現パターンの作成

「emoji-sequences.txt」と「emoji-zwj-sequences.txt」の内容から正規表現パターンを作成します。
「絵文字一覧の作成」と同じようにfrom..to形式で略された表現となっている箇所も補いつつ、
それぞれのテキストファイルに記載された絵文字のほとんどを検出可能な正規表現パターンを生成します。

```shell
# 正規表現パターン出力（JavaScript向け）
# JavaScriptで利用するときはuフラグを必ず付与する必要があります。
npm run run:emojiRegexPatternJs

# 正規表現パターン出力（Java向け）
# いまのところjavaScript版と差はありませんが、将来的に何らかの差分が生まれる可能性があります。
npm run run:emojiRegexPatternJava
```

## Contributing

バグ報告や機能追加の提案はGitHubのIssueで受け付けています。また、プルリクエストも歓迎しています。
いまのところ細かいルールは決まっていませんが、後からルールを追加する可能性があります。

## License

MITライセンスが適用されます。
