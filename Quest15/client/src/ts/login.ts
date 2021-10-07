import Storage from './storage';
import GraphqlStorage from './storage/graphqlStorage';

(document.getElementById('login-form') as HTMLElement).onsubmit = (e) => {
  e.preventDefault();
  const storage: Storage = new GraphqlStorage();
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  storage
    .login({ username, password })
    .then(() => {
      alert('로그인 성공');
      window.location.replace('/');
    })
    .catch((err) => {
      if (err.statusCode === 400) {
        alert('아이디 비밀번호를 모두 입력해주세요.');
      } else if (err.statusCode === 403) {
        alert('아이디 또는 비밀번호가 틀렸습니다.');
      } else if (err.statusCode === 409) {
        alert('이미 로그인 상태입니다.');
        window.location.replace('/');
      }
    });
};
