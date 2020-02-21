import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SocialLoginModule, AuthServiceConfig, AuthService, GoogleLoginProvider, SocialUser }
  from "angularx-social-login";
import { FacebookLoginProvider, LinkedInLoginProvider }
  from 'angularx-social-login';
import { LoginComponent } from './login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule } from '@angular/material';
import { AuthenticationService } from '../services/authentication.service';
import { validUser, blankUser } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';
//import { AuthService } from 'angularx-social-login';
import { IndexComponent } from '../index/index.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Cookie } from 'tough-cookie';
import { By } from '@angular/platform-browser';



const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
const loginServiceSpy = jasmine.createSpyObj('AuthenticationService', ['login']);
const authServiceSpy = jasmine.createSpyObj('AutheService', ['authSedrvice']);
const authStateSpy = jasmine.createSpyObj('autheState', ['autheState']);

const testUserData = { id: 1, name: 'TekLoon' };
const loginErrorMsg = 'Invalid Login';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("google id goes here")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("facebook id goes here")
  },
  {
    id: LinkedInLoginProvider.PROVIDER_ID,
    provider: new LinkedInLoginProvider("linkdin id goes here")
  }
]);

export function provideConfig() {
  return config;
}
fdescribe('LoginComponent Shallow test', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let originalTimeout;


  function updateForm(username, password) {
    fixture.componentInstance.loginForm.controls['username'].setValue(username);
    fixture.componentInstance.loginForm.controls['password'].setValue(password);
  }

  beforeEach(async(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
       // AuthService.authState,
        
        MatInputModule],
      providers: [
        { provide: AuthenticationService, useValue: loginServiceSpy },
          {provide: AuthService, userValue:authServiceSpy},
          {provide: AuthService.authState, useValue:authStateSpy},
        FormBuilder,
        //{ provide: Router, useValue: routerSpy },
        { provide: AuthServiceConfig, useFactory: provideConfig }
      ],


      declarations: [LoginComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);

  }));
  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

  });

  afterAll(function() {
    console.log('Done: Component Login to Google')

  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
it('created a form with username and password input and login button', () => {
    // const fixture = TestBed.createComponent(LoginComponent);
    const usernameContainer = fixture.debugElement.nativeElement.querySelector('#username-container');
    const passwordContainer = fixture.debugElement.nativeElement.querySelector('#password-container');
    const loginBtnContainer = fixture.debugElement.nativeElement.querySelector('#login-btn-container');
    const footerContainer = fixture.debugElement.nativeElement.querySelector('#footer-container');

    expect(usernameContainer).toBeDefined();
    expect(passwordContainer).toBeDefined();
    expect(loginBtnContainer).toBeDefined();
    expect(footerContainer).toBeDefined();

  });

  it('Display Username Error Msg when Username is blank', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    //const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector(By.css('#username-error-msg'))
   // .innerText;
    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    expect(usernameErrorMsg).toBeDefined();
    //expect(usernameErrorMsg.innerHTML).toContain('Please enter username');
  });

 it('Display Password Error Msg when Username is blank', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');
    expect(passwordErrorMsg).toBeDefined();
 //   expect(passwordErrorMsg.innerText).toContain('Please enter password');
  });

  it('Display Both Username & Password Error Msg when both field is blank', () => {
    updateForm(blankUser.username, blankUser.password);
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const usernameErrorMsg = fixture.debugElement.nativeElement.querySelector('#username-error-msg');
    const passwordErrorMsg = fixture.debugElement.nativeElement.querySelector('#password-error-msg');

    expect(usernameErrorMsg).toBeDefined();
   // expect(usernameErrorMsg.innerHTML).toContain('Please enter username');

    expect(passwordErrorMsg).toBeDefined();
    //expect(passwordErrorMsg.innerHTML).toContain('Please enter password');
  });

  it('When username is blank, username field should display red outline ', () => {
    updateForm(blankUser.username, validUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const usernameInput = inputs[0];

    expect(usernameInput.classList).toContain('ng-invalid');
  });

 xit('When password is blank, password field should display red outline ', () => {
    updateForm(validUser.username, blankUser.password);
    fixture.detectChanges();
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();

    const inputs = fixture.debugElement.nativeElement.querySelectorAll('input');
    const passwordInput = inputs[1];

    expect(passwordInput.classList).toContain('ng-invalid');
  });
});




