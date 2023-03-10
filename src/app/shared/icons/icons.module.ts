import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';

import {
  faTrash,
  faSave,
  faEdit,
  faEyeSlash,
  faEye,
  faPlus,
  faHome,
  faUserFriends,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [CommonModule, FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faTrash,
      faSave,
      faEdit,
      faEyeSlash,
      faPlus,
      faEye,
      faHome,
      faUserFriends,
      faUsers
    );
  }
}
