import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UserService, AlertService } from '../../_services/index';
import { Password } from '../../_models/password';
@Component({
    selector: 'app-dialog',
    templateUrl: 'app/common/resetPassword/resetPassword.component.html',
    styleUrls: ['app/common/resetPassword/resetPassword.component.css'],
    animations: [
        trigger('dialog', [
            transition('void => *', [
                style({ transform: 'scale3d(.9, .9, .9)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
            ])
        ])
    ]
})
export class ResetPasswordComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    model: any = {};
    loading = false;
    constructor(private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() { }

    close() {
        this.visible = false;
        this.visibleChange.emit(this.visible);
    }

    changePassword() {
        this.loading = true;
        let password = new Password();
        password.OldPassword = this.model.oldPassword;
        password.NewPassword = this.model.newPassword;
        password.ConfirmPassword = this.model.confirmPassword;
        this.userService.changePassword(password).subscribe(
            data => {
                this.alertService.success("Password is changed Successfully", true);
                this.loading = false;
                this.model = {};
        },
            error => {
                this.alertService.error(error['error']['message']);
                this.loading = false;
            })

        setTimeout(() => {
            this.alertService.clear();
        },5000)
    }
}