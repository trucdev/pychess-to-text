import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class AppService {
  private quanMapping = {
    H: 'Mã',
    C: 'Pháo',
    A: 'Sỹ',
    R: 'Xe',
    E: 'Tượng',
    P: 'Binh',
    K: 'Tướng',
  };

  private directionMapping = {
    '+': 'tấn',
    '-': 'thoái',
    '=': 'bình',
  };

  getViTriDau(s) {
    if (s === '+') return 'trên';
    if (s === '-') return 'dưới';

    return `${s}`;
  }

  stepToText(step) {
    const quan = step[0];

    return `${this.quanMapping[quan]} ${this.getViTriDau(step[1])} ${
      this.directionMapping[step[2]]
    } ${step[3]}`;
  }

  async getReadingText(url): Promise<string> {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const boardData: any = $('body').data('board');

    const steps: any[] = boardData.steps.filter((s) => !!s.san);

    const textSteps = steps
      .map((s) => {
        return this.stepToText(s.san);
      })
      .join(';\r\n');

    return textSteps;
  }
}
