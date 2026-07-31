import { marked } from 'marked';
import { createLinter ,loadTextlintrc } from 'textlint';

// convert the document from markdown to HTML
export function markdownToHtml(markdown: string): string | Promise<string> {
    // marked.parse するだけ
    // req も res も知らない
    const htmlContent = marked.parse(markdown);
    
    return htmlContent;
}

// check the grammar as markdown
export async function checkGrammar(markdown: string, markdownpath: string){

    // difine textlint
    const descriptor = await loadTextlintrc();
    const linter = await createLinter({descriptor});
    const linterResults = await linter.lintText(markdown,markdownpath);

    return linterResults;
}