export interface IAppConfig {
  id: number;
  name: string;
  eventKey: string;
  outputConfig: OutputConfig;
  api: Api;
  screens: Screen[];
}

interface Screen {
  id?: number;
  screenType: string;
  next: string;
  title?: Title;
  button?: Button;
  backgroundPath?: string;
  backgroundColor?: string;
  submitButton?: SubmitButton;
  skip?: boolean;
  skipButton?: SubmitButton;
  welcomeTitle?: Text;
  welcomeText?: Text;
  startButton?: SubmitButton;
  nextButton?: SubmitButton;
  finishButton?: SubmitButton;
  answerTextColor?: string;
  answerBoxColor?: string;
  answerSelectedBoxColor?: string;
  containerColor?: string;
  successTitle?: Text;
  successMessage?: Text;
  failureTitle?: Text;
  failureMessage?: Text;
  tryAgainButton?: TryAgainButton;
  shuffle?: boolean;
  enableScore?: boolean;
  numPresentedQuestions?: number;
  questions?: Question[];
  spinButton?: SpinButton;
  winText?: Text;
  loseText?: Text;
  winTitle?: Text;
  loseTitle?: Text;
  slots?: Slot[];
  frames?: Frame[];
  takePicButton?: SubmitButton;
  takeNewPicButton?: SubmitButton;
  backButton?: SubmitButton;
  confirmButton?: SubmitButton;
  thankyouMensage?: Text; 
  routeButton?: any;
  dropboxEnabled?: boolean;
  emailEnabled?: boolean;
  facebookEnabled?: boolean;
  printEnabled?: boolean;
  text?: Text;
}

interface Frame {
  id?: any;
  path: string;
  cropFrom: CropFrom;
  cropTo: CropFrom;
}

interface CropFrom {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Slot {
  id?: any;
  imagePath: string;
  prize: string;
  probability: number;
  avaliableAmount: number;
}

interface SpinButton {
  color?: any;
  icon: string;
  text: Text;
}

interface Question {
  question_type?: string;
  key?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  order?: number;
  id?: any;
  question?: string;
  options?: Options[];
  answer: number;
}

interface Options {
  key?: any;
  value: string;
}

interface TryAgainButton {
  color?: string;
  icon: string;
  text: Text;
}

interface SubmitButton {
  color: string;
  icon: string;
  text: Text;
}

export interface Button {
  color: string;
  icon: string;
  text: Text;
}

export interface Text {
  color: string;
  text?: string;
  fontPath?: string;
  fontName?: string;
}

interface Title {
  text: string;
  color: string;
  fontPath?: string;
  fontName: string;
}

interface Api {
  sendPhoto: string;
  sendEmail: string;
  addUser: string;
  updateConfig: string;
  loginUrl: string;
}

interface OutputConfig {
  dropboxToken: string;
  facebookToken: string;
  sendGridToken: string;
  emailFrom: string;
  emailSubject: string;
  emailBody: string;
}