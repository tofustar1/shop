const { I } = inject();

Given('я находусь на странице регистрации', () => {
  I.amOnPage('/register');
  I.wait(2);
});

When('ввожу в поле {string} значение {string}', (name: string, value: string) => {
  I.fillField(name, value);
  I.wait(2);
});

When('нажимаю на кнопку {string}', (name: string) => {
  I.click(`//button[text()='${name}']`)
  I.wait(2);
});

Then('я вижу сообщение {string}', (text: string) => {
  I.see(text);
  I.wait(2);
});
