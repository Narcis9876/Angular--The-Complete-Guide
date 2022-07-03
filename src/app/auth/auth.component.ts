import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  selector:'app-auth',
  templateUrl:'./auth.component.html',
  styles:[]
})

export class AuthComponent{
 isLoginMode= true;
isLoading= false;
error:string=null;


constructor( private authService: AuthService, private router:Router){}

 onSwitchMode(){
this.isLoginMode= !this.isLoginMode;
 }
 onSubmit(form: NgForm){
   if(!form.valid){
     return;
   }
const email= form.value.email;
const password= form.value.password;
this.isLoading=true;

if(this.isLoginMode){
this.authService.login(email, password).subscribe(respData=>{
  console.log(respData);
  this.isLoading=false;
  this.router.navigate(['/recipes']);
},
errorMessage=>{
  console.log(errorMessage);
this.error=errorMessage;
  this.isLoading=false;

});
}
else{
  this.authService.signUp(email, password).subscribe(respData=>{
    console.log(respData);
    this.isLoading=false;
    this.router.navigate(['/recipes']);
  },
  errorMessage=>{
    console.log(errorMessage);
this.error=errorMessage;
    this.isLoading=false;

  });


}

form.reset();
 }
}
