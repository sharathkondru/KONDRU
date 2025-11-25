export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TableColumn {
  name: string;
  type: string;
}

export interface TableSchema {
  tableName: string;
  columns: TableColumn[];
  data?: Record<string, string | number | boolean>[];
}

export interface SqlResult {
  columns: string[];
  rows: any[][];
  error?: string;
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard';
export type QuestionStatus = 'Not Started' | 'In Progress' | 'Completed';

export interface QuestionData {
  id: number;
  title: string;
  description: string;
  company: string;
  difficulty: Difficulty;
  status: QuestionStatus;
  tags: string[];
  tables: TableSchema[];
}

export enum InterviewState {
  INTRODUCTION = 'INTRODUCTION',
  CODING = 'CODING',
  REVIEW = 'REVIEW',
}
