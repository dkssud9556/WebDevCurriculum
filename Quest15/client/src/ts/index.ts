import '../style.css';
import Notepad from './component/notepad';
import GraphqlStorage from './storage/graphqlStorage';

const notepad = new Notepad(new GraphqlStorage());
if (!notepad) {
  console.log('error!');
}
