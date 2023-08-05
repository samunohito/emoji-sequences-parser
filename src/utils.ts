export function compareNumber(x: number, y: number): number {
  if (x > y) {
    return 1;
  } else if (x < y) {
    return -1;
  } else {
    return 0;
  }
}

export function codePointToSurrogate(codePoint: number): string[] {
  if (codePoint < 0x10000) {
    // 4バイトをオーバーしないようならそのまま返す
    return [codePoint.toString(16).toUpperCase().padStart(4, "0")]
  }

  // ハイサロゲート・ローサロゲートに分割してカンマ区切りにして返す
  const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xD800
  const low = Math.floor((codePoint - 0x10000) % 0x400) + 0xDC00
  return [high.toString(16).toUpperCase().padStart(4, "0"), low.toString(16).toUpperCase().padStart(4, "0")]
}
