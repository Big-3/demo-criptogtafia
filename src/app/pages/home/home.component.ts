import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {generateKeys, PublicKey, PrivateKey} from '@criptografia/modul-rsa';
import * as bigintConversion from 'bigint-conversion';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  generarForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.generarForm = this.formBuilder.group({
      pubKey: [{value: '', disabled: true}],
      privKey: [{value: '', disabled: true}],
      modulus: [{value: '', disabled: true}]
    });
  }

  generarClaus(){
    let privKey: PrivateKey;

    generateKeys().then(
      (value) => {
        privKey = value;
        this.generarForm.controls['privKey'].patchValue(bigintConversion.bigintToText(privKey.getExpD()));
        this.generarForm.controls['pubKey'].patchValue(bigintConversion.bigintToText(privKey.getPublicKey().getExpE()));
        this.generarForm.controls['modulus'].patchValue(bigintConversion.bigintToText(privKey.getPublicKey().getModN()));

        console.log(this.generarForm.controls['privKey'].value);
        console.log(this.generarForm.controls['pubKey'].value);
        console.log(this.generarForm.controls['moduls'].value);
      });
  }
}
