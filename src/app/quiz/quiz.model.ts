
export interface QuizRequest {
    fileId: number;
    projectId:number;
}


export interface QuestionContent {
  question: string;
  options: string[]; 
  answer: string;
}

export interface QuizQuestion {
  id: number;
  data: QuestionContent; 
}
