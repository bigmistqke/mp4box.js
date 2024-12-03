import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class vttCBox extends Box {
  text: string;

  type = 'vttC' as const;

  parse(stream: MultiBufferStream) {
    this.text = stream.readString(this.size - this.hdr_size);
  }
}