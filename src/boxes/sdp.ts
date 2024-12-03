import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class sdpBox extends Box {
  type = 'sdp' as const;

  sdptext?: string;

  parse(stream: MultiBufferStream) {
    this.sdptext = stream.readString(this.size - this.hdr_size);
  }
}
