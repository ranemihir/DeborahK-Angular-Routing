import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, Event } from '@angular/router';

import { AuthService } from './user/auth.service';
import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = false;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.loading = false;
      }
    });
  }

  showMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  get isDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
    this.router.navigateByUrl('/welcome');
  }
}
