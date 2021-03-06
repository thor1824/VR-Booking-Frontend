import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from '../../../../services/Product/product.service';
import {Category} from '../../../../models/category';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryService} from '../../../../services/Category/category.service';
import {Location} from '@angular/common';

const placeholderImage: string = 'https://1001freedownloads.s3.amazonaws.com/vector/thumb/63319/Placeholder.png';

@Component({
  selector: 'app-product-add',
  templateUrl: './equipment-add.component.html',
  styleUrls: ['./equipment-add.component.scss']
})
export class EquipmentAddComponent implements OnInit {

  categories: Category[];
  productForm: FormGroup;
  usedImageUrl: string;
  tempImageUrl: string;
  private currentImageBehave: BehaviorSubject<string>;
  private currentImageObv: Observable<string>;

  constructor(private categoryService: CategoryService, private productService: ProductService, private location: Location) {
    this.usedImageUrl = placeholderImage;
    this.currentImageBehave = new BehaviorSubject<string>(placeholderImage);
    this.currentImageObv = this.currentImageBehave.asObservable();
    this.productForm = new FormGroup({
      imgUrl: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      shortDescription: new FormControl(''),
      category: new FormControl('')
    });
  }

  get formImgUrl() {
    return this.productForm.get('imgUrl');
  }

  get formName() {
    return this.productForm.get('name');
  }

  get formDescription() {
    return this.productForm.get('description');
  }

  get formShortDescription() {
    return this.productForm.get('shortDescription');
  }

  get formCategory() {
    return this.productForm.get('category');
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
  }

  onSetImage() {
    this.currentImageBehave.next(this.tempImageUrl);
    this.usedImageUrl = this.tempImageUrl;
    this.formImgUrl.setValue(this.usedImageUrl);
  }

  setDefault() {
    this.currentImageBehave.next(placeholderImage);
    this.tempImageUrl = '';
    this.formImgUrl.setValue('');
  }

  onCancel() {
    this.location.back();
  }

  onAdd() {
    if (this.productForm.valid) {
      console.log(this.productForm);
      this.productService.createProduct({
        imgUrl: this.formImgUrl.value,
        category: this.categories.find(s => s.id === this.formCategory.value),
        description: this.formDescription.value,
        name: this.formName.value
      })
        .subscribe(() => {
          this.location.back();
        });
    }
  }
}
