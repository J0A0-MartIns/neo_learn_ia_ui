import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CreateScheduleDialogComponent } from './create-dialog/create-shedule-dialogg.component';
import { MyProjectService } from '../meus-projetos/my-project.service';

@Component({
  selector: 'app-schedule-component',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './schedule-component.html',
  styleUrl: './schedule-component.scss'
})
export class ScheduleComponent implements OnInit {
  scheduleData: any;
  currentWeek: number = 1;
  projectFilesData: any[] = [];

  constructor(private service: ScheduleService, private dialog: MatDialog, private serviceProjects: MyProjectService) { }

  setCurrentWeek(week: number) {
    this.currentWeek = week;
  }
  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Easy': return 'easy';
      case 'Medium': return 'medium';
      case 'Hard': return 'hard';
      default: return '';
    }
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  public loadSheduleById(id: number) {
    const scheduleId = 1;

    this.service.getById(id).subscribe({
      next: (response) => {
        this.scheduleData = response.scheduleData;

        if (this.scheduleData?.schedule?.length > 0) {
          this.currentWeek = this.scheduleData.schedule[0].week;
        }
      },
      error: (e) => {
        console.error('Erro ao buscar cronograma', e);
      }
    });
  }
  openCreateScheduleDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      projectFiles: this.projectFilesData
    };

    const dialogRef = this.dialog.open(CreateScheduleDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('O dialog foi fechado. Resultado:', result);

    });
  }
  loadProjects() {
    this.serviceProjects.findAllListforShedule().subscribe({
      next: (response) => {
        this.projectFilesData = response;
        console.log('Dados Carregados: ', response);
      },
      error: (err) => {
        console.error('Erro ao carregados projetos : ', err);
      }
    });
  }

}
