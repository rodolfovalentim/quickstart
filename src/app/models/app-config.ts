export interface IAppConfig {
  id: number;
  name: string;
  eventKey: string;
  outputConfig: OutputConfig;
  api: Api;
  screen_order: string[];
  screens: Screen[];
}

interface Screen {
  id?: number;
  screenType: string;
  title?: Title;
  button?: Button;
  backgroundPath: string;
  submitButton?: SubmitButton;
  skip?: boolean;
  skipButton?: SubmitButton;
  askName?: boolean;
  askPhone?: boolean;
  askCity?: boolean;
  askEmail?: boolean;
  askBirthday?: boolean;
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
  id?: any;
  question: string;
  answers: Answer[];
}

interface Answer {
  id?: any;
  text: string;
  correct: boolean;
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

interface Button {
  color: string;
  icon: string;
  text: Text;
}

interface Text {
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