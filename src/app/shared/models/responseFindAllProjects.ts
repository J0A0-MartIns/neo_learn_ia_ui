export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  origin: string;
}

export interface StudyProject {
  id: string;
  name: string;
  description: string;
  attachments: Attachment[];
}