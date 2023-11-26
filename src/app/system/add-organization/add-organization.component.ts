import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralApiResponse } from 'src/app/classes/GeneralApiResponse';
import { Organization } from 'src/app/classes/Organization';
import { CommonService } from 'src/app/services/common.service';
import { LanguageService } from 'src/app/services/language.service';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.sass']
})
export class AddOrganizationComponent {

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _addingItem: Organization | null = null;

  addOrganizationForm = new FormGroup({
    id: new FormControl(""),
    name: new FormControl(''),
    streetAddressLine1: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl(""),
    country: new FormControl(""),
    zipPostalCode: new FormControl(""),
    phoneNumber: new FormControl(""),
    email: new FormControl(""),
    currency: new FormControl(""),
    decimalMark: new FormControl(""),
    timezone: new FormControl(""),
    localDateFormat: new FormControl(""),
    localDateTimeFormat: new FormControl("")
  });
  message: Record<string, any[]> = {
    success: [],
    error: []
  };

  constructor(public languageService: LanguageService, private commonService: CommonService,
    private restService: RestService, private http: HttpClient) {
  }

  saveClick($event: any): any {
    this.clearMessages();
    const formData = this.addOrganizationForm.value;
    if (this.commonService.isNullOrEmpty(formData.name)) {
      this.message['error'].push("name_empty")
    }
    if (this.commonService.isNullOrEmpty(formData.id)) {
      delete formData.id;
    }
    if (this.message['error'].length < 1) {
      const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
      const serviceUrl = environment.apiUrl.organization + "/create-or-update";
      this.http.post<GeneralApiResponse>(serviceUrl, formData, {
        headers: requestHeaders, params: {}
      }).subscribe({
        next: (data: GeneralApiResponse) => {
          if (this.save) {
            $event.organization = data.result;
            this.save.emit($event);
          }
        }, error: (data: any) => {
          const message = this.message;
          if (data.statusText) {
            message['error'].push(data.statusText);
          } else if (data.statusCode) {
            message['error'].push(data.statusCode);
          } else {
            message['error'].push("Unknown error: " + JSON.stringify(data));
          }
        }
      });
    }
  }

  cancelClick($event: any): any {
    if (this.cancel) {
      this.cancel.emit($event);
    }
  }

  clearMessages() {
    this.message = {
      success: [],
      error: []
    };
  }

  @Input() set addingItem(item: Organization| null) {
    this._addingItem = item;
    if (item) {
      this.addOrganizationForm.setValue({ name: item.name, id: item.id, streetAddressLine1: item.streetAddressLine1,
        city: item.city, state: item.state, country: item.country, zipPostalCode: item.zipPostalCode,
        phoneNumber: item.phoneNumber, email: item.email, currency: item.currency, decimalMark: item.decimalMark,
        timezone: item.timezone, localDateFormat: item.localDateFormat, localDateTimeFormat: item.localDateTimeFormat});
    } else {
      this.addOrganizationForm.setValue(new Organization());
    }
  }
}
