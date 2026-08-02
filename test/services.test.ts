import { describe, it, expect } from 'vitest';
import { markdownToHtml, checkGrammar } from '../dist/services.js';

describe('Unit test: markdownToHtml', () => {
    it('converts a markdown heading into an h1 HTML tag', ()=> {
        // Arrange
        const inputMardown = '# Hello';

        // Act
        const convertResult = markdownToHtml(inputMardown);

        // Assert
        expect(convertResult).toBe("<h1>Hello</h1>\n");
    
    

    })
})

describe('Unit test: checkGrammar', () => {
    it('check the grammar of file as Markdown',async ()=> {
        // Act
        const checkResult = await checkGrammar('Actually, this is basically very bad writing.', 'note.md');

        console.log(`checkResult: ${checkResult}`);
        // Assert
        expect(Array.isArray(checkResult.messages)).toBe(true);
        expect(checkResult.messages.length).toBeGreaterThan(0);

    })
})