import { Box, parseOneBox } from '#/box';
import { infeBox } from '#/boxes/infe';
import type { MultiBufferStream } from '#/buffer';
import { OK } from '#/constants';
import { Log } from '#/log';

export class iinfBox extends Box {
  version: number;
  entry_count: number;
  item_infos: Array<infeBox>;

  type = 'iinf' as const;
  constructor(size?: number) {
    super(size);
  }

  parse(stream: MultiBufferStream) {
    if (this.version === 0) {
      this.entry_count = stream.readUint16();
    } else {
      this.entry_count = stream.readUint32();
    }

    this.item_infos = [];

    for (let i = 0; i < this.entry_count; i++) {
      const ret = parseOneBox(stream, false, this.size - (stream.getPosition() - this.start));
      if (ret.code === OK) {
        // NEEDS REVIEW:   this was `ret.box.type == 'infe'` before.
        if (ret.box instanceof infeBox) {
          this.item_infos[i] = ret.box;
        } else {
          Log.error('BoxParser', "Expected 'infe' box, got " + ret.box.type);
        }
      } else {
        return;
      }
    }
  }
}
