import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/date-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
isAuth= false;
  private userSub:Subscription;
constructor(private dataStorage: DataStorageService, private authService: AuthService){}

ngOnInit(): void {
  this.userSub=this.authService.user.subscribe(user=>{
this.isAuth= !!user;
console.log(!user);
console.log(!!user);
  });
 }

onSaveData(){
this.dataStorage.storeRecipes();
}
onFetchData(){
this.dataStorage.fetchRecipes().subscribe(recipes=>{

});
}

onLogout(){
  this.authService.logout();
}

ngOnDestroy(): void {
    this.userSub.unsubscribe();
}
}
