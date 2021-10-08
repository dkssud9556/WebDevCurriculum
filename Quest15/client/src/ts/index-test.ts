import '../style.css';
import Notepad from "./component/notepad";
import TestStorage from "./storage/testStorage";

const notepad = new Notepad(new TestStorage());
if (!notepad) {
    console.log('error!');
}