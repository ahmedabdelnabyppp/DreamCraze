import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { validName, validNoSpecialChar, validNumber } from '../../../core/validator/Validator';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { translateAnimation } from '../../../shared/animations/translateAnimation';
import { AnimationOpcity } from '../../../shared/animations/opacityAnimation';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css'],
  animations: [AnimationOpcity, translateAnimation]
})
export class PostProductComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  id!: FormControl
  name!: FormControl;
  image!: FormControl;
  description!: FormControl;
  brand!: FormControl;
  rate!: FormControl;
  price!: FormControl;
  quantity!: FormControl;
  category!: FormControl;
  subscription!: Subscription;
  categoryInSelect: any[] = [];
  allproduct: any;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalItems!: number;
  productPerTable: any;
  showMassage: boolean = false;
  massage: string = 'save product';
  activeUpdate: boolean = false;
  ProductDataInFormUpdateProduct: any;

  constructor(
    private _FromBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    this.initialControl();
    this.createForm();
    this.getAllCategories();
    this.getAllProduct()
  }

  initialControl() {
    this.id = new FormControl('');
    this.name = new FormControl('', { validators: [Validators.required, validNoSpecialChar], updateOn: 'blur' });
    this.brand = new FormControl('', [Validators.required, validName()]);
    this.rate = new FormControl('', [Validators.required, validNumber]);
    this.description = new FormControl('', [Validators.required]);
    this.category = new FormControl(null, [Validators.required]);
    this.price = new FormControl('', [Validators.required, validNumber]);
    this.quantity = new FormControl('', [Validators.required, validNumber]);
  }
  active() {
    this.activeUpdate = !this.activeUpdate;
  }
  back() {
    this.activeUpdate = !this.activeUpdate;
    this.restForm()
  }
  createForm() {
    this.productForm = this._FromBuilder.group({
      id: this.id,
      name: this.name,
      image: this.image,
      description: this.description,
      brand: this.brand,
      rate: this.rate,
      price: this.price,
      quantity: this.quantity,
      category: this.category

    });
  }

  postProduct(): void {
    if (this.productForm.valid) {
      this.productService.saveProductInDatabase(this.productForm.value).subscribe(data => {
        if (data.status == "success") {
          this.massage = "create successfully";
          this.getAllProduct();
          this.restForm();
          setTimeout(() => {
            this.massage = "save product"
          }, 2000)
        }
        this.productForm.reset();
      });
    }
  }

  getAllCategories(): void {
    this.subscription = this.categoryService.getAllCategory().subscribe(categories => {
      this.categoryInSelect = categories;
    });
  }

  getAllProduct(): void {
    this.subscription = this.productService.getAllProduct().subscribe(productFromDB => {
      this.allproduct = productFromDB;
      this.productPerTable = this.allproduct;
      this.totalItems = this.allproduct.length;
      this.loadproduct();

    })
  }
  deleteProductFromTable(productId: string): void {
    this.productService.deleteProduct(productId).subscribe(data => {
      console.log(data)
      if (data.status == "success") {
        this.getAllProduct();
        setTimeout(() => {
          this.showMassage = true;
        }, 1000)
        setTimeout(() => {
          this.showMassage = false;
        }, 5000)
      }
    });
  }

  loadproduct() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.productPerTable = this.allproduct.slice(startIndex, endIndex);
    console.log(startIndex, endIndex)
  }

  restForm() {
    this.productForm.patchValue({
      id: '',
      name: '',
      image: '',
      description: '',
      brand: '',
      rate: '',
      quantity: '',
      price: ''
    });
  }
  nextPage(): void {
    if ((this.currentPage * this.itemsPerPage) < this.totalItems) {
      this.currentPage++;
      console.log(this.currentPage)
      this.loadproduct();

    }
  }
  updateProduct(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value).subscribe(data => {
        this.getAllProduct();
        if (data.status == "success") {
          this.massage = data.message;
          setTimeout(() => {
            this.massage = "save product"
            this.back()
          }, 2000)
        }
        this.productForm.reset();
      });
    }
  }

  setProductDataInFormUpdateProduct(productData: any) {
    this.ProductDataInFormUpdateProduct = productData
    this.productForm.patchValue({
      id: this.ProductDataInFormUpdateProduct.id,
      name: this.ProductDataInFormUpdateProduct.name,
      image: this.ProductDataInFormUpdateProduct.image,
      description: this.ProductDataInFormUpdateProduct.description,
      brand: this.ProductDataInFormUpdateProduct.brand,
      rate: '' + this.ProductDataInFormUpdateProduct.rate,
      price: '' + this.ProductDataInFormUpdateProduct.price,
      quantity: '' + this.ProductDataInFormUpdateProduct.quantity,

    })
    console.log(this.ProductDataInFormUpdateProduct)
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadproduct();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
