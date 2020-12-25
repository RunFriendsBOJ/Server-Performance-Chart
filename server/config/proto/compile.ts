const protobuf = require('protocol-buffers')
import fs from 'fs'
const js = protobuf.toJS(fs.readFileSync('post.proto'))
fs.writeFileSync('protobuf.js', js)