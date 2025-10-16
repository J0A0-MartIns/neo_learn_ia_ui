import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../project-card/project-card';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCard
  ],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss'
})
export class ProjectList {

  projetos = [
    {
      id: 1,
      titulo: 'Análise de Sentimentos em Mídias Sociais',
      descricao: 'Projeto para analisar comentários de usuários e classificar o sentimento predominante.',
      conteudo: [
        'Relatorio_Inicial.pdf',
        'Grafico_Resultados.png',
        'Dados_Coletados.xlsx',
        'Apresentacao.docx',
        'TesteOverflow1.top',
        'TesteOverflow2.top'
      ]
    },
    {
      id: 2,
      titulo: 'Sistema de Gestão de Estoque',
      descricao: 'Desenvolvimento de um sistema para controle de entrada e saída de produtos.',
      conteudo: [
        'Requisitos.pdf',
        'Diagrama_BD.jpg',
        'Edital.pdf'
      ]
    },
    {
      id: 3,
      titulo: 'Website Institucional',
      descricao: 'Criação do novo website da empresa com foco em SEO e experiência do usuário.',
      conteudo: [
        'Layout_Home.png',
        'Layout_Contato.png',
        'Textos_Site.docx'
      ]
    },
    {
      id: 4,
      titulo: 'Aplicativo de Delivery',
      descricao: 'App mobile para conectar restaurantes a clientes, com sistema de pagamento integrado.',
      conteudo: [
        'Protótipo_Figma.pdf',
        'logo_app.svg',
        'pesquisa_mercado.pptx'
      ]
    },
    {
      id: 5,
      titulo: 'Dashboard de Vendas',
      descricao: 'Plataforma de BI para visualização em tempo real das métricas de vendas da equipe.',
      conteudo: [
        'dados_vendas_2024.csv',
        'manual_dashboard.pdf'
      ]
    },
    {
      id: 6,
      titulo: 'Automação de Marketing',
      descricao: 'Configuração de fluxos de e-mail para nutrição de leads e recuperação de carrinhos.',
      conteudo: [
        'Fluxo_Nutrição.png',
        'Copy_Emails.docx',
        'Relatorio_Taxas.pdf'
      ]
    },
    {
      id: 7,
      titulo: 'Inteligência Artificial para RH',
      descricao: 'Desenvolvimento de um modelo para triagem automática de currículos com base em relevância.',
      conteudo: [
        'Modelo_IA.py',
        'dataset_cvs.zip',
        'Resultados.pdf'
      ]
    },
    {
      id: 8,
      titulo: 'Migração para Nuvem AWS',
      descricao: 'Planejamento e execução da migração da infraestrutura local para a nuvem da Amazon.',
      conteudo: [
        'Cronograma_Migracao.xlsx',
        'Arquitetura_AWS.png'
      ]
    },
    {
      id: 9,
      titulo: 'Treinamento de Equipe',
      descricao: 'Criação de material e workshops sobre as novas ferramentas de gestão de projetos.',
      conteudo: [
        'Apresentacao_Workshop.pptx',
        'Guia_Ferramentas.pdf',
        'Feedback_Form.docx'
      ]
    }
  ];
}