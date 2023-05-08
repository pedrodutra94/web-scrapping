import { JSDOM } from 'jsdom';
import  fs from 'fs';
import path from 'path'

export async function fetchDOM() {
    const html = fs.readFileSync(path.resolve(__dirname, '../bets.html'), 'utf8')
    const { document } =  (new JSDOM(html)).window
    return document
}