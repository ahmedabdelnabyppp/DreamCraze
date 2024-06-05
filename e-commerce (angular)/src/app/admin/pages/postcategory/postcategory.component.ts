import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validName, validNoSpecialChar, validUrlImage } from '../../../core/validator/Validator';
import { error } from 'console';
import { response } from 'express';

@Component({
  selector: 'app-postcategory',
  templateUrl: './postcategory.component.html',
  styleUrl: './postcategory.component.css'
})
export class PostcategoryComponent implements OnInit {


  constructor(private categoryService: CategoryService, private _FromBuilder: FormBuilder,) { }
  categoryFromResponse: any;
  subscription!: Subscription;
  name!: FormControl;
  image!: FormControl;
  Category_From!: FormGroup;

  ngOnInit(): void {
    this.initialControl();
    this.createForm();
    this.getAllCategory();
  }

  sentRequestTosaveCategory() {
    if (this.Category_From.valid) {
      this.categoryService.createCategory(this.Category_From.value).subscribe(respons => {
        this.getAllCategory();
      }, error => {
        console.log(error)
      })
    }
  }
  initialControl() {
    this.name = new FormControl('', [Validators.required, validName(), validNoSpecialChar]);
    this.image = new FormControl('', [Validators.required, validUrlImage]);
  }
  createForm() {
    this.Category_From = this._FromBuilder.group({
      name: this.name,
      image: this.image,
    });
  }
  deleteCatogary(categoryId: any) {
    this.subscription = this.categoryService.deleteCategory(categoryId).subscribe({
      next: response => {
        this.getAllCategory();
        console.log(response);
      },
      error: error => {
        console.error('Error occurred while deleting category:', error);
      }
    });
  }


  getAllCategory(): void {
    this.subscription = this.categoryService.getAllCategory().subscribe(categoryFromDB => {
      this.categoryFromResponse = categoryFromDB;
    })
  }
  restFrom(): void {
    this.Category_From.patchValue({
      name: '',
      image: '',
    })
  }

}
