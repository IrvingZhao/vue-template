import { Protocol } from 'electron'
import CacheHttpFile from './cacheHttpFile'
import registerProtocol, { ProtocolType } from './register'

const protocols: ProtocolType[] = [CacheHttpFile]

export default function registerProtocols(protocol: Protocol) {
  protocols.forEach((item) => registerProtocol(protocol, item))
}
