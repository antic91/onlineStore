import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descripion-comp',
  templateUrl: './descripion-comp.component.html',
  styleUrls: ['./descripion-comp.component.css']
})
export class DescripionCompComponent implements OnInit {
  @Input("data") data!: any;
  constructor() { }

  ngOnInit(): void {
  }

}
