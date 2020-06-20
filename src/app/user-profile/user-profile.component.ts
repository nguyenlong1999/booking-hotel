import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/shared/service/user.service.';
import { User } from 'app/shared/model/user';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  genders = [
    { value: '0', viewValue: 'Nam' },
    { value: '1', viewValue: 'Nữ' },
    { value: '2', viewValue: 'Không xác định' }
  ];
  years: number[] = [];
  genderValue: String;
  url: any;
  user: User;
  year: '1950';
  // email: String;
  imageUrl: String = 'jbiajl3qqdzshdw0z749';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private cookies: CookieService
  ) { }

  ngOnInit() {
    this.getMemerInfo();
    this.getAllYear();
  }
  getMemerInfo() {
    let email = this.cookies.get('email');
    console.log(email);
    // this.id = this.route.snapshot.params.id;
    this.userService.getMemberInfo(email).subscribe(user => {
      console.log(user)
      if (user !== undefined) {
        this.user = user;
        this.genderValue = user.gender;
        if (user.imageUrl !== '') {
          this.imageUrl = user.imageUrl
        }
        // this.recipeService.getRecipes().subscribe(recipes => {
        //   if (recipes !== undefined) {
        //     this.userObject.email = this.cookie.get('email')
        //     if (this.userObject.email !== undefined || this.userObject.email !== '') {
        //       this.recipeService.findInterest(this.userObject).subscribe(data => {
        //         let interests = data.body['interests']



        //         for (let recipe of recipes) {
        //           if (recipe.user._id === user._id) {
        //             recipe.like = false
        //             if (recipe.hardLevel !== undefined) {
        //               if (recipe.hardLevel === "") {
        //                 recipe.hardLevel = "Không xác định";
        //               } else if (recipe.hardLevel === "1") {
        //                 recipe.hardLevel = "Dễ";
        //               } else if (recipe.hardLevel === "2") {
        //                 recipe.hardLevel = "Trung bình";
        //               } else if (recipe.hardLevel === "3") {
        //                 recipe.hardLevel = "Khó";
        //               } else if (recipe.hardLevel === "4") {
        //                 recipe.hardLevel = "Rất khó";
        //               }
        //             }
        //             console.log(recipe.user.name)
        //             this.recipeCount++
        //             this.doneCount = this.doneCount + recipe.doneCount
        //             this.viewCount = this.viewCount + recipe.viewCount
        //             recipe.like = false
        //             this.memberRecipes.push(recipe)

        //             if (interests !== undefined) {
        //               for (let interest of interests) {
        //                 if (interest.objectId._id === recipe._id && interest.objectType === '2') {
        //                   recipe.like = true
        //                 }
        //               }
        //             }
        //           }
        //         }

        //         this.galleryService.getGalleryies().subscribe(gallerys => {
        //           if (gallerys !== undefined) {
        //             for (let gallery of gallerys) {
        //               if (gallery.user._id === user._id) {
        //                 if (gallery.recipe.length > 0) {
        //                   gallery.image = gallery.recipe[0].imageUrl
        //                 } else {
        //                   gallery.image = 'fvt7rkr59r9d7wk8ndbd'
        //                 }
        //                 this.memberGallery.push(gallery)
        //               }
        //               if (interests !== undefined) {
        //                 for (let interest of interests) {
        //                   if (interest.objectId._id === gallery._id && interest.objectType === '1') {
        //                     gallery.like = true
        //                   }
        //                 }
        //               }
        //             }
        //             this.galleryCount = this.memberGallery.length

        //           }
        //         })
        //         this.memberInfo = user
        //         this.infoCheck = true;
        //       })
        //     }
        //   }
        // });
      }
    })
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  getAllYear() {
    let temp = parseInt(new Date().getFullYear().toString()) - 4;

    for (let i = 0; i < 100; i++) {
      let year = (temp - i);
      this.years.push(year)
    }

  }
}
