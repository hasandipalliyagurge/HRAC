import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { map, take, debounceTime} from 'rxjs/Operators';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  
  IndexForm: FormGroup;
  constructor(private afs: AngularFirestore, private fb: FormBuilder){}

  
  ngOnInit() {
    this.IndexForm = this.fb.group({
      IndexNumber:  ['', [
        Validators.required
      ],CustomIndexValidator.IndexNumber(this.afs)],
      RFIDNumber:  ['', [
        Validators.required,
      ],CustomRFIDValidator.RFIDNumber(this.afs)],
    });
  }

  get IndexNumber() {
    return this.IndexForm.get('IndexNumber')
  }

  get RFIDNumber() {
    return this.IndexForm.get('RFIDNumber')
  }
 
}

export class CustomIndexValidator {
  static IndexNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const IndexNumber = control.value;
  
    return afs.collection('studentIndex', ref => ref.where('IndexNumber', '==', IndexNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? { IndexNumberAvailable: false } : null ),
    )

    }
  }
}


export class CustomRFIDValidator {
  static RFIDNumber(afs: AngularFirestore) {
    return (control: AbstractControl) => {
      
    const RFIDNumber = control.value;
  
    return afs.collection('studentIndex', ref => ref.where('RFIDNumber', '==', RFIDNumber) )        
    .valueChanges().pipe(
      debounceTime(500),
      take(1),
      map(arr => arr.length ? { RFIDNumberAvailable: false } : null ),
    )

    }
  }

}