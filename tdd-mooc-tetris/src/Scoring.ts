export class Scoring {
  score: number

  constructor() {
    this.score = 0
  }

  clearLine(lines: number) {
    switch (lines) {
      case 1:
        this.score += 40
        break
      case 2:
        this.score += 100
        break
      case 3:
        this.score += 300
        break
      case 4:
        this.score += 1200
        break
    }
    return
  }
}
