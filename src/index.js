const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const submit = document.querySelector('#submit');
const loginLog = document.querySelector('#loginLog');
const dashboardLog = document.querySelector('#dashboardLog');
submit.addEventListener('click', () => {
  fetch('api/apiweb/v1/account/login', {
    method: 'post',
    body: JSON.stringify({
      username: email.value,
      password: pass.value,
      rememberMe: true
    }),
    headers: {
      'content-type': 'application/json',
      'accept-language': 'en-US'
    }
  })
    .then(r => r.json())
    .then(res => {
      loginLog.innerHTML = JSON.stringify(res, null, 4);
      console.log(res);
      fetch('api/apiweb/v1/pages/dashboard-orders/4', {
        headers: {
          'content-type': 'application/json',
          'accept-language': 'en-US'
        }
      })
        .then(r => r.json())
        .then(res => {
          dashboardLog.innerHTML = JSON.stringify(res, null, 4);
        });
    });
});
