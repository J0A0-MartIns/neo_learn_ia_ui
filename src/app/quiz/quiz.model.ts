export interface Quiz {
    id: number;
    title: string;
    description: string;
    questions: QuizQuestion[];
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: QuizOption[];
}

export interface QuizOption {
    id: number;
    text: string;
    correct: boolean;
}

export interface QuizResult {
    quizId: number;
    totalQuestions: number;
    correctAnswers: number;
}
