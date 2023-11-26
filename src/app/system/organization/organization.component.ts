import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralApiResponse } from 'src/app/classes/GeneralApiResponse';
import { Organization } from 'src/app/classes/Organization';
import { UiOrderEvent } from 'src/app/classes/UiOrderEvent';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { TableComponent } from 'src/app/generic-component/TableComponent';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.sass']
})
export class OrganizationComponent extends TableComponent<Organization> {

  _deleteSubscription: Subscription | null = null;

  override buildTableColumns(): string[] {
    return ["index", "id", "iconUrl", "name", "country", "phoneNumber", "email", "action"];
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const order = new UiOrderEvent();
    order.active = "id";
    order.direction = "asc";
    this.changeOrder({ order });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.unsubscribe(this._deleteSubscription);
  }

  getServiceUrl() {
    return environment.apiUrl.organization;
  }

  override showDeleteModel(item: Organization) {
    const message = this.languageService.formatLanguage("organization.deleteConfirmContent", [item.name]);
    const title = this.languageService.formatLanguage("organization.deleteConfirmTitle", [])
    const dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: dialogData });

    this._deleteSubscription = dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
        const serviceUrl = this.getDeleteUrl();
        this.http.delete<GeneralApiResponse>(serviceUrl, {
          headers: requestHeaders, params: { entityId: item.id }
        }).subscribe({
          next: (_: GeneralApiResponse) => this.reloadData(), error: (data: any) => this.showError(data)
        });
      }
    });
  }

  override createNewItem(): Organization {
    return new Organization();
  }

  viewSchoolClick(organization: Organization) {
    this.organizationService.organizationSubject.next(organization);
    const urlToNavigate = "/" + environment.frontEndUrl.classes;
    this.router.navigateByUrl(urlToNavigate);
  }
}