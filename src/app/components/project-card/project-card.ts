import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudyProject } from '../../shared/models/responseFindAllProjects'; 
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-card.html',
  styleUrls: ['./project-card.scss'] 
})
export class ProjectCardComponent {

  attachmentsToShow: string[] = [];
  overflowCount = 0;

  private _projectData!: StudyProject;

  @Input()
  set projectData(data: StudyProject) {
    if (!data || !data.attachments) return;

    this._projectData = data;
    const total = data.attachments.length;

    if (total <= 3) {
      this.attachmentsToShow = data.attachments.map(a => a.fileName);
      this.overflowCount = 0;
    } else {
      this.attachmentsToShow = data.attachments.slice(0, 3).map(a => a.fileName);
      this.overflowCount = total - 3;
    }
  }

  get projectData(): StudyProject {
    return this._projectData;
  }
}
