import { GoogleGenAI, Type } from "@google/genai";
import { SqlResult, TableSchema } from "../types";

const apiKey = process.env.API_KEY || ''; // Ensure this is available
const ai = new GoogleGenAI({ apiKey });

// System instruction for the Interviewer Persona
const INTERVIEWER_INSTRUCTION = `
You are Tara, a friendly but rigorous SQL interviewer at a top tech company (like Apple).
Your goal is to guide the candidate through an SQL interview question.
1. Start by briefly introducing yourself if you haven't.
2. If the user asks for help, give a subtle hint, don't write the code for them immediately.
3. If the user shares their approach, critique it constructively.
4. Keep your responses concise and conversational. Do not output long markdown blocks unless necessary.
`;

export const chatWithDawn = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: INTERVIEWER_INSTRUCTION,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I'm having trouble connecting to the server right now.";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I apologize, but I seem to be having technical difficulties.";
  }
};

// This function simulates a database engine using Gemini. 
// Since we don't have a real backend DB, we ask Gemini to hallucinate the result of the query 
// strictly based on the provided schema and a "virtual" dataset logic.
export const mockExecuteSql = async (
  query: string,
  tables: TableSchema[]
): Promise<SqlResult> => {
  try {
    const tableContext = tables.map(t => 
      `Table ${t.tableName}: (${t.columns.map(c => `${c.name} ${c.type}`).join(', ')})`
    ).join('\n');

    const prompt = `
      Act as a SQL Engine.
      Here is the database schema:
      ${tableContext}

      The user ran this query:
      \`\`\`sql
      ${query}
      \`\`\`

      Generate a realistic result set for this query assuming the context of the current problem.
      Return ONLY a JSON object with the following structure:
      {
        "columns": ["col1", "col2"],
        "rows": [["val1", "val2"], ["val3", "val4"]]
      }
      
      If the SQL syntax is invalid, return:
      {
        "error": "Description of syntax error"
      }
      
      Do not wrap in markdown code blocks. Return raw JSON.
    `;

    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                columns: { type: Type.ARRAY, items: { type: Type.STRING } },
                rows: { type: Type.ARRAY, items: { type: Type.ARRAY, items: { type: Type.STRING } } },
                error: { type: Type.STRING }
            }
        }
      }
    });

    const jsonText = result.text;
    if (!jsonText) throw new Error("No response from AI DB");
    
    return JSON.parse(jsonText) as SqlResult;

  } catch (error) {
    console.error("SQL Execution Error:", error);
    return {
      columns: [],
      rows: [],
      error: "Failed to execute query. Please check your syntax."
    };
  }
};