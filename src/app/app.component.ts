import { Component, AfterViewInit, ElementRef, Renderer, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResult } from './demo/domain/login'
import { AuthService } from './demo/service/auth.service'
import { GlobalConstants } from './../globals'

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
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnDestroy {
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
    categories: any[] = [];

    leftMenuToggleButtonActive: boolean = true;

    LeftMenuItems: any[] = [];

    pageProfile: any = {}

    @ViewChild('layoutMenuScroller') layoutMenuScrollerViewChild: ElementRef;


    constructor(public renderer: Renderer, private router: Router, private auth: AuthService) { }

    ngAfterViewInit() {
        this.layoutMenuScroller = <HTMLDivElement>this.layoutMenuScrollerViewChild.nativeElement;

        setTimeout(() => {
            if (!this.issinglepage) jQuery(this.layoutMenuScroller).nanoScroller({ flash: true });
        }, 10);
    }
    doLogin(loginResult: LoginResult) {

        this.access_token = loginResult.access_token;

        localStorage.setItem("token", loginResult.access_token);

        this.isLoggedIn = true;
        this.issinglepage = false;
        this.router.navigate(['']);
    }
    doLogout() {
        localStorage.removeItem('token');
        this.access_token = "";

        this.isLoggedIn = false;
        this.issinglepage = true;
        this.router.navigate(['/login']);
    }

    hasAccess(role: string): boolean {
        try {

            let tokenPayload: any = this.auth.decodeToken();
            return (tokenPayload != undefined && tokenPayload != null && tokenPayload.role == role);
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
        return true; 
    }

    displayLeftMenu(visible: boolean) {
        this.staticMenuDesktopInactive = !visible;
        this.staticMenuMobileActive = visible;
        this.leftMenuToggleButtonActive = visible;
        this.rotateMenuButton = !visible;
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

}
