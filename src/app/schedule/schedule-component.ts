import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule-component',
  imports: [CommonModule],
  templateUrl: './schedule-component.html',
  styleUrl: './schedule-component.scss'
})
export class ScheduleComponent implements OnInit {
  scheduleData: any;
  currentWeek: number = 1;

  constructor(private service: ScheduleService) { }

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
    const scheduleId = 1;

    this.service.getById(scheduleId).subscribe({
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

}
