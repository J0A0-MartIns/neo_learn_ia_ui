import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-project-card-library',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './project-card-library.html',
    styleUrls: ['./project-card-library.scss']
})
export class ProjectCardLibrary implements OnInit {

    @Input() project: any;
    @Output() open = new EventEmitter<void>();

    ngOnInit(): void {}

    onOpen() {
        this.open.emit();
    }

    getFirstFileName(): string {
        const name = this.project?.attachments?.[0]?.fileName || 'Sem documentos';
        return this.truncate(name, 32);
    }

    getExtraCount(): number {
        return Math.max(0, (this.project?.attachments?.length || 0) - 1);
    }

    private truncate(str: string, max: number): string {
        if (str.length <= max) return str;
        return str.substring(0, max) + '…';
    }
}
