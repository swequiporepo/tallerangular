import { Component, OnInit } from '@angular/core';
import { Serie } from './serie';
import { SerieService } from './serie.service';
import { dataSeries } from './dataSeries';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {

  series: Array<Serie> = [];
  constructor(private serieService: SerieService) {}

  dataVistas={
    name: "name",
    description: "description",
    page: "page",
    imageUrl: "imageUrl",
  }
  average:number = 0;

  getCourseList() {
    this.series = dataSeries;
  }

  getCourses() {
    this.serieService.getSeries().subscribe(series => {
      this.series = series;
      this.getAverageSeasons();
    });
  }

  getAverageSeasons() {
    let total: number = 0;
    this.series.forEach((serie) => total = total + serie.seasons);
    this.average = total/this.series.length;
  }

  clickSerie(serieId: number){
    let serie = dataSeries[serieId];
    this.dataVistas.name = serie.name;
    this.dataVistas.page = serie.page;
    this.dataVistas.description = serie.description;
    this.dataVistas.imageUrl = serie.imageUrl;
    document.getElementById('card')!.style.display = "block";
  }

  ngOnInit() {
    this.getCourses();
  }
}
