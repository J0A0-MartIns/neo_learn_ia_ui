import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { StudyProject } from '../../shared/models/responseFindAllProjects';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.scss']
})
export class ProjectCardComponent {

  attachmentsToShow: string[] = [];
  overflowCount = 0;

  private _projectData!: StudyProject;

  @Input()
  set projectData(data: StudyProject) {
    if (!data) return;

    this._projectData = data;

    const attachments = data.attachments || [];
    const total = attachments.length;

    if (total <= 3) {
      this.attachmentsToShow = attachments.map(a => a.fileName);
      this.overflowCount = 0;
    } else {
      this.attachmentsToShow = attachments.slice(0, 3).map(a => a.fileName);
      this.overflowCount = total - 3;
    }
  }

  get projectData(): StudyProject {
    return this._projectData;
  }
}