import { Protocol, ProtocolRequest, ProtocolResponse } from 'electron'

export interface ProtocolHandle<T, R> {
  type: T
  scheme: string
  handle: (request: ProtocolRequest, callback: (response: R | ProtocolResponse) => void) => void
}

export type ProtocolType =
  | ProtocolHandle<'buffer', Buffer>
  | ProtocolHandle<'file', string>
  | ProtocolHandle<'http', never>
  | ProtocolHandle<'stream', NodeJS.ReadableStream>
  | ProtocolHandle<'string', string>

export default function registerProtocol(protocol: Protocol, handle: ProtocolType) {
  if (handle.type === 'buffer') {
    protocol.registerBufferProtocol(handle.scheme, handle.handle)
  } else if (handle.type === 'file') {
    protocol.registerFileProtocol(handle.scheme, handle.handle)
  } else if (handle.type === 'http') {
    protocol.registerHttpProtocol(handle.scheme, handle.handle)
  } else if (handle.type === 'stream') {
    protocol.registerStreamProtocol(handle.scheme, handle.handle)
  } else if (handle.type === 'string') {
    protocol.registerStringProtocol(handle.scheme, handle.handle)
  }
}
