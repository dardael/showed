import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder as typeof global.TextDecoder;
}

// Suppress Mongoose Jest warning
process.env.SUPPRESS_JEST_WARNINGS = 'true';
