const { I } = inject();

const pageMap: Record<string, string> = {
  'регистрации': '/register',
  'входа': '/login',
  'создание товара': '/products/new'
}

const userPasswords: Record<string, string> = {
  'Admin': 'Qwerty123'
}

Given('я нахожусь на странице {string}', (page: string) => {
  I.amOnPage(pageMap[page]);
  I.wait(2);
});

Given('я залогинен как {string}', (username: string) => {
  I.amOnPage(pageMap['входа']);
  I.fillField('username', username);
  I.fillField('password', userPasswords[username]);
  I.click(`//button[text()='Sign In']`);
  I.see('HI, ADMIN');
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value);
  I.wait(1);
});

When('нажимаю на кнопку {string}', (name: string) => {
  I.click(`//button[text()='${name}']`)
  I.wait(2);
});

Then('я вижу сообщение {string}', (text: string) => {
  I.see(text);
  I.wait(2);
});
