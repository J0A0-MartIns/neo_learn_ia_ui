import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { CommonModule} from "@angular/common";
import { environment} from "../../../environment/environment";

@Component({
  standalone: true,
  selector: 'app-library-popup',
  imports: [CommonModule],
  templateUrl: './library-popup.html',
  styleUrls: ['./library-popup.scss']
})
export class LibraryPopupComponent implements OnChanges {

    @Input() project: any;
    @Input() isOpen: boolean = false;
    @Output() close = new EventEmitter<void>();
    @Output() addProject = new EventEmitter<void>();

    docs: any[] = [];

    ngOnChanges() {
        if (this.project) {
            this.docs = this.project.attachments || [];
        }
    }

    openFile(file: any) {
        window.open(`${environment.apiUrl}/files/view/${file.id}`, "_blank");
    }

    downloadAll() {
        window.open(`${environment.apiUrl}/files/download-all/${this.project.id}`, "_blank");
    }

    closePopup() {
        this.close.emit();
    }

    onAddProject() {
        this.addProject.emit();
    }

}
