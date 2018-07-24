import { Component, AfterViewInit, ElementRef, Renderer, ViewChild, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';//Added
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Router } from '@angular/router';
import { LoginResult } from './shared/domain/login'
import { AuthService } from './shared/services/auth.service'
import { GlobalConstants } from './shared/app.globals'
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

enum MenuOrientation {
    STATIC,
    OVERLAY,
    SLIM,
    HORIZONTAL
}

declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [MessageService]
})
export class AppComponent implements AfterViewInit, OnDestroy {
    msgs: Message[] = [];

    spinkit = Spinkit; //Added

    issinglepage = false;

    layoutCompact = true;

    layoutMode: MenuOrientation = MenuOrientation.STATIC;

    darkMenu = false;

    profileMode = 'inline';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    rightPanelActive: boolean;

    rightPanelClick: boolean;

    layoutMenuScroller: HTMLDivElement;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    resetMenu: boolean;

    menuHoverActive: boolean;

    isLoggedIn: boolean;

    access_token: string;

    activeCategoryDropdown: boolean = false;

    leftMenuToggleButtonActive: boolean = true;

    LeftMenuItems: any[] = [];

    pageProfile: any = {}

    isClientPage: boolean = false;
    selectedItem: any = {};
    confirmationService: ConfirmationService;

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;

    @HostListener('window:resize') onResize() {
        // guard against resize before view is rendered
        //if (this.isDesktop()) {
        //    this.rotateMenuButton = true;
        //    this.overlayMenuActive = true;
        //    this.staticMenuMobileActive = true;
        //}
    }

    constructor(public renderer: Renderer, private router: Router, private auth: AuthService, private _confirmationService: ConfirmationService) {
        this.confirmationService = _confirmationService;
        if (this.isClientPage || sessionStorage.getItem('isClientPage') == "true") {
            this.isClientPage = true;
        }
    }

    ngAfterViewInit() {
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;
        setTimeout(() => {
            if (!this.issinglepage) { jQuery(this.layoutMenuScroller).nanoScroller({ flash: true }) };
        }, 500);
    }
    doLogin(loginResult: LoginResult, isClientPage: boolean) {

        this.access_token = loginResult.access_token;

        if (isClientPage) {
            sessionStorage.setItem("token", loginResult.access_token);
            sessionStorage.setItem("refreshtoken", loginResult.refresh_token);
        }
        else {
            localStorage.setItem("token", loginResult.access_token);
            //localStorage.setItem("refreshtoken", loginResult.refresh_token);
        }

        this.isLoggedIn = true;
        this.issinglepage = false;

        if (isClientPage)
            this.router.navigate(['']);
        else
            this.router.navigate(['']);

    }
    doLogout() {
        localStorage.removeItem('token');
        this.access_token = "";

        this.isLoggedIn = false;
        this.issinglepage = true;
        this.router.navigate(['/login']);
    }

    getSession(): any {
        return this.auth.decodeToken();
    }
    hasAccess(roles: string): boolean {
        try {
            let access = false;
            let tokenPayload: any = this.auth.decodeToken();
            if (tokenPayload != undefined && tokenPayload != null) {

                let roleList: string[] = roles.split(',');

                for (var indx = 0; indx < roleList.length; indx++) {
                    if (tokenPayload.role === roleList[indx]) {
                        access = true;
                        break;
                    }
                }
            }
            return access;
        }
        catch (e) {
            return false;
        }
    }

    hasHorizontalSubMenuAccess(): boolean {
        //try {            
        //    let tokenPayload: any = this.auth.decodeToken();
        //    return (tokenPayload != undefined && tokenPayload != null && tokenPayload.role != GlobalConstants.ROLE_GUEST);
        //}
        //catch (e) {
        //    return false;
        //}

        if (this.isClientPage || sessionStorage.getItem('isClientPage') == "true")
            return false;

        return true;
    }

    displayLeftMenu(visible: boolean) {
        this.staticMenuDesktopInactive = !visible;
        this.staticMenuMobileActive = visible;
        this.leftMenuToggleButtonActive = visible;
        this.rotateMenuButton = !visible;
        setTimeout(() => {
            jQuery('.nano').nanoScroller();
        }, 500);
    }


    onLayoutClick() {
        if (!this.topbarItemClick) {
            this.activeTopbarItem = null;
            this.topbarMenuActive = false;
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.resetMenu = true;
            }
            if (this.overlayMenuActive || this.staticMenuMobileActive) {
                this.hideOverlayMenu();
                if (!this.isDesktop()) {
                    this.rotateMenuButton = true;
                }
            }

            this.menuHoverActive = false;
        }

        if (!this.rightPanelClick) {
            this.rightPanelActive = false;
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.rightPanelClick = false;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === MenuOrientation.OVERLAY) {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                this.staticMenuMobileActive = !this.staticMenuMobileActive;
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
        this.resetMenu = false;
        if (!this.isHorizontal()) {
            setTimeout(() => {
                jQuery(this.layoutMenuScroller).nanoScroller();
            }, 500);
        }
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        this.hideOverlayMenu();

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onRightPanelButtonClick(event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;
        event.preventDefault();
    }

    onRightPanelClick() {
        this.rightPanelClick = true;
    }

    hideOverlayMenu() {
        this.rotateMenuButton = false;
        this.overlayMenuActive = false;
        this.staticMenuMobileActive = false;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === MenuOrientation.OVERLAY;
    }

    isHorizontal() {
        return this.layoutMode === MenuOrientation.HORIZONTAL;
    }

    isSlim() {
        return this.layoutMode === MenuOrientation.SLIM;
    }

    isAdmin() { return this.getSession().role === GlobalConstants.ROLE_ADMIN; }
    isClientAdmin() { return this.getSession().role === GlobalConstants.ROLE_CLIENT_ADMIN; }
    isClientUser() { return this.getSession().role === GlobalConstants.ROLE_CLIENT_USER; }
    isGuestUser() { return this.getSession().role === GlobalConstants.ROLE_GUEST; }

    changeToStaticMenu() {
        this.layoutMode = MenuOrientation.STATIC;
    }

    changeToOverlayMenu() {
        this.layoutMode = MenuOrientation.OVERLAY;
    }

    changeToHorizontalMenu() {
        this.layoutMode = MenuOrientation.HORIZONTAL;
    }

    changeToSlimMenu() {
        this.layoutMode = MenuOrientation.SLIM;
    }

    ngOnDestroy() {
        jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
    }

    onItemClick(val) {
        this.selectedItem = val;
    }
}
