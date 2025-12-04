import {Component, OnInit} from '@angular/core';
import {RouterModule, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {SearchBar} from "../components/search-bar/search-bar";
import {ProjectCardLibrary} from "./components/project-card-library/project-card-library";
import {LibraryPopupComponent} from "./components/library-popup/library-popup";
import {SuccessPopupComponent} from "./components/success-popup/success-popup";
import {MyProjectService} from "../meus-projetos/my-project.service";

@Component({
  selector: 'app-biblioteca',
    imports: [CommonModule, RouterModule, SearchBar, ProjectCardLibrary, LibraryPopupComponent, SuccessPopupComponent],
  standalone: true,
  templateUrl: './biblioteca.html',
  styleUrl: './biblioteca.scss'
})
export class Biblioteca implements OnInit {
    allProjects: any[] = [];
    projects: any[] = [];
    selectedProject: any = null;

    constructor(private router: Router, private service: MyProjectService) {}

    ngOnInit(): void {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            this.router.navigate(['/login']);
        }

        this.service.getPublicLibrary().subscribe({
            next: (data) => {
                this.projects = data;
                this.allProjects = data;
            }
        });
    }

    popupOpen: boolean = false;
    successOpen: boolean = false;

    openPopup(project: any) {
        this.selectedProject = project;
        this.popupOpen = true;
    }

    closePopup(){
        this.popupOpen = false;
        this.selectedProject = null;
    }

    openSuccessPopup() {
        this.popupOpen = false;
        this.successOpen = true;
    }

    closeSuccessPopup() {
        this.successOpen = false;
    }

    duplicateSelectedProject() {
        if (!this.selectedProject) return;

        this.service.duplicateProject(this.selectedProject.id).subscribe({
            next: () => {
                this.openSuccessPopup();
            },
            error: (err) => {
                console.error("Erro ao duplicar projeto", err);
            }
        });
    }

    filterProjects(text: string) {
        const query = text.toLowerCase().trim();

        this.projects = this.allProjects.filter(p =>
            p.name.toLowerCase().includes(query) ||
            (p.description && p.description.toLowerCase().includes(query)) ||
            (p.ownerName && p.ownerName.toLowerCase().includes(query))
        );
    }

    sortProjects(type: string) {
        if (type === 'az') {
            this.projects.sort((a, b) => a.name.localeCompare(b.name));
        }

        if (type === 'za') {
            this.projects.sort((a, b) => b.name.localeCompare(a.name));
        }

        if (type === 'newest') {
            this.projects.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        }

        if (type === 'oldest') {
            this.projects.sort((a, b) =>
                new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
        }
    }
}
