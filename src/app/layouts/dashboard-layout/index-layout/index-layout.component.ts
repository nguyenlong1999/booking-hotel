import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import * as Rellax from 'rellax';
import {NgbAccordionConfig, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
    selector: 'app-index-layout',
    templateUrl: './index-layout.component.html',
    styleUrls: ['./index-layout.component.scss']
})
export class IndexLayoutComponent implements OnInit {
    data: Date = new Date();

    page = 4;
    page1 = 5;
    page2 = 3;
    focus;
    focus1;
    focus2;

    private formSearch: FormGroup;
    date: { year: number, month: number };
    model: NgbDateStruct;
    selected = {
        startDate: moment('2015-11-18T00:00Z'),
        endDate: moment('2015-11-26T00:00Z'),
    };
    public isCollapsed = true;
    public isCollapsed1 = true;
    public isCollapsed2 = true;

    state_icon_primary = true;

    constructor(
        private renderer: Renderer2,
        config: NgbAccordionConfig,
        private formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
        config.closeOthers = true;
        config.type = 'info';

        this.formSearch = this.formBuilder.group({
            name: [''],
            dateRange: [''],
            roomType: [''],
        });
    }

    isWeekend(date: NgbDateStruct) {
        const d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    }

    isDisabled(date: NgbDateStruct, current: { month: number }) {
        return date.month !== current.month;
    }

    ngOnInit() {
        var rellaxHeader = new Rellax('.rellax-header');

        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.add('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('index-page');
    }

    search(){
        console.log(this.formSearch.value,this.selected);
    }
    ngOnDestroy() {
        var navbar = document.getElementsByTagName('nav')[0];
        navbar.classList.remove('navbar-transparent');
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('index-page');
    }
}
