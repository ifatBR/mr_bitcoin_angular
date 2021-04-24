import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/models/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class ContactPreviewComponent implements OnInit {
  @Input() contact:Contact;
  isLoaded:boolean
  constructor() { 
    this.isLoaded=false;
  }
  hideLoader(){
    console.log('loaded');
    this.isLoaded = true
  }
  ngOnInit(): void {
  }

}
