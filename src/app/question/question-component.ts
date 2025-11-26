import { Component } from '@angular/core';

@Component({
    selector: 'app-question',
    templateUrl: './question-component.html',
    styleUrls: ['./question-component.scss'],
})
export class QuestionComponent {
    questionNumber = 1;
    totalQuestions = 10;

    questionText = `Ao efetuar o pagamento de um empréstimo de R$ 10.000,00
  com juros simples de 5% ao mês, qual será o valor total pago após 3 meses?`;

    options = [
        { letter: 'A', text: 'R$ 11.000,00' },
        { letter: 'B', text: 'R$ 11.500,00' },
        { letter: 'C', text: 'R$ 12.000,00' },
        { letter: 'D', text: 'R$ 12.500,00' }
    ];

    selectedOption: string | null = null;

    selectOption(letter: string) {
        this.selectedOption = letter;
    }

    submitAnswer() {
        console.log('Resposta enviada:', this.selectedOption);
    }
}
