import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { MatIconModule } from '@angular/material/icon';
import {MyProjectService, ProjectCreateData} from "../my-project.service";
import {MatSnackBar} from "@angular/material/snack-bar";

export interface ProjectDetailsData {
    title: string;
    createdAt: string;
    updatedAt: string;
    visibility: string;
    description: string;
    tags: string[];
    views: number;
    rating: number;
    documents: string[];
}

@Component({
    selector: 'app-project-details-dialog',
    standalone: true,
    templateUrl: './project-details-dialog.component.html',
    styleUrls: ['./project-details-dialog.component.scss'],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
})
export class ProjectDetailsDialogComponent {
    form: FormGroup;


    documents: File[] = [];

    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<ProjectDetailsDialogComponent>,
        private service: MyProjectService,
        private snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.form = this.fb.group({
            name: ['', Validators.required],
            description: [''],
            is_public: [false]
        });
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.documents.push(file);
        }
    }

    removeDocument(index: number) {
        this.documents.splice(index, 1);
    }

    cancel() {
        this.dialogRef.close();
    }

    save() {
        if (this.documents.length === 0) {
            this.snackBar.open('É obrigatório anexar pelo menos um arquivo.', 'Atenção', {
                duration: 3000,
                verticalPosition: 'top',
                horizontalPosition: 'center',
                panelClass: ['warning-snackbar'] // Você pode estilizar isso no CSS se quiser
            });
            return; // Interrompe a execução aqui
        }

        if (this.form.valid) {
            const project : ProjectCreateData = {
                ...this.form.value,
                file: this.documents,
            };

            this.service.create(project).subscribe({
                next: (response) => {
                    this.dialogRef.close(project);
                    console.log('Projeto criado com sucesso!', response);
                    this.snackBar.open('Projeto criado com sucesso!', '', {
                        duration: 2000,
                        verticalPosition: 'top',
                        horizontalPosition: 'center',
                        panelClass: ['success-snackbar']
                    });
                },
                error: (err) => {
                    console.error('Erro ao Criar Projeto', err);
                }
            });
        }


    }
}




