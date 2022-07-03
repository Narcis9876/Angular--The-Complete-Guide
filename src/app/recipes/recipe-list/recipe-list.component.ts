import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
subsription:Subscription;
  constructor(private recipeService: RecipeService,
    private router:Router, private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.subsription=this.recipeService.recipeChanged.subscribe(
(recipes:Recipe[])=>{
  this.recipes=recipes;
}

    )
  }
  onNewRecipe(){
this.router.navigate(['new'], {relativeTo:this.route});
  }
  ngOnDestroy(): void {
      this.subsription.unsubscribe();
  }
}