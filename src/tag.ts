import * as path from 'path';
import * as fs from 'fs/promises';
import { exec } from 'child_process';

interface HashtagResult {
    hashtags: string[];
    suggestions: string[];
}

interface HashtagSuggestion {
    hashtag: string;
    relevance: number;
}

interface HashtagsData {
    popularHashtags: string[];
}


async function loadPopularHashtags(): Promise<string[]> {
    let hashtags: string[];
    try {
        let sqlite3;
        try {
            sqlite3 = require('sqlite3');
        } catch (error) {
            console.error('✅ Using Fallback Database 🗂');
        }

        if (sqlite3) {
            const dbPath = path.join(__dirname, '..', 'db', 'hashtags.db');
            const db = new sqlite3.Database(dbPath);

            const sql = 'SELECT * FROM hashtags';

            hashtags = await new Promise<string[]>((resolve, reject) => {
                db.all(sql, [], (err: any, rows: any[]) => {
                    if (err) {
                        console.error('\x1b[31mError reading popular hashtags from SQLite database:\x1b[0m', err);
                        reject(err);
                    } else {
                        const hashtags = rows.map((row: any) => row.tag);
                        resolve(hashtags);
                    }
                });
            });
            db.close();
        } else {
            const filePath = path.join(__dirname, '..', 'db', 'hashtags.json');
            const data = await fs.readFile(filePath, 'utf-8');
            hashtags = JSON.parse(data).popularHashtags;
        }
    } catch (error) {
        console.error('Error loading popular hashtags:', error);
        throw error;
    }

    return hashtags || [];
}


function generateHashtagsWithSuggestions(sentence: string): Promise<HashtagResult> {
    const ignoreWords = new Set(["and", "it", "an", "for", "a", "has", "have", "there", "to", "the", "is", "was", "having", "in", "create"]);
    const words = sentence.split(/\s+/);
    const filteredWords = words.filter(word => word !== '' && !ignoreWords.has(word.toLowerCase()));
    const hashtags = filteredWords.map(word => '#' + word.toLowerCase());

    const popularHashtagsPromise = loadPopularHashtags();

    return popularHashtagsPromise.then(popularHashtags => {
        const suggestions: HashtagSuggestion[] = [];
        for (const popularHashtag of popularHashtags) {
            const lowercasePopularHashtag = popularHashtag.toLowerCase();
            let relevance = 0;
            for (const word of words) {
                if (lowercasePopularHashtag.includes(word.toLowerCase())) {
                    relevance++;
                }
            }
            if (relevance > 0 && !hashtags.includes(popularHashtag)) {
                suggestions.push({ hashtag: popularHashtag, relevance: relevance });
            }
        }

        suggestions.sort((a, b) => b.relevance - a.relevance);
        return {
            hashtags: hashtags,
            suggestions: suggestions.map(suggestion => suggestion.hashtag)
        };
    }).catch(error => {
        console.error('Failed to load popular hashtags:', error);
        return {
            hashtags: [],
            suggestions: []
        };
    });
}

function validateInput(input: string): boolean {
    if (input.trim().length === 0) {
        console.log('\x1b[31mInvalid input. Please provide a non-empty sentence.\x1b[0m');
        return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(input)) {
        console.log('\x1b[31mInvalid input. Please provide a sentence containing only letters and spaces.\x1b[0m');
        return false;
    }

    if (input.length < 3 || input.length > 300) {
        console.log('\x1b[31mInvalid input length. Please provide a sentence with a length between 3 and 500 characters.\x1b[0m');
        return false;
    }

    return true;
}

const inputSentence = process.argv[2];

if (!inputSentence || inputSentence === '--help' || inputSentence === '-h') {
    console.log(`
\x1b[1mUsage:\x1b[0m
hashtag "Your content goes here"

\x1b[1mDescription:\x1b[0m
This CLI tool generates hashtags based on your input content your Provide. It also provides suggestions for popular hashtags based on the content you provide.

\x1b[1mOptions:\x1b[0m
- "Your content goes here": Provide a content for which you want to generate hashtags.

\x1b[1mExamples:\x1b[0m
hashtag "create tamil kavithai"
`);
} else {
    if (validateInput(inputSentence)) {
        const resultPromise = generateHashtagsWithSuggestions(inputSentence);
        resultPromise.then(result => {
            let suggestedHashtags = result.suggestions.slice(0, 15);
                suggestedHashtags = suggestedHashtags.filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
            console.log('\n');
            console.log('\x1b[32m✅ Generated Hashtags\x1b[0m');
            console.log('\n');
            console.log(result.hashtags.join(', '));
            console.log('\n');
            console.log('\x1b[32m🚀 Suggestions\x1b[0m');
            console.log('\n');
            if (suggestedHashtags.length > 0) {
                console.log(suggestedHashtags.join(', '));
                try {
                    if (process.platform === 'linux') {
                        exec(`echo '${result.hashtags.join(', ')} \n\n ${suggestedHashtags.join(', ')}' | xclip -selection clipboard`);
                    } else if (process.platform === 'darwin') {
                        exec(`echo '${result.hashtags.join(', ')} \n\n ${suggestedHashtags.join(', ')}' | pbcopy`);
                    } else if (process.platform === 'win32') {
                        exec(`echo '${result.hashtags.join(', ')} \n\n ${suggestedHashtags.join(', ')}' | clip`);
                    } else if (process.platform === 'android') {
                        exec(`termux-clipboard-set '${result.hashtags.join(', ')} \n\n ${suggestedHashtags.join(', ')}'`);
                    }
                    console.log('\n');
                    console.log('\x1b[33m✅ Output copied to clipboard!\x1b[0m\n');
                    console.log('\n');
                    process.exit();
                } catch (error) {
                    console.error('Failed to copy output to clipboard');
                }
            } else {
                console.log('No suggested hashtags for this word.');
            }
            console.log('\n');
        }).catch(error => {
            console.error('Failed to generate hashtags:', error);
        });
    }
}
