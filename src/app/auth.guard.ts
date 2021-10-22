import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './services/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private uS: UsersService,
    private router: Router
  ) { }

  canActivate(): boolean {
    if (this.uS.loggedIn()) {
      return true;
    }
    else{
      this.router.navigate(['/Login']);
      return false;
    }

    
  }
  
}
