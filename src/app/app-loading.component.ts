import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="flex space-x-2">
        <div class="h-4 w-4 bg-white rounded-full animate-bounce-custom"></div>
        <div
          class="h-4 w-4 bg-white rounded-full animate-bounce-custom delay-200"
        ></div>
        <div
          class="h-4 w-4 bg-white rounded-full animate-bounce-custom delay-400"
        ></div>
      </div>
    </div>
  `,
  styles: [
    `
      .animate-bounce-custom {
        animation: bounce 0.6s infinite alternate;
      }
      .delay-200 {
        animation-delay: 0.2s;
      }
      .delay-400 {
        animation-delay: 0.4s;
      }

      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        100% {
          transform: translateY(-10px);
        }
      }
    `,
  ],
})
export class AppLoadingComponent {}
