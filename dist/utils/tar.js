"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.untar = untar;
/**
 * Extracts files from a tar stream.
 * This is a simplified parser that works with the specific format
 * returned by the Gemini API.
 */
async function untar(stream) {
    const files = [];
    let buffer = Buffer.alloc(0);
    let header = null;
    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            buffer = Buffer.concat([buffer, chunk]);
            while (buffer.length > 0) {
                if (!header) {
                    // Tar headers are 512 bytes
                    if (buffer.length < 512)
                        break;
                    const headerBuffer = buffer.slice(0, 512);
                    // Check for end-of-archive marker (two empty 512-byte blocks)
                    if (headerBuffer.every(b => b === 0)) {
                        buffer = buffer.slice(512);
                        continue; // Skip empty blocks
                    }
                    const path = headerBuffer.slice(0, 100).toString('utf-8').replace(/\0/g, '');
                    const sizeStr = headerBuffer.slice(124, 136).toString('utf-8').replace(/\0/g, '');
                    const size = parseInt(sizeStr, 8); // Size is in octal
                    if (path && !isNaN(size)) {
                        header = { path, size };
                        buffer = buffer.slice(512);
                    }
                    else {
                        // If we can't parse a header, we might be at the end.
                        break;
                    }
                }
                else {
                    const { size } = header;
                    const contentEnd = Math.ceil(size / 512) * 512; // Content is padded to 512-byte blocks
                    if (buffer.length < contentEnd)
                        break;
                    const content = buffer.slice(0, size).toString('utf-8');
                    files.push({ path: header.path, content });
                    buffer = buffer.slice(contentEnd);
                    header = null;
                }
            }
        });
        stream.on('end', () => {
            if (buffer.length > 0 && header) {
                // Handle any remaining data
                const content = buffer.slice(0, header.size).toString('utf-8');
                files.push({ path: header.path, content });
            }
            resolve(files);
        });
        stream.on('error', (err) => {
            reject(err);
        });
    });
}
