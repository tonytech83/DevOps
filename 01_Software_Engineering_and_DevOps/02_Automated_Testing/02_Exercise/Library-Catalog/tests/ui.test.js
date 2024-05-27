const { test, expect } = require('@playwright/test');
const pageURL = "http://localhost:3000/";

// Verify That the "All Books" Link Is Visible
test('Verify "All Books" link is visible', async ({ page }) => {
  await page.goto(pageURL);
  await page.waitForSelector('nav.navbar');

  const allBooksLink = await page.$('a[href="/catalog"]');
  const isLinkVisible = await allBooksLink.isVisible();

  expect(isLinkVisible).toBe(true);
});

// Verify That the "Login" Button Is Visible
test('Verify "Login" button is visible', async ({ page }) => {
  await page.goto(pageURL);
  await page.waitForSelector('nav.navbar');

  const loginButtonLink = await page.$('a[href="/login"]');
  const isLoginButtonVisible = await loginButtonLink.isVisible();

  expect(isLoginButtonVisible).toBe(true);
});

// Verify That the "Register" Button Is Visible
test('Verify "Register" button is visible', async ({ page }) => {
  await page.goto(pageURL);
  await page.waitForSelector('nav.navbar');

  const registerButtonLink = await page.$('a[href="/register"]');
  const isRegisterButtonVisible = await registerButtonLink.isVisible();

  expect(isRegisterButtonVisible).toBe(true);
});

// Verify That the "All Books" Link Is Visible after user login
test('Verify "All Books" link is visible after user login', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'petar@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  const allBooksLink = await page.$('a[href="/catalog"]');
  const isAllBooksLinkVisible = await allBooksLink.isVisible();

  expect(isAllBooksLinkVisible).toBe(true);
});

// Verify That the "My Books" Link Is Visible
test('Verify "My Books" link is visible after user login', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');


  const myBooksLink = await page.$('a[href="/profile"]');
  const isMyBooksLinkVisible = await myBooksLink.isVisible();

  expect(isMyBooksLinkVisible).toBe(true);
});


// Verify That the "Add Book" Link Is Visible
test('Verify "Add Book" link is visible after login', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  const addBookLink = await page.$('a[href="/create"]');
  const isAddBookLinkVisible = await addBookLink.isVisible();

  expect(isAddBookLinkVisible).toBe(true);
});

// Verify That the User's Email Address Is Visible
test('Verify "User Email Address" is visible after login', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  const userEmail = await page.$eval('#user span', (span) => span.textContent);
  const expectedEmail = 'peter@abv.bg'

  expect(userEmail.split(' ')[1]).toBe(expectedEmail);
});

// Submit the Form with Valid Credentials
test('Login with valid credentials', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');
  await page.$('a[href="/catalog"]');

  expect(page.url()).toBe(pageURL + 'catalog');
});

// Submit the Form with Empty Input Fields
test('Login without providing credentials', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(pageURL + 'login');
});

// Submit the Form with Empty Email Input Field
test('Login without providing email', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(pageURL + 'login');
});

// Submit the Form with Empty Password Input Field
test('Login without providing password', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/login"]');
  expect(page.url()).toBe(pageURL + 'login');
});

// Submit the Form with Valid Values
test('Register with valid credentials.', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.fill('input[name="email"]', 'test3@test.com');
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '123456');
  await page.click('input[type="submit"]');

  await page.$('a[href="/catalog"]');
  expect(page.url()).toBe(pageURL + 'catalog');
});

// Submit the Form with Empty Values
test('Try to register with empty input fields', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(pageURL + 'register');
});

// Submit the Form with Empty Email
test('Try to register with empty email field', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '123456');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(pageURL + 'register');
});

// Submit the Form with Empty Password
test('Try to register with empty password field', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.fill('input[name="email"]', 'test321@test.com');
  await page.fill('input[name="confirm-pass"]', '123456');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(pageURL + 'register');
});

// Submit the Form with Empty Confirm Password
test('Try to register with empty confirm password field', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.fill('input[name="email"]', 'test321@test.com');
  await page.fill('input[name="password"]', '123456');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(pageURL + 'register');
});

// Submit the Form with Different Passwords
test('Try to register with different passwords', async ({ page }) => {
  await page.goto(pageURL + 'register');
  await page.fill('input[name="email"]', 'new@test.com');
  await page.fill('input[name="password"]', '123456');
  await page.fill('input[name="confirm-pass"]', '65431');
  await page.click('input[type="submit"]');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContains("Passwords don't match!");
    await dialog.accept();
  });

  await page.$('a[href="/register"]');
  expect(page.url()).toBe(pageURL + 'register');
});

// Submit the Form with Correct Data
test('Add book with correct data', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog'),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector('#create-form');
  await page.fill('#title', 'Test book');
  await page.fill('#description', 'Some description');
  await page.fill('#image', 'https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg');
  await page.selectOption('#type', 'Romance');

  await page.click('#create-form input[type="submit"]');
  await page.waitForURL(pageURL + 'catalog');

  expect(page.url()).toBe(pageURL + 'catalog');
});

// Submit the Form with Empty Title Field
test('Try to add book with empty title filed', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog'),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector('#create-form');
  await page.fill('#description', 'Some description');
  await page.fill('#image', 'https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg');
  await page.selectOption('#type', 'Romance');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/create"]');
  expect(page.url()).toBe(pageURL + 'create');
});

