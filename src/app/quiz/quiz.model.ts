export interface Quiz {
    id: number;
    pergunta: string;
    alternativas: string[];
    correta: number;
}

export interface QuizQuestion {
    id: number;
    text: string;
    options: {
        id: number;
        text: string;
        correct: boolean;
    }[];
}
