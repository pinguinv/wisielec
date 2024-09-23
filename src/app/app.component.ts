import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  guess: string = '';
  words: string[] = [
    'Transcendencja',
    'Szczebrzeszyn',
    'Wyimaginowany',
    'Imponderabilia',
    'Lekkoatletyka',
    'Metamorfoza',
    'Prima Aprilis',
    'Malkontent',
    'Emulgacja',
    'Emulacja',
    'Onomatopeja',
    'Oksymoron',
    'Tranzystor',
    'Florystyka',
    'Ekstrapolacja',
  ];
  word!: string;
  displayWord!: string;
  errors: number = 0;
  errorsLimit: number = 7;
  endText: string | null = null;

  ngOnInit(): void {
    this.word =
      this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
    this.displayWord = this.word.replaceAll(/[A-z]/gm, '_');
    // console.log(this.word);
  }

  checkLetter() {
    this.guess = this.guess.trim().toUpperCase();
    if (!this.guess) return;

    if (this.word.includes(this.guess)) {
      const displayList = this.displayWord.split('');
      for (let i = 0; i < displayList.length; i++) {
        displayList[i] =
          this.word[i] === this.guess ? this.guess : displayList[i];
      }
      this.displayWord = displayList.join('');
    } else {
      this.errors++;
    }
    this.checkResult();
    this.guess = '';
  }

  checkResult() {
    if (this.word === this.displayWord) {
      this.endText = 'Wygrał*ś!';
    }
    if (this.errors >= this.errorsLimit) {
      this.endText = 'Przegrał*ś!';
    }
  }

  restart() {
    this.endText = null;
    this.errors = 0;
    this.guess = '';
    this.word =
      this.words[Math.floor(Math.random() * this.words.length)].toUpperCase();
    this.displayWord = this.word.replaceAll(/[A-z]/gm, '_');
    // console.log(this.word);
  }
}
