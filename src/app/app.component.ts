import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = "Please provide The incident name";
  max = 1;
  current = 0;

  updateValue(e) {
    this.text = e.target.value
  }

  /// Start the timer
  start() {
    const interval = Observable.interval(5500);

    interval
      .takeWhile(_ => !this.isFinished)
      .do(i => this.current += 0.1)
      .subscribe();
  }

  /// finish timer
  finish() {
    this.current = this.max;
  }

  speaker(){
    let speech = new SpeechSynthesisUtterance();
    speech.rate = .7;
    speech.pitch = 1;
    speech.volume = 1;
    speech.voice = speechSynthesis.getVoices()[0];
    speech.text = `It is time for hourly update on incident ${this.text}`
    
    speechSynthesis.speak(speech);
    setTimeout(()=>{
      location.reload();
    }, 10000);
  }

  /// reset timer
  reset() {
    this.current = 0;
  }

  /// Getters to prevent NaN errors

  get maxVal() {
    return isNaN(this.max) || this.max < 0.1 ? 0.1 : this.max;
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }

}