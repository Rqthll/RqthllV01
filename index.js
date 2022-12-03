/* 
* Ga Ada Apa-Apa Di Sini Mau Ngapain?
* Recide By Arifzyn
* Maap encnya dibuka buka ZenssCuyy🗿
*/

console.log('🐾 Starting...') 
import {
    join,
    dirname
} from 'path'
import {
    createRequire
} from "module";
import {
    fileURLToPath
} from 'url'
import {
    setupMaster,
    fork
} from 'cluster'
import {
    watchFile,
    unwatchFile
} from 'fs'
import cfonts from 'cfonts';
import {
    createInterface
} from 'readline'
import yargs from 'yargs'
const __dirname = dirname(fileURLToPath(
    import.meta.url)) 
    const require = createRequire(__dirname)
    const {
    name,
    author
} = require(join(__dirname, './package.json')) 
const {
    say
} = cfonts
const rl = createInterface(process.stdin, process.stdout) 
    say('Yukinoshita', {
    font: 'shade',
    align: 'center',
    colors: ['gray', 'cyanBright']
}) 
    say('*YUKINOSHITA 2022*', {
    font: 'console',
    align: 'center',
    colors: ['white']
}) 
var isRunning = false
function start(a) {
    if (isRunning) return isRunning = true
    let args = [join(__dirname, a), ...process.argv.slice(2)] 
    say([process.argv[0], ...args].join(' '), {
        font: 'console',
        align: 'center',
        colors: ['blue']
    }) 
    say('🌎 MEMUAT SOURCE...', {
        font: 'console',
        align: 'center',
        colors: ['white']
    }) 
    say('📑 MEMUAT PLUGINS...', {
        font: 'console',
        align: 'center',
        colors: ['yellow']
    }) 
    say('✅ BERHASIL!', {
        font: 'console',
        align: 'center',
        colors: ['green']
    }) 
    setupMaster({
        exec: args[0],
        args: args.slice(1),
    }) 
    let p = fork() 
    p.on('message', data => {
        console.log('[RECEIVED]', data) 
        switch (data) {
        case 'reset':
            p.process.kill() 
            isRunning = false 
            start.apply(this, arguments) 
            break 
            case 'uptime': p.send(process.uptime()) 
            break
        }
    }) 
    p.on('exit', (_, code) => {
        isRunning = false 
        console.error('[❗] BOT ERROR!! SILAKAN MULAI ULANG!', code) 
        if (code === 0) return watchFile(args[0], () => {
            unwatchFile(args[0]) 
            start(a)
        })
    }) 
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse()) 
    if (!opts['test'])
        if (!rl.listenerCount()) rl.on('line', line => {
            p.emit('message', line.trim())
        })
}
start('main.js')