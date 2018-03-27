import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Alert, AlertType } from '../_models/alert';

@Injectable()

export class AlertService {
  //  private subject = new Subject<any>();
    private subject = new Subject<Alert>();
    private keepAfterNavigationChange = false;
    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) {
                    this.keepAfterNavigationChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }
    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }
    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
    }
    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterNavigationChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message });
    }
    clear() {
        // clear alerts
        this.subject.next();
    }
    //success(message: string, keepAfterNavigationChange = false){
    //    this.keepAfterNavigationChange = keepAfterNavigationChange;
    //    this.subject.next({ type: 'success', text: message });
         
    //}
    //error(message: string, keepAfterNavigationChange = false) {
    //    let data: string;
    //    data = message['error_description'];
    //   // console.log(data);
    //    this.keepAfterNavigationChange = keepAfterNavigationChange;
    //    this.subject.next({ type: 'error', text: data  });
    //}
    //getMessage(): Observable<any> {
    //    console.log(this.subject.asObservable());
    //    return this.subject.asObservable();
    //}
}