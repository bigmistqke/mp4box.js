import { Box } from '#/box';
import type { MultiBufferStream } from '#/buffer';

export class paytBox extends Box {
  payloadID: number;
  rtpmap_string: string;

  type = 'payt' as const;

  parse(stream: MultiBufferStream) {
    this.payloadID = stream.readUint32();
    const count = stream.readUint8();
    this.rtpmap_string = stream.readString(count);
  }
}
