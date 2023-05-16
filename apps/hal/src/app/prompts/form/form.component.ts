import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Prompt, PromptType } from '@space-odyssey/eva';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'prompts-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styles: [],
})
export class PromptsFormComponent implements AfterViewChecked{
  @Input() prompts: Prompt[] = [];
  @Output() promptSubmit = new EventEmitter<Prompt>();

  @ViewChild("form") form!: NgForm;
  @ViewChild("conversation") conversation!: ElementRef;

  onSubmit(prompt: Prompt){
    if(!prompt.text){
      return
    }
    this.promptSubmit.emit({
      ...prompt,
      id: uuid(),
      type: PromptType.HUMAN
    } as Prompt);
    this.form.resetForm();
  }

  ngAfterViewChecked(): void {
    this.conversation.nativeElement.scrollTop = this.conversation.nativeElement.scrollHeight;
  }
}
