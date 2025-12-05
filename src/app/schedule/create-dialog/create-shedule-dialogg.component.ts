import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ScheduleRequest } from '../schedule.service';

interface ProjectFile {
    studyProject: number;
    fileId: number;
    fileName: string;
    studyProjectName: string;
}

interface StudyProject {
    id: number;
    name: string;
}

@Component({
    selector: 'app-create-schedule-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule
    ],
    templateUrl: './create-shedule-dialog.component.html',
    styleUrl: './create-shedule-dialog.component.scss'
})
export class CreateScheduleDialogComponent implements OnInit {

    scheduleForm: FormGroup;
    weekOptions = [1, 2, 3];

    allProjectFiles: ProjectFile[] = []; 
    studyProjects: StudyProject[] = [];
    filteredFiles: ProjectFile[] = [];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<CreateScheduleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { projectFiles: ProjectFile[] }
    ) {
        this.allProjectFiles = this.data.projectFiles || [];

        this.scheduleForm = this.fb.group({
            title: ['', Validators.required],
            dailyHours: [
                '',
                [Validators.required, Validators.min(1), Validators.max(12), Validators.pattern(/^[0-9]*$/)]
            ],
            totalWeeks: ['', Validators.required],
            selectedProjectId: ['', Validators.required],
            selectedFileId: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.processProjectData();
        this.setupProjectChangeListener();
    }


    processProjectData(): void {
        if (this.allProjectFiles.length === 0) {
            console.warn("Nenhum dado de projeto/arquivo foi injetado.");
            return;
        }

        const uniqueProjects = new Map<number, string>();
        this.allProjectFiles.forEach(item => {
            if (!uniqueProjects.has(item.studyProject)) {
                uniqueProjects.set(item.studyProject, item.studyProjectName);
            }
        });

        this.studyProjects = Array.from(uniqueProjects.entries()).map(([id, name]) => ({
            id: id,
            name: name
        }));
    }

    setupProjectChangeListener(): void {
        this.scheduleForm.get('selectedProjectId')?.valueChanges.subscribe(projectId => {
            this.filterFilesByProject(projectId);
            this.scheduleForm.get('selectedFileId')?.setValue('');
        });
    }

    filterFilesByProject(projectId: any): void {
        const id = parseInt(projectId, 10);

        if (!isNaN(id)) {
            this.filteredFiles = this.allProjectFiles.filter(
                file => file.studyProject === id
            );
            console.log('Arquivos filtrados:', this.filteredFiles);
        } else {
            this.filteredFiles = [];
        }
    }

    onCancel(): void {
        this.dialogRef.close();
    }


    onSubmit(): void {
        if (this.scheduleForm.valid) {
            const formValue = this.scheduleForm.value;
            const result : ScheduleRequest= {
                title: formValue.title,
                studyTimePerDay: formValue.dailyHours,
                weeks: formValue.totalWeeks,
                studyProjectId: formValue.selectedProjectId, 
                fileId: formValue.selectedFileId 
            };

            this.dialogRef.close(result);
        }
    }
}