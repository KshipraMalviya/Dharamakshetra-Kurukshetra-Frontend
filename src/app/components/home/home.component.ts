import { Component, OnInit, ViewEncapsulation, Renderer2, ElementRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RecommendationsComponent } from '../recommendations/recommendations.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecommendationsComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{
  Krishna: string;
  Arjun: string;
  Gita: string;
  Sheikh: string;
  BMS: string;
  Jyotisar: string;
  Museum: string;
  Dharohar: string;
  Uncle: string;
  Foreigner: string;
  Guy: string;
  Search: string;

  weatherWidgetHtml: string = '<a class="weatherwidget-io" href="https://forecast7.com/en/29d9776d88/kurukshetra/" data-label_1="KURUKSHETRA" data-label_2="WEATHER" data-theme="blue-mountains">KURUKSHETRA WEATHER</a>';

  weatherWidgetHtmlSafe: SafeHtml | undefined;

  ImagePath: string = '/assets/images/';

  constructor (private sanitizer: DomSanitizer, private renderer: Renderer2, private el: ElementRef) {

    this.Krishna = this.ImagePath + 'krishna.jpg';
    this.Arjun = this.ImagePath + 'arjun.jpg';
    this.Gita = this.ImagePath + 'gita.jpeg';
    this.Sheikh = this.ImagePath + 'sheikh.jpeg';
    this.BMS = this.ImagePath + 'bms.jpeg';
    this.Jyotisar = this.ImagePath + 'jyotisar.jpeg';
    this.Museum = this.ImagePath + 'krishnaMuseum.jpeg';
    this.Dharohar = this.ImagePath + 'dhrohar.jpeg';
    this.Uncle = this.ImagePath + 'uncle.jpeg';
    this.Foreigner = this.ImagePath + 'foreigner.jpeg';
    this.Guy = this.ImagePath + 'guy.jpeg';
    this.Search = this.ImagePath + 'searchicon.jpg'
  }
  ngOnInit(): void {
    this.weatherWidgetHtmlSafe = this.sanitizer.bypassSecurityTrustHtml(this.weatherWidgetHtml);
    this.loadWeatherWidgetScript();
  }

  private loadWeatherWidgetScript(): void {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://weatherwidget.io/js/widget.min.js';

    // Append the script to the component's element
    this.renderer.appendChild(this.el.nativeElement, script);
  }
}