// Submit the Form with Empty Description Field
test('Try to add book with empty description filed', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog'),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector('#create-form');
  await page.fill('#title', 'Test book');
  await page.fill('#image', 'https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg');
  await page.selectOption('#type', 'Romance');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/create"]');
  expect(page.url()).toBe(pageURL + 'create');
});

// Submit the Form with Empty Image URL Field
test('Try to add book with empty image filed', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog'),
  ]);

  await page.click('a[href="/create"]');
  await page.waitForSelector('#create-form');
  await page.fill('#title', 'Test book');
  await page.fill('#description', 'Some description');
  await page.selectOption('#type', 'Romance');

  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('All fields are required!');
    await dialog.accept();
  });

  await page.$('a[href="/create"]');
  expect(page.url()).toBe(pageURL + 'create');
});

// Verify That All Books Are Displayed
test('Login and verify that all books are displayed', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.waitForSelector('.dashboard');
  const bookElements = await page.$$('.other-books-list li');

  expect(bookElements.length).toBeGreaterThan(0);
});

// Verify That No Books Are Displayed
test('Verify that no books are displayed', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL('http://localhost:3000/catalog'),
  ]);

  await page.waitForSelector('.dashboard');
  const noBooksMessage = await page.textContent('.no-books');

  expect(noBooksMessage).toBe('No books in database!');
});

// Verify That Logged-In User Sees Details Button and Button Works Correctly
test('Verify that logged-in user sees details button and it works correctly', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'john@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const detailsPageTitle = await page.textContent('.book-information h3');

  expect(detailsPageTitle).toBe('Test book');
});

// Verify That Guest User Sees Details Button and Button Works Correctly
test('Verify that guest user sees details button and it works correctly', async ({ page }) => {
  await page.goto(pageURL);
  await page.waitForSelector('nav.navbar');
  await page.click('a[href="/catalog"]');

  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const detailsPageTitle = await page.textContent('.book-information h3');

  expect(detailsPageTitle).toBe('Test book');
});

// Verify That All Info Is Displayed Correctly
test('Verify that all info is displayed correctly', async ({ page }) => {
  await page.goto(pageURL);
  await page.waitForSelector('nav.navbar');
  await page.click('a[href="/catalog"]');

  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');
  await page.waitForSelector('.book-description');

  const detailsPageTitle = await page.textContent('.book-information h3');
  const detailsBookType = await page.textContent('.book-information .type');
  const detailsBookImage = await page.$('.book-information .img img');
  const detailsBookImageSrc = await page.evaluate(img => img.src, detailsBookImage);
  const detailsBookDescription = await page.textContent('.book-description p')

  expect(detailsPageTitle).toBe('Test book');
  expect(detailsBookType).toBe('Type: Romance');
  expect(detailsBookImageSrc).toBe('https://www.collinsdictionary.com/images/full/book_181404689_1000.jpg');
  expect(detailsBookDescription).toBe('Some description');
});

// Verify If Edit and Delete Buttons Are Visible for Creator
test('Verify id edit and delete buttons are visible for creator', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const isEditButtonVisible = await page.textContent('.book-information a.button[href^="/edit/"]');
  const isDeleteButtonVisible = await page.textContent('.book-information a.button:has-text("Delete")');

  expect(isEditButtonVisible).toBe('Edit');
  expect(isDeleteButtonVisible).toBe('Delete');
});

//Verify If Edit and Delete Buttons Are Not Visible for Non-Creator
test('Verify if edit and delete buttons are not visible for non-creator', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'john@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const isEditButtonVisible = await page.$('.book-information a.button[href^="/edit/"]');
  const isDeleteButtonVisible = await page.$('.book-information a.button:has-text("Delete")');

  expect(isEditButtonVisible).toBeNull();
  expect(isDeleteButtonVisible).toBeNull();
});

// Verify If Like Button Is Not Visible for Creator
test('Verify if like button is not visible for creator', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'peter@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const isLikeButtonVisible = await page.$('.book-information a.button:has-text("Like")');

  expect(isLikeButtonVisible).toBeNull();
});

// Verify If Like Button Is Visible for Non-Creator
test('Verify if like button is visible for non-creator', async ({ page }) => {
  await page.goto(pageURL + 'login');
  await page.fill('#email', 'john@abv.bg');
  await page.fill('#password', '123456');

  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForURL(pageURL + 'catalog'),
  ]);

  await page.click('a[href="/catalog"]');
  await page.waitForSelector('.otherBooks');
  await page.click('.otherBooks a.button');
  await page.waitForSelector('.book-information');

  const likeButton = await page.$('.book-information a.button:has-text("Like")');
  const isLikeButtonVisible = await likeButton.isVisible();

  expect(isLikeButtonVisible).toBe(true);
});

// Verify That the "Logout" Button Is Visible
test('Verify that the "Logout" button is visible', async ({ page }) => {
  await page.goto(pageURL + 'login');

  await page.fill('#email', 'john@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  const logoutLink = await page.$('a[href="javascript:void(0)"]');
  const isLogoutVisible = await logoutLink.isVisible();

  expect(isLogoutVisible).toBe(true);
});

// Verify That the "Logout" Button Redirects Correctly
test('Verify that the "Logout" button redirects correctly', async ({page}) =>{
  await page.goto(pageURL + 'login');

  await page.fill('#email', 'john@abv.bg');
  await page.fill('#password', '123456');
  await page.click('input[type="submit"]');

  const logoutLink = await page.$('a[href="javascript:void(0)"]');
  await logoutLink.click();

  expect(page.url()).toBe(pageURL + 'catalog');
});